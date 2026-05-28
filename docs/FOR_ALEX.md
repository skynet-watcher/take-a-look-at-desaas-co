# For Alex

I started the foundational work and kept it aligned with your three non-negotiables.

## What I Committed

- Added `services/backend` as a separate backend service boundary.
- Added migration 1 SQL with RLS enabled and forced from the beginning.
- Added tenant context handling through `app.current_organization_id`.
- Added initial Drizzle schema for the tenant foundation tables.
- Added Inngest job skeletons for document extraction, workflow recording summary, and roadmap drafting.
- Added the `AIProvider` interface and prompt/schema versioning shape.
- Added secrets and object-storage abstractions so BYO storage / BYO AI keys / BYOC do not get blocked later.
- Documented the exact stopping point in `docs/FOUNDATION_PROGRESS.md`.

## The Main Design Call I Made

Anonymous website prospect sessions still need tenant ownership. I modeled them as belonging to a DeSaaS host organization until conversion, rather than allowing `organization_id` to be nullable.

That keeps the "no tenantless product data" rule intact, but it does mean we need to explicitly create/identify the host organization during environment setup.

## Needs Your Review

- Is tenant-scoped `users` acceptable for now, or do you want global identities plus tenant-owned user profile rows?
- Are the first RLS policies strict enough for migration 1, especially for `organizations`, `users`, and `memberships`?
- Do you want the backend HTTP framework chosen now, or should that wait until the first route surface is defined?
- For pgvector, do you want us to standardize on embedding dimensions and HNSW/IVFFlat before any document ingestion code lands?
- For Inngest, confirm whether the current first job graph is directionally right before implementation:
  - document uploaded -> parse document -> extract workflow candidates -> write source evidence
  - workflow recording ready -> transcribe/OCR -> summarize session
  - roadmap requested -> load graph -> score opportunities

## What I Did Not Do

- I did not add Next.js API routes.
- I did not put AI work on request paths.
- I did not implement provider-specific AI clients yet.
- I did not wire OAuth or webhook ingestion yet.
- I did not choose a backend HTTP framework without confirmation.

Chad
