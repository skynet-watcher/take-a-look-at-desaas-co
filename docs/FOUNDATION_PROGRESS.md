# Foundation Progress

## Current Branch

`feature/ai-onboarding-preview`

## What Started

The first backend foundation pass now exists under `services/backend`.

This is intentionally a scaffold, not a full backend app. The purpose is to lock in the architecture constraints before anyone starts building request handlers or product workflows.

## What Is In Place

### Separate Backend Service

Path: `services/backend`

The backend has its own package boundary, TypeScript config, Drizzle config, and README. The existing website remains a static/public preview surface. Durable product work is now explicitly routed toward the separate backend service.

### Migration 1 Tenant Foundation

Path: `services/backend/drizzle/0001_tenant_foundation.sql`

The first migration includes:

- `organizations`
- `users`
- `memberships`
- `prospect_sessions`
- `audit_events`
- `integration_credentials`
- `ai_usage_events`
- `data_exports`
- `pgcrypto`
- `pgvector`
- Row-Level Security enabled and forced on every table
- tenant isolation policies using `app.current_organization_id`

Important design choice: anonymous website prospect sessions are still tenant-owned. They belong to a DeSaaS host organization until conversion, rather than creating tenantless rows.

### Tenant-Aware DB Contract

Paths:

- `services/backend/src/db/schema.ts`
- `services/backend/src/db/client.ts`
- `services/backend/src/db/tenant.ts`

The Drizzle schema mirrors the first migration, and the database client exposes `withTenant(...)`, which sets Postgres tenant context before running queries inside a transaction.

### Async AI Work Boundary

Paths:

- `services/backend/src/ai/provider.ts`
- `services/backend/src/ai/operations.ts`
- `services/backend/src/events/client.ts`
- `services/backend/src/events/functions.ts`
- `services/backend/src/events/types.ts`

The scaffold includes:

- `AIProvider` interface
- prompt/schema envelopes with version fields
- Inngest client
- first job skeletons for document extraction, workflow recording summary, and roadmap drafting

The only allowed synchronous AI path remains the public website intake conversation. Everything else is represented as queued work.

### Sovereignty Interfaces

Paths:

- `services/backend/src/integrations/secrets.ts`
- `services/backend/src/storage/object-storage.ts`

These interfaces keep integration credentials and object storage behind provider-neutral contracts so the future BYOS, BYO AI key, and BYOC paths stay viable.

## Not Done Yet

- No HTTP framework selected.
- No real Drizzle migration generation has been run.
- No database has been provisioned locally.
- No Inngest functions are wired to an HTTP endpoint yet.
- No AI provider implementation exists yet.
- No auth/session model exists beyond the starting tables.

Those are intentional stops, not accidental gaps.

## Open Decisions Before More Build

- Confirm the exact RLS policy model for `organizations`, `users`, and `memberships`.
- Confirm whether users are tenant-scoped only or whether we need global identities with tenant-owned profile rows.
- Confirm Inngest job graph for document ingestion before implementation.
- Confirm pgvector embedding dimensions and index type.
- Confirm secrets backend interface before first OAuth connector.
- Choose the backend HTTP framework.

## Suggested Next Step

Review the tenant model first. If Alex signs off, the next practical build step is adding the first backend route surface for prospect profile persistence while keeping the website intake synchronous and lightweight.
