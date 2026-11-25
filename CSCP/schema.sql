-- CSCP database schema for Supabase / PostgreSQL
-- Jalankan melalui Supabase SQL Editor pada proyek baru. Review sebelum produksi.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text unique not null,
  email text,
  birth_place text,
  birth_date date,
  domicile text,
  education_level text,
  major text,
  target_formation text,
  privacy_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('participant','facilitator','admin')),
  created_at timestamptz not null default now(),
  unique(user_id, role)
);

create table if not exists public.education_histories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  level text not null,
  institution text,
  major text,
  graduation_year integer,
  created_at timestamptz not null default now()
);

create table if not exists public.exam_categories (
  id uuid primary key default gen_random_uuid(),
  code text unique not null check (code in ('TWK','TIU','TKP')),
  name text not null,
  description text
);

insert into public.exam_categories(code,name) values
('TWK','Tes Wawasan Kebangsaan'),('TIU','Tes Intelegensia Umum'),('TKP','Tes Karakteristik Pribadi')
on conflict (code) do nothing;

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.exam_categories(id),
  question_text text not null,
  explanation text,
  scoring_type text not null default 'objective' check (scoring_type in ('objective','weighted')),
  is_published boolean not null default false,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  option_key text not null,
  option_text text not null,
  score integer,
  is_correct boolean not null default false,
  unique(question_id, option_key)
);

create table if not exists public.exam_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Mini Try Out',
  status text not null default 'in_progress' check (status in ('in_progress','submitted','evaluated')),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  total_score numeric(8,2),
  result_summary jsonb not null default '{}'::jsonb
);

create table if not exists public.exam_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.exam_sessions(id) on delete cascade,
  question_id uuid not null references public.questions(id),
  option_id uuid references public.question_options(id),
  answer_text text,
  awarded_score integer,
  created_at timestamptz not null default now(),
  unique(session_id, question_id)
);

