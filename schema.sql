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

-- NOTE: Add indexes, audit triggers, and stricter column-level controls after reviewing production needs.
-- Never expose Supabase service_role key in browser code.
