-- =====================================================================
-- CSCP Administrator RPC Setup (Supabase SQL Editor)
-- Jalankan skrip ini SEKALI di Supabase SQL Editor agar Portal Admin
-- (admin.html dengan kode akses 140997) dapat membaca seluruh akun
-- terdaftar, membuat/mengelola soal Mini Try Out, dan memantau hasil.
-- =====================================================================

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
