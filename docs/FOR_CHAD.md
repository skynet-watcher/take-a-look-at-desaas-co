# For Chad

Hey — a few things to watch for as you work through the plan.

## The Non-Negotiables (Don't Skip These)

**Multi-tenancy from migration 1.**
Every table needs `organization_id` as a non-nullable FK. Postgres RLS policies enforce tenant isolation at the DB layer, not in application code. If you set this up without RLS and rely on the app layer, we'll have a data leak problem that's a nightmare to fix under a live product. Get this right before any other table exists.

**Separate backend service — not Next.js API routes.**
The plan is clear on this. The Next.js app is frontend + public AI intake only. All business logic, background jobs, OAuth callbacks, webhook ingestion, and AI orchestration live in a separate Node.js service. Don't let this slide to "we'll split it later."

**AI calls are async — no exceptions on request paths.**
Document parsing, session summarization, workflow extraction — all queued through Inngest, all background. The only synchronous AI call allowed is the website intake conversation. If you're tempted to make a direct AI call in a request handler for anything else, it goes through the queue instead.

## Stack Decisions Already Made

Don't re-litigate these:

- **ORM:** Drizzle (not Prisma)
- **Background jobs:** Inngest
- **Vector search:** pgvector (Postgres extension, not a separate service)
- **Desktop app (Phase 3):** Tauri (not Electron)
- **AI provider:** abstracted behind an `AIProvider` interface from day one — supports Anthropic, OpenAI, Azure OpenAI, and client-supplied keys

## The Ownership Ladder — Build With It In Mind

Read the **Architecture Philosophy: Client Sovereignty** section in the main plan before touching the integrations or storage layers. Every design decision should be compatible with a client eventually owning their own storage (Stage 2), their own AI keys (Stage 3), and their own infrastructure (Stage 4). If you're hardcoding DeSaaS credentials anywhere except the provider interface, flag it.

## Open Questions To Raise

If anything below is unclear after reading the plan, raise it before building:

- [ ] Inngest flow topology for document ingestion — confirm the job graph before wiring it up
- [ ] pgvector schema — confirm embedding dimensions and index type (HNSW vs IVFFlat) for the expected data volume
- [ ] Integration credentials abstraction — confirm the secrets backend interface before implementing the first OAuth connector
- [ ] RLS policy design — confirm row-level policies for `organizations`, `users`, and `memberships` before any other table

— Alex