create table if not exists public.study_materials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  content text,
  resource_url text,
  is_published boolean not null default false,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.document_checklists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_name text not null,
  is_completed boolean not null default false,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists public.zoom_schedules (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz not null,
  facilitator_name text,
  zoom_url text,
  status text not null default 'upcoming' check (status in ('upcoming','ongoing','completed','cancelled')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  target_table text,
  target_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Helper role check. Role assignment must be controlled by trusted admin process.
create or replace function public.has_staff_role()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('admin','facilitator')
  );
$$;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.education_histories enable row level security;
alter table public.exam_categories enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.exam_sessions enable row level security;
alter table public.exam_answers enable row level security;
alter table public.study_materials enable row level security;
alter table public.document_checklists enable row level security;
alter table public.zoom_schedules enable row level security;
alter table public.notifications enable row level security;
alter table public.admin_activity_logs enable row level security;

-- Profiles: user sees/updates own profile; staff can read all.
create policy "profile_select_own_or_staff" on public.profiles for select to authenticated
using (id = auth.uid() or public.has_staff_role());
create policy "profile_update_own_or_staff" on public.profiles for update to authenticated
using (id = auth.uid() or public.has_staff_role())
with check (id = auth.uid() or public.has_staff_role());
create policy "profile_insert_self" on public.profiles for insert to authenticated
with check (id = auth.uid());

create policy "roles_read_self_or_staff" on public.user_roles for select to authenticated
using (user_id = auth.uid() or public.has_staff_role());
-- No client-side INSERT/UPDATE/DELETE policy for user_roles by design.

create policy "education_own_or_staff" on public.education_histories for all to authenticated
using (user_id = auth.uid() or public.has_staff_role())
with check (user_id = auth.uid() or public.has_staff_role());

create policy "categories_read_authenticated" on public.exam_categories for select to authenticated using (true);
create policy "questions_read_published_or_staff" on public.questions for select to authenticated
using (is_published or public.has_staff_role());
create policy "questions_staff_manage" on public.questions for all to authenticated
using (public.has_staff_role()) with check (public.has_staff_role());
create policy "options_read_published_or_staff" on public.question_options for select to authenticated
using (exists(select 1 from public.questions q where q.id=question_id and (q.is_published or public.has_staff_role())));
create policy "options_staff_manage" on public.question_options for all to authenticated
using (public.has_staff_role()) with check (public.has_staff_role());

create policy "sessions_own_or_staff" on public.exam_sessions for all to authenticated
using (user_id = auth.uid() or public.has_staff_role())
with check (user_id = auth.uid() or public.has_staff_role());
create policy "answers_own_or_staff" on public.exam_answers for all to authenticated
using (exists(select 1 from public.exam_sessions s where s.id=session_id and (s.user_id=auth.uid() or public.has_staff_role())))
with check (exists(select 1 from public.exam_sessions s where s.id=session_id and (s.user_id=auth.uid() or public.has_staff_role())));

create policy "materials_read_published_or_staff" on public.study_materials for select to authenticated
using (is_published or public.has_staff_role());
create policy "materials_staff_manage" on public.study_materials for all to authenticated
using (public.has_staff_role()) with check (public.has_staff_role());

create policy "checklist_own_or_staff" on public.document_checklists for all to authenticated
using (user_id = auth.uid() or public.has_staff_role())
with check (user_id = auth.uid() or public.has_staff_role());

create policy "zoom_read_authenticated" on public.zoom_schedules for select to authenticated using (true);
create policy "zoom_staff_manage" on public.zoom_schedules for all to authenticated
using (public.has_staff_role()) with check (public.has_staff_role());

create policy "notifications_own_or_staff" on public.notifications for select to authenticated
using (user_id = auth.uid() or public.has_staff_role());
create policy "notifications_update_own_or_staff" on public.notifications for update to authenticated
using (user_id = auth.uid() or public.has_staff_role())
with check (user_id = auth.uid() or public.has_staff_role());
create policy "logs_staff_read" on public.admin_activity_logs for select to authenticated using (public.has_staff_role());
create policy "logs_staff_insert" on public.admin_activity_logs for insert to authenticated with check (public.has_staff_role());

-- Helper untuk login fleksibel (bisa menggunakan nomor WhatsApp/Telepon atau Email)
create or replace function public.get_email_by_phone(phone_input text)
returns text
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  clean_input text;
  result_emails text;
begin
  -- Bersihkan karakter non-angka
  clean_input := regexp_replace(phone_input, '[^\d]', '', 'g');
  
  -- Normalisasi awalan: hilangkan 62 atau 0 di depan untuk mendapatkan angka inti nomor
  if clean_input like '62%' then
    clean_input := substring(clean_input from 3);
  elsif clean_input like '0%' then
    clean_input := substring(clean_input from 2);
  end if;

  -- 1. Cari email di auth.users (terurut dari yang terbaru)
  select string_agg(distinct u.email, ',') into result_emails
  from auth.users u
  where (
    regexp_replace(coalesce(u.raw_user_meta_data->>'phone', ''), '[^\d]', '', 'g') like '%' || clean_input
    or regexp_replace(coalesce(u.phone, ''), '[^\d]', '', 'g') like '%' || clean_input
    or coalesce(u.raw_user_meta_data->>'phone', '') = phone_input
  );

  -- 2. Jika belum ditemukan di auth.users, cari di tabel profiles
  if result_emails is null or result_emails = '' then
    select string_agg(distinct p.email, ',') into result_emails
    from public.profiles p
    where (
      regexp_replace(coalesce(p.phone, ''), '[^\d]', '', 'g') like '%' || clean_input
      or p.phone = phone_input
    )
    and p.email is not null and p.email != '';
  end if;

  return result_emails;
end;
$$;

grant execute on function public.get_email_by_phone(text) to anon, authenticated;
grant select on public.profiles to anon, authenticated;

-- RPC Administrator Portal (admin.html)
create or replace function public.admin_get_dashboard_data(access_code_input text)
returns jsonb
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_accounts jsonb;
  v_categories jsonb;
  v_questions jsonb;
  v_results jsonb;
begin
  if coalesce(access_code_input, '') <> '140997' then
    raise exception 'Kode akses administrator tidak valid' using errcode = '42501';
  end if;

  select coalesce(jsonb_agg(row_to_json(t) order by t.created_at desc), '[]'::jsonb)
  into v_accounts
  from (
    select
      u.id,
      coalesce(nullif(p.full_name, ''), nullif(u.raw_user_meta_data->>'full_name', ''), 'Peserta CSCP') as full_name,
      coalesce(nullif(p.phone, ''), nullif(u.raw_user_meta_data->>'phone', ''), nullif(u.phone, ''), '') as phone,
      coalesce(nullif(p.email, ''), u.email) as email,
      u.email as auth_email,
      coalesce(nullif(p.birth_place, ''), u.raw_user_meta_data->>'birth_place') as birth_place,
      coalesce(
        p.birth_date,
        case
          when (u.raw_user_meta_data->>'birth_date') ~ '^\d{4}-\d{2}-\d{2}$'
            then (u.raw_user_meta_data->>'birth_date')::date
          else null
        end
      ) as birth_date,
      coalesce(nullif(p.domicile, ''), u.raw_user_meta_data->>'domicile') as domicile,
      coalesce(nullif(p.education_level, ''), u.raw_user_meta_data->>'education_level') as education_level,
      coalesce(nullif(p.major, ''), u.raw_user_meta_data->>'major') as major,
      coalesce(nullif(p.target_formation, ''), u.raw_user_meta_data->>'target_formation') as target_formation,
      coalesce(p.privacy_consent, (u.raw_user_meta_data->>'privacy_consent')::boolean, false) as privacy_consent,
      coalesce(p.created_at, u.created_at) as created_at,
      u.last_sign_in_at,
      u.email_confirmed_at,
      coalesce(
        (select string_agg(ur.role, ',') from public.user_roles ur where ur.user_id = u.id),
        'participant'
      ) as roles,
      (select count(*)::int from public.exam_sessions es where es.user_id = u.id) as tryout_count,
      (select max(es.total_score) from public.exam_sessions es where es.user_id = u.id) as best_score,
      (select count(*)::int from public.document_checklists dc where dc.user_id = u.id and dc.is_completed = true) as checklist_done_count,
      (select count(*)::int from public.document_checklists dc where dc.user_id = u.id) as checklist_total_count
    from auth.users u
    left join public.profiles p on p.id = u.id
  ) t;

  select coalesce(jsonb_agg(jsonb_build_object(
    'id', c.id,
    'code', c.code,
    'name', c.name,
    'description', c.description
  ) order by c.code), '[]'::jsonb)
  into v_categories
  from public.exam_categories c;

  select coalesce(jsonb_agg(q_row order by q_row.created_at desc), '[]'::jsonb)
  into v_questions
  from (
    select
      q.id,
      q.category_id,
      ec.code as category_code,
      ec.name as category_name,
      q.question_text,
      q.explanation,
      q.scoring_type,
      q.is_published,
      q.created_at,
      q.updated_at,
      coalesce((
        select jsonb_agg(
          jsonb_build_object(
            'id', qo.id,
            'option_key', qo.option_key,
            'option_text', qo.option_text,
            'score', qo.score,
            'is_correct', qo.is_correct
          ) order by qo.option_key
        )
        from public.question_options qo
        where qo.question_id = q.id
      ), '[]'::jsonb) as options
    from public.questions q
    join public.exam_categories ec on ec.id = q.category_id
  ) q_row;

  select coalesce(jsonb_agg(r_row order by r_row.started_at desc), '[]'::jsonb)
  into v_results
  from (
    select
      es.id,
      es.user_id,
      coalesce(nullif(p.full_name, ''), nullif(u.raw_user_meta_data->>'full_name', ''), 'Peserta CSCP') as full_name,
      coalesce(nullif(p.phone, ''), nullif(u.raw_user_meta_data->>'phone', ''), '') as phone,
      coalesce(nullif(p.email, ''), u.email) as email,
      coalesce(nullif(p.target_formation, ''), u.raw_user_meta_data->>'target_formation') as target_formation,
      es.title,
      es.status,
      es.started_at,
      es.submitted_at,
      es.total_score,
      es.result_summary,
      (select count(*)::int from public.exam_answers ea where ea.session_id = es.id) as answered_count
    from public.exam_sessions es
    left join public.profiles p on p.id = es.user_id
    left join auth.users u on u.id = es.user_id
  ) r_row;

  return jsonb_build_object(
    'accounts', v_accounts,
    'categories', v_categories,
    'questions', v_questions,
    'tryout_results', v_results
  );
end;
$$;

create or replace function public.admin_save_question(access_code_input text, question_payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_question_id uuid;
  v_category_id uuid;
  v_category_code text;
  v_question_text text;
  v_explanation text;
  v_scoring_type text;
  v_is_published boolean;
  v_opt jsonb;
begin
  if coalesce(access_code_input, '') <> '140997' then
    raise exception 'Kode akses administrator tidak valid' using errcode = '42501';
  end if;

  v_category_code := upper(trim(coalesce(question_payload->>'category_code', 'TWK')));
  select id into v_category_id from public.exam_categories where code = v_category_code limit 1;
  if v_category_id is null then
    raise exception 'Kategori soal % tidak ditemukan', v_category_code;
  end if;

  v_question_text := trim(coalesce(question_payload->>'question_text', ''));
  if v_question_text = '' then
    raise exception 'Teks soal tidak boleh kosong';
  end if;

  v_explanation := nullif(trim(coalesce(question_payload->>'explanation', '')), '');
  v_scoring_type := coalesce(nullif(question_payload->>'scoring_type', ''), case when v_category_code = 'TKP' then 'weighted' else 'objective' end);
  v_is_published := coalesce((question_payload->>'is_published')::boolean, false);

  if nullif(trim(coalesce(question_payload->>'id', '')), '') is not null then
    v_question_id := (question_payload->>'id')::uuid;
    update public.questions
    set
      category_id = v_category_id,
      question_text = v_question_text,
      explanation = v_explanation,
      scoring_type = v_scoring_type,
      is_published = v_is_published,
      updated_at = now()
    where id = v_question_id;

    if not found then
      raise exception 'Soal tidak ditemukan untuk diperbarui';
    end if;

    delete from public.question_options where question_id = v_question_id;
  else
    insert into public.questions (category_id, question_text, explanation, scoring_type, is_published)
    values (v_category_id, v_question_text, v_explanation, v_scoring_type, v_is_published)
    returning id into v_question_id;
  end if;

  for v_opt in select * from jsonb_array_elements(coalesce(question_payload->'options', '[]'::jsonb))
  loop
    if trim(coalesce(v_opt->>'option_text', '')) <> '' then
      insert into public.question_options (question_id, option_key, option_text, score, is_correct)
      values (
        v_question_id,
        upper(trim(v_opt->>'option_key')),
        trim(v_opt->>'option_text'),
        coalesce((v_opt->>'score')::integer, 0),
        coalesce((v_opt->>'is_correct')::boolean, false)
      );
    end if;
  end loop;

  return v_question_id;
end;
$$;

create or replace function public.admin_toggle_question_publish(access_code_input text, target_question_id uuid, next_published boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(access_code_input, '') <> '140997' then
    raise exception 'Kode akses administrator tidak valid' using errcode = '42501';
  end if;

  update public.questions
  set is_published = next_published, updated_at = now()
  where id = target_question_id;
end;
$$;

create or replace function public.admin_delete_question(access_code_input text, target_question_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(access_code_input, '') <> '140997' then
    raise exception 'Kode akses administrator tidak valid' using errcode = '42501';
  end if;

  delete from public.questions where id = target_question_id;
end;
$$;

grant execute on function public.admin_get_dashboard_data(text) to anon, authenticated;
grant execute on function public.admin_save_question(text, jsonb) to anon, authenticated;
grant execute on function public.admin_toggle_question_publish(text, uuid, boolean) to anon, authenticated;
grant execute on function public.admin_delete_question(text, uuid) to anon, authenticated;

-- NOTE: Add indexes, audit triggers, and stricter column-level controls after reviewing production needs.
-- Never expose Supabase service_role key in browser code.
