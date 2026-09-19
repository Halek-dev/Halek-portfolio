-- ═══════════════════════════════════════════════════════════════
-- HALEK — lead-gen + client-delivery schema
--
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor →
-- New query → paste → Run). It is idempotent: re-running is safe.
--
-- SECURITY MODEL — read this before changing anything.
--
--   RLS is ON for all three tables and there are NO policies for the
--   `anon` role. That is deliberate, not an oversight. The anon key is
--   shipped in client JavaScript and is readable by anyone who opens
--   devtools, so anything anon can do, the whole internet can do.
--
--   Every write goes through a Next.js Server Action using the SERVICE
--   ROLE key, which bypasses RLS and never leaves the server. So:
--     · nobody can read the leads table from the browser
--     · nobody can forge a project or a message
--     · nobody can flip their own lead to status = 'accepted'
--
--   Phase 5 adds scoped client access for the chat. When it does, it
--   gets narrow policies keyed to the signed-in client — never a
--   blanket `using (true)`.
-- ═══════════════════════════════════════════════════════════════

-- ── enums ──────────────────────────────────────────────────────
do $$ begin
  create type public.lead_status as enum ('pending', 'accepted', 'rejected');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.project_status as enum ('onboarding', 'in_progress', 'review', 'delivered');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.message_sender as enum ('client', 'halek');
exception when duplicate_object then null; end $$;


-- ── contact-channel validation ─────────────────────────────────
-- `contacts` is a jsonb array of exactly three {channel, value} objects,
-- with three DISTINCT channels drawn from the allowed set. Enforcing it
-- here means a malformed row cannot exist even if the form is bypassed.
-- CASE rather than chained AND: SQL does not guarantee short-circuit
-- evaluation, and jsonb_array_length() raises on a non-array. CASE is
-- defined to evaluate in order, so a bad shape returns false instead of
-- erroring with something unreadable.
create or replace function public.valid_lead_contacts(c jsonb)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select case
    when c is null then false
    when pg_catalog.jsonb_typeof(c) <> 'array' then false
    when pg_catalog.jsonb_array_length(c) <> 3 then false
    else (
      select pg_catalog.count(distinct e->>'channel') = 3
         and pg_catalog.bool_and(
               e->>'channel' in ('email', 'whatsapp', 'imessage', 'telegram', 'sms')
               and pg_catalog.coalesce(pg_catalog.btrim(e->>'value'), '') <> ''
             )
      from pg_catalog.jsonb_array_elements(c) e
    )
  end;
$$;

comment on function public.valid_lead_contacts is
  'Exactly three distinct contact channels, each with a non-empty value.';


-- ── leads ──────────────────────────────────────────────────────
create table if not exists public.leads (
  id                  uuid primary key default gen_random_uuid(),
  name                text not null check (btrim(name) <> ''),
  business            text not null check (btrim(business) <> ''),
  -- Nullable on purpose: the form offers "skip, I'll explain in chat".
  project_description text,
  contacts            jsonb not null,
  referrer            text,
  status              public.lead_status not null default 'pending',
  created_at          timestamptz not null default now(),

  constraint leads_contacts_valid check (public.valid_lead_contacts(contacts))
);

comment on table public.leads is 'Inbound free-slice applications. Written only by the server.';
comment on column public.leads.contacts is
  'jsonb: [{"channel":"email","value":"a@b.com"}, ...] — exactly 3, distinct channels.';
comment on column public.leads.referrer is 'Free text: who sent them. Null when nobody did.';

-- The admin queue reads pending-first, newest-first.
create index if not exists leads_status_created_idx
  on public.leads (status, created_at desc);


-- ── projects ───────────────────────────────────────────────────
create table if not exists public.projects (
  id         uuid primary key default gen_random_uuid(),
  -- One project per accepted lead. The unique constraint makes
  -- double-accepting a lead a database error rather than a duplicate.
  lead_id    uuid not null unique references public.leads (id) on delete cascade,
  status     public.project_status not null default 'onboarding',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.projects is 'Created when a lead is accepted. One row per lead.';

create index if not exists projects_status_idx on public.projects (status, updated_at desc);


-- ── messages ───────────────────────────────────────────────────
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  sender     public.message_sender not null,
  body       text not null check (btrim(body) <> ''),
  created_at timestamptz not null default now()
);

comment on table public.messages is 'Chat thread per project. Realtime-enabled.';

-- Thread reads are always "this project, in order".
create index if not exists messages_project_created_idx
  on public.messages (project_id, created_at);


-- ── updated_at maintenance ─────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := pg_catalog.now();
  return new;
end;
$$;

drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at
  before update on public.projects
  for each row execute function public.touch_updated_at();


-- ── row level security ─────────────────────────────────────────
-- Enabled with no anon policies: default-deny. See the header note.
alter table public.leads    enable row level security;
alter table public.projects enable row level security;
alter table public.messages enable row level security;

-- Force RLS so even the table owner is subject to it. The service role
-- still bypasses RLS, which is exactly the one path we want.
alter table public.leads    force row level security;
alter table public.projects force row level security;
alter table public.messages force row level security;

-- Belt and braces: revoke the default grants Supabase hands to the
-- public roles, so a missing policy can never become an open door.
revoke all on public.leads    from anon, authenticated;
revoke all on public.projects from anon, authenticated;
revoke all on public.messages from anon, authenticated;


-- ── realtime ───────────────────────────────────────────────────
-- REPLICA IDENTITY FULL makes UPDATE and DELETE events carry the old
-- row, so a status change tells the client what it changed *from*.
alter table public.projects replica identity full;
alter table public.messages replica identity full;

do $$ begin
  alter publication supabase_realtime add table public.messages;
exception when duplicate_object then null; end $$;

do $$ begin
  alter publication supabase_realtime add table public.projects;
exception when duplicate_object then null; end $$;


-- ── verification ───────────────────────────────────────────────
-- Run this after the above; every row should read exactly as commented.
--
--   select tablename, rowsecurity, forcerowsecurity
--     from pg_tables where schemaname = 'public'
--      and tablename in ('leads','projects','messages');
--   -- expect rowsecurity = t and forcerowsecurity = t for all three
--
--   select count(*) from pg_policies where schemaname = 'public';
--   -- expect 0 until Phase 5
--
--   select tablename from pg_publication_tables
--    where pubname = 'supabase_realtime' and schemaname = 'public';
--   -- expect messages and projects
