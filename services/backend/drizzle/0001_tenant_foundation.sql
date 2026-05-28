create extension if not exists "pgcrypto";
create extension if not exists "vector";

create type membership_role as enum ('owner', 'admin', 'member', 'viewer');
create type prospect_status as enum ('anonymous', 'identified', 'converted', 'archived');
create type ai_provider_kind as enum ('desaas_managed', 'openai', 'anthropic', 'azure_openai');
create type secret_backend_kind as enum ('desaas_vault', 'aws_secrets_manager', 'azure_key_vault');

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  data_region text not null default 'us-east-1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create unique index organizations_slug_idx on organizations (slug);

create table users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  email text not null,
  name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create unique index users_org_email_idx on users (organization_id, email);
create index users_organization_idx on users (organization_id);

create table memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  user_id uuid not null references users(id),
  role membership_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create unique index memberships_org_user_idx on memberships (organization_id, user_id);
create index memberships_organization_idx on memberships (organization_id);

create table prospect_sessions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  anonymous_session_id text not null,
  status prospect_status not null default 'anonymous',
  profile jsonb not null default '{}'::jsonb,
  converted_organization_id uuid references organizations(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index prospect_sessions_anonymous_session_idx on prospect_sessions (anonymous_session_id);
create index prospect_sessions_organization_idx on prospect_sessions (organization_id);

create table audit_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  actor_user_id uuid references users(id),
  action text not null,
  subject_type text not null,
  subject_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index audit_events_org_created_idx on audit_events (organization_id, created_at);

create table integration_credentials (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  provider text not null,
  secret_backend secret_backend_kind not null default 'desaas_vault',
  secret_ref text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index integration_credentials_organization_idx on integration_credentials (organization_id);

create table ai_usage_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  provider ai_provider_kind not null,
  operation text not null,
  prompt_version text not null,
  input_tokens integer,
  output_tokens integer,
  estimated_cost_usd numeric(12, 6),
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index ai_usage_events_org_created_idx on ai_usage_events (organization_id, created_at);

create table data_exports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  requested_by_user_id uuid references users(id),
  status text not null default 'queued',
  object_storage_key text,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  deleted_at timestamptz
);

create index data_exports_organization_idx on data_exports (organization_id);

alter table organizations enable row level security;
alter table organizations force row level security;
alter table users enable row level security;
alter table users force row level security;
alter table memberships enable row level security;
alter table memberships force row level security;
alter table prospect_sessions enable row level security;
alter table prospect_sessions force row level security;
alter table audit_events enable row level security;
alter table audit_events force row level security;
alter table integration_credentials enable row level security;
alter table integration_credentials force row level security;
alter table ai_usage_events enable row level security;
alter table ai_usage_events force row level security;
alter table data_exports enable row level security;
alter table data_exports force row level security;

create policy organizations_tenant_isolation on organizations
  using (id = nullif(current_setting('app.current_organization_id', true), '')::uuid)
  with check (id = nullif(current_setting('app.current_organization_id', true), '')::uuid);

create policy users_tenant_isolation on users
  using (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid)
  with check (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid);

create policy memberships_tenant_isolation on memberships
  using (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid)
  with check (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid);

create policy prospect_sessions_tenant_isolation on prospect_sessions
  using (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid)
  with check (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid);

create policy audit_events_tenant_isolation on audit_events
  using (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid)
  with check (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid);

create policy integration_credentials_tenant_isolation on integration_credentials
  using (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid)
  with check (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid);

create policy ai_usage_events_tenant_isolation on ai_usage_events
  using (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid)
  with check (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid);

create policy data_exports_tenant_isolation on data_exports
  using (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid)
  with check (organization_id = nullif(current_setting('app.current_organization_id', true), '')::uuid);
