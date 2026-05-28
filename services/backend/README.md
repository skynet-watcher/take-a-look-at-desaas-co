# DeSaaS Backend Service

This is the dedicated backend service boundary for the DeSaaS onboarding platform.

The public website can keep its synchronous intake experience, but every durable business operation belongs here:

- workspace and membership management
- tenant-scoped persistence
- document ingestion
- AI orchestration
- OAuth callbacks and integration sync
- webhook ingestion
- workflow capture processing
- roadmap generation
- data export and audit log services

## Non-Negotiables

- Postgres Row-Level Security starts in migration 1.
- Every tenant-owned table has a non-null `organization_id`.
- AI work is queued through Inngest except the public website intake conversation.
- AI providers and secrets are abstracted so clients can bring their own keys and infrastructure later.

## Current Status

This service is a foundation scaffold. It intentionally avoids choosing an HTTP framework until the backend route surface is clearer. The files here establish the data boundary, tenant context contract, AI provider contract, secrets abstraction, and first async job topology.
