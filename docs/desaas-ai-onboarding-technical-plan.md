# DeSaaS AI Onboarding Platform Technical Plan

## Product North Star

DeSaaS should feel like an AI operations team that starts learning a business the moment a qualified visitor lands on the site, then guides that company through a progressively deeper onboarding journey: website conversation, account creation, document upload, tool connections, employee interviews, workflow observation, process mapping, and automation roadmap generation.

The product should not feel like a generic chatbot or consulting intake form. It should feel like a living onboarding system that gathers useful context early, earns trust quickly, and converts that context into an operational blueprint for AI-powered automation.

## Core Product Promise

For a small or medium business, DeSaaS will:

- Understand the business model, team, tools, and operational goals.
- Capture existing SOPs, documents, templates, and workflows.
- Interview key employees in context.
- Observe real work through browser, desktop, and app integrations.
- Identify bottlenecks, repeated tasks, broken handoffs, and automation opportunities.
- Produce a prioritized automation roadmap and implementation plan.
- Power the transition from discovery into deployed AI agents and workflow automations.

## Architecture Philosophy: Client Sovereignty

DeSaaS sells intelligence, not custody. The client should progressively own more of their own infrastructure as trust deepens and the product matures.

This is a core architectural constraint, not a feature. Every technical decision should be compatible with the full sovereignty end state.

### The Ownership Ladder

```
Stage 5 │ Fully Sovereign      Client runs everything, DeSaaS is pure software / open-source core
Stage 4 │ Infrastructure       Client's own cloud account (AWS/Azure/GCP), DeSaaS deploys software there
Stage 3 │ AI Sovereign         Client's own AI API keys, prompts never touch DeSaaS servers
Stage 2 │ Storage Sovereign    Client's own S3/blob, heavy data never stored by DeSaaS
Stage 1 │ Data Transparent     Hosted by DeSaaS, but fully exportable and auditable at all times
Stage 0 │ Hosted SaaS          DeSaaS hosts everything (launch state)
```

Each stage is available as an unlock for clients who need it — not a forced migration path. The architecture must support Stage 4 from day one even if the product ships at Stage 0.

### What DeSaaS Retains at Every Stage

Even at full client sovereignty, DeSaaS charges for:

- The software license.
- The AI orchestration intelligence — prompts, schemas, scoring logic.
- The automation pattern library.
- The roadmap generation engine.
- Managed services and support.
- The consultant console.

The data layer is the client's. The intelligence layer is ours.

### Phasing the Ownership Ladder Into the Build

| Build Phase | Ownership Stage to Introduce |
|---|---|
| Phase 1–2 | Stage 0: Hosted SaaS, architected for the full ladder |
| Phase 2–3 | Stage 1: Full data export and audit log surfaced to client |
| Phase 3–4 | Stage 2: Bring Your Own Storage for documents and recordings |
| Phase 4–5 | Stage 3: Bring Your Own AI Keys, provider abstraction layer |
| Phase 6 | Stage 4: BYOC infrastructure-as-code deployment option |
| Phase 7+ | Stage 5: Open-source core consideration |

---

## Experience Layers

### 1. Public Website Intelligence Layer

The website should begin onboarding before signup.

As soon as a visitor interacts with DeSaaS, the site should start building a lightweight anonymous prospect profile. Once the visitor identifies themselves through a form, chat, booking flow, email capture, or account creation, the anonymous session data should merge into a known client profile.

Captured signals:

- Pages viewed.
- Industry pages visited.
- Use cases explored.
- Pricing or implementation content viewed.
- Chat questions asked.
- Pain points selected.
- Company size.
- Current tools.
- Submitted website URL.
- Uploaded sample documents, if offered pre-signup.
- Meeting booking intent.
- Source campaign and referral metadata.

Website AI interactions:

- "What are you trying to automate?"
- "What tools does your team currently use?"
- "Where does work get stuck?"
- "Do you have SOPs, spreadsheets, or templates we can review?"
- "Would you like an initial automation opportunity snapshot?"

The website should offer a low-friction first value moment:

- Website URL scan.
- Short AI interview.
- Tool stack intake.
- Optional SOP upload.
- Generated "Automation Readiness Snapshot."

This snapshot should be useful but incomplete, nudging the client toward signup for deeper onboarding.

### 2. Signup And Client Workspace Creation

After conversion, the system creates a client workspace.

Workspace entities:

- Organization.
- Users.
- Roles.
- Departments.
- Tools.
- Documents.
- Workflows.
- Interviews.
- Screen sessions.
- Automation opportunities.
- Recommendations.
- Implementation roadmap.

Signup must preserve everything already learned from the website session. The first post-signup screen shows the client what DeSaaS already knows about them — not a blank workspace. The `prospect_sessions` record links to the new `organizations` record at conversion time.

Initial post-signup flow:

1. Confirm company profile — pre-filled from website session.
2. Identify primary onboarding owner.
3. Select departments to onboard.
4. Invite key employees.
5. Upload documents.
6. Connect tools.
7. Schedule or launch guided workflow capture.

### Minimum Viable Onboarding Path

Not every client will complete the full onboarding flow immediately. The system must be able to generate a first-draft roadmap from the minimum viable input:

1. Connect one tool.
2. Upload one document.
3. Answer a five-question interview.

Every additional input improves the roadmap. This minimum path must always be available and clearly communicated during signup. The onboarding dashboard should show what each additional data source unlocks, not just what is missing.

### 3. Document Intelligence Layer

The first real onboarding action should be upload-based because it has low friction and high signal.

Supported inputs:

- PDF SOPs.
- Word documents.
- Google Docs.
- Spreadsheets.
- CSV exports.
- Presentation decks.
- Process diagrams.
- Email templates.
- Sales scripts.
- Training manuals.
- Checklists.
- Existing automation exports.
- Loom/transcript uploads.

Extraction outputs:

- Process names.
- Process owners.
- Trigger events.
- Required inputs.
- Tools involved.
- Step-by-step workflow.
- Decision points.
- Exceptions.
- Approvals.
- Outputs.
- Risks.
- Missing details.
- Candidate automations.

The AI should compare documents against later observed behavior and flag mismatches:

- "The SOP says sales creates the project, but screen capture shows operations creates it."
- "The checklist includes approval, but no approval appeared in the observed workflow."
- "The spreadsheet appears to be the real source of truth, not the CRM."

### 4. Tool Connection Layer

The platform should use read-only discovery connections first. This reduces trust friction and keeps onboarding safe.

Priority integrations:

- Google Workspace.
- Microsoft 365.
- Slack.
- Teams.
- HubSpot.
- Salesforce.
- Pipedrive.
- QuickBooks.
- Xero.
- Airtable.
- Notion.
- ClickUp.
- Asana.
- Monday.
- Trello.
- Zendesk.
- Intercom.
- Help Scout.
- Shopify.
- Calendly.
- Zapier.
- Make.
- n8n.

Integration discovery should collect:

- Objects and schemas.
- Recent activity.
- Common fields.
- User roles.
- Workflow artifacts.
- Templates.
- Automations.
- Pipelines.
- Statuses.
- Handoff patterns.

The integration layer should eventually support write actions, but only after the client approves specific automations.

#### Integration Approval Reality

OAuth is not a simple step for many clients. The onboarding flow must account for these realities:

- Microsoft 365 requires admin consent at the Azure AD tenant level. An individual employee cannot authorize it.
- Google Workspace with domain-wide delegation requires IT admin setup.
- Slack Enterprise Grid requires org-level tokens, not workspace-level.
- Enterprise clients often have allowlists of approved OAuth apps. Approval can take days or weeks.
- SSO/SAML is not covered by standard OAuth and must be handled separately for enterprise workspaces.

An "Integration Readiness" step should appear during onboarding for each connector, telling the onboarding owner upfront which integrations require IT admin involvement. Where IT approval is required, the system should generate a ready-made request the onboarding owner can forward to IT, including the specific permissions being requested and why.

### 5. Employee Interview Layer

The product should interview employees differently based on role and observed workflow context.

Interview types:

- Founder interview.
- Operations interview.
- Sales interview.
- Customer success interview.
- Finance/admin interview.
- Delivery/production interview.
- Support interview.
- Department-specific follow-up interviews.

The interview engine should use previous client context so it does not ask generic questions repeatedly.

Example:

If document parsing finds a "New Customer Onboarding SOP," the system should ask the customer success lead:

- "Is this still current?"
- "Which steps usually get skipped?"
- "What is the most common exception?"
- "Where do you wait on another person?"
- "What do you copy manually between tools?"

#### Employee Invite Experience

The employee-facing experience is a separate, simplified view with no login friction. Access is via magic link or token URL — no account creation required.

The first screen must explain:

- Who invited them and why.
- What they will be asked.
- How long it will take (target: under 15 minutes).
- What happens with their answers.

The employee invite experience should feel completely separate from the DeSaaS admin product.

### 6. Workflow Observation Layer

This is the advanced capture layer.

Capture modes:

- Browser extension for SaaS workflows.
- Desktop recorder for local apps and cross-app work.
- Meeting recorder for live walkthroughs.
- Manual workflow builder for teams that cannot record screens.
- Integration-based event mining for connected tools.

Captured data:

- Page/application context.
- Clicks and field interactions.
- URLs and object IDs where safe.
- Copy/paste events.
- Document and file references.
- Time between steps.
- App switching.
- Repeated manual steps.
- User narration.
- Screen transcript via OCR.
- Optional audio explanation.

Privacy controls:

- Pause/resume recording.
- Blur/redact sensitive fields.
- Exclude apps/domains.
- Local preview before upload.
- Admin approval before AI processing.
- Clear retention settings.

The AI should ask contextual clarification questions after a workflow session:

- "You copied the client name from email into the CRM. Is email always the source?"
- "You waited on a Slack reply before continuing. Who approves this step?"
- "You changed the invoice amount manually. What determines that value?"
- "This task took 14 minutes. How often do you do it?"

#### Graceful Degradation for Restricted Environments

Many clients operate on managed devices (Intune, Jamf, MDM). Chrome extensions require IT policy approval. macOS screen recording requires explicit Accessibility and Screen Recording permissions. Corporate environments may block unsigned desktop apps.

Capture capability must degrade gracefully. If the extension cannot be installed or the desktop recorder cannot get permissions, the system falls back automatically to meeting recorder and manual workflow builder — zero friction, no dead ends. The onboarding dashboard shows what is currently capturable in this client's environment.

#### Chrome Extension Technical Constraints

The browser extension must be built for Manifest V3. Capabilities planned for Phase 2 must be validated against MV3 restrictions before commitment. Rich form field capture and network request interception require `debugger` permission which displays a visible security warning banner in Chrome — evaluate whether this is acceptable for the intended use case before shipping.

### 7. Process Graph Layer

The platform should maintain a canonical graph of the client's operations.

Primary objects:

- Business.
- Department.
- Role.
- Employee.
- Tool.
- Data object.
- Workflow.
- Workflow step.
- Trigger.
- Decision.
- Approval.
- Exception.
- Document.
- Recording.
- Integration event.
- Automation opportunity.
- Automation candidate.
- Deployed automation.

Example relationship:

`Lead Form -> creates Contact in HubSpot -> Sales qualifies -> Proposal generated -> Client signs -> Project created in ClickUp -> Invoice created in QuickBooks -> Onboarding email sent`

This graph becomes the source of truth for roadmap generation, future automations, and the client's AI assistant.

### 8. Automation Opportunity Engine

Each discovered workflow should be scored.

Scoring dimensions:

- Frequency.
- Time spent.
- Manual repetition.
- Error likelihood.
- Revenue impact.
- Customer experience impact.
- Employee frustration.
- Data availability.
- Integration availability.
- Process stability.
- Risk.
- Required human judgment.
- Implementation complexity.

Opportunity categories:

- Quick win.
- Needs cleanup first.
- Human-in-the-loop automation.
- Full automation candidate.
- AI assistant candidate.
- Custom application candidate.
- Not recommended.

Outputs:

- Ranked automation backlog.
- Estimated time savings.
- Recommended implementation path.
- Required integrations.
- Required human approvals.
- Risks and mitigations.
- Suggested DeSaaS project scope.

### 9. Client-Facing Roadmap Layer

The platform should generate a clear roadmap that clients can understand.

Views:

- Executive summary.
- Department workflow map.
- Automation opportunity list.
- 30/60/90 day roadmap.
- Estimated ROI.
- Required access list.
- Missing information list.
- Implementation status.

This is where DeSaaS turns onboarding into sales momentum.

---

## Recommended Technical Architecture

### Architecture Decision: Separate Backend Service

The backend is a dedicated Node.js service, not Next.js API routes. The Next.js app handles the frontend and the public-facing AI intake only. The backend service handles all business logic, background processing, webhook ingestion, OAuth callbacks, and AI orchestration. This is a firm decision — retrofitting a separate service boundary after build is expensive.

### Frontend

Stack:

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS.
- shadcn/ui for components.
- React Flow for workflow and process maps.
- TanStack Query for client data fetching.
- Zod for validation.
- Vercel for hosting.

Primary frontend apps:

- Public website.
- AI website intake assistant.
- Client onboarding portal.
- Employee interview experience (separate simplified view).
- Internal DeSaaS admin and consultant console.
- Workflow map viewer.
- Document review workspace.
- Automation roadmap workspace.

### Backend

Stack:

- Node.js service (separate from Next.js).
- TypeScript.
- Postgres with Row-Level Security.
- Drizzle ORM (lightweight, good TypeScript types, easier to migrate later).
- Inngest for background jobs and event-driven workflows.
- S3-compatible object storage.
- Redis for queues and session caching.
- Webhook ingestion layer with idempotency keys.

Core backend services:

- Identity and workspace service.
- Prospect/session tracking service.
- AI orchestration service (provider-abstracted, see AI Layer below).
- Document ingestion service.
- Integration service.
- Workflow capture ingestion service.
- Process graph service.
- Opportunity scoring service.
- Roadmap generation service.
- Notification service.
- Data export service.

### Multi-Tenancy: Hard Requirement

Every table has an `organization_id` foreign key. Postgres Row-Level Security policies enforce tenant isolation at the database layer, not only in application code. The Drizzle query client is initialized with a tenant context so cross-tenant reads are structurally impossible, not just conventionally avoided.

This is non-negotiable from day one. Retrofitting multi-tenancy on a live product is a data breach waiting to happen.

### Data Storage

Postgres is the system of record.

Object storage for:

- Uploaded documents.
- Screen recordings.
- Audio recordings.
- Generated reports.
- Extracted artifacts.

Raw screen recordings are stored with a 90-day default retention, configurable per organization. The durable record is the processed artifact: transcript, OCR summary, annotated workflow object. Clients may delete raw recordings after review. This keeps storage costs bounded.

Vector search uses pgvector as a Postgres extension. Embeddings are organization-scoped by design — no cross-tenant vector space. Tables: `document_embeddings`, `workflow_embeddings`, `interview_embeddings`. Adding a dedicated vector database is deferred until Postgres query performance becomes a constraint.

Graph queries use an adjacency list pattern with recursive CTEs. `process_graph_nodes` and `process_graph_edges` are designed from day one to support recursive ancestor/descendant traversal. If query complexity grows, a closure table can be added without changing the base schema.

### AI Layer

AI responsibilities:

- Website intake conversation.
- Prospect qualification.
- Document extraction.
- SOP summarization.
- Workflow extraction.
- Interview generation.
- Clarifying question generation.
- Screen/session summarization.
- Process graph updates.
- Automation opportunity scoring.
- Roadmap drafting.
- Internal consultant copilot.

Use structured outputs wherever possible. The AI should produce validated workflow objects, process steps, scores, and recommendations — not prose.

#### AI Provider Abstraction

The AI service is built behind a provider interface from day one:

```typescript
interface AIProvider {
  complete(prompt: Prompt, schema: Schema, credential: Credential): Promise<StructuredOutput>
}
```

Supported providers: Anthropic, OpenAI, Azure OpenAI (for clients with EU data residency requirements). The credential context comes from the organization's settings — either a DeSaaS-managed key (Stage 0) or the client's own API key (Stage 3).

This abstraction costs almost nothing to build upfront and unlocks the AI Sovereign ownership stage without a rewrite.

#### AI Cost Management

AI operations are async and queued through Inngest. No synchronous AI calls on request paths except the website intake conversation. Per-organization AI usage is tracked in `usage_events` from day one. Cost controls and rate limits are configurable per subscription tier. Document parsing and session summarization run in background jobs with retry logic and failure notifications.

#### Prompt and Schema Versioning

All AI prompts and output schemas are version-controlled. Each AI-derived object records which prompt version produced it. This allows re-running extractions when prompts improve without losing the original artifact.

Example structured workflow object:

```json
{
  "name": "New Client Onboarding",
  "department": "Customer Success",
  "trigger": "Deal marked closed-won",
  "tools": ["HubSpot", "ClickUp", "QuickBooks", "Gmail"],
  "steps": [
    {
      "name": "Create project",
      "ownerRole": "CS Manager",
      "tool": "ClickUp",
      "automationPotential": "high"
    }
  ],
  "exceptions": [],
  "missingInformation": [],
  "confidence": 0.82,
  "promptVersion": "workflow-extraction-v3"
}
```

### Workflow Capture Technology

Phase 1:

- Web-based guided walkthroughs.
- Manual workflow builder.
- Upload Loom videos or transcripts.
- Browser-based screen share capture for recorded workflow sessions.

Phase 2:

- Chrome extension (Manifest V3).
- Event capture for browser workflows within MV3 constraints.
- Domain/app allowlists.
- Local redaction controls.
- Graceful fallback if extension cannot be installed.

Phase 3:

- Desktop app using Tauri (preferred over Electron for binary size and security surface).
- Cross-application workflow capture.
- OCR.
- App switching detection.
- Sensitive app exclusion.
- macOS and Windows permission handling with user-facing guidance.

### Integrations Architecture

Start with OAuth integrations and read-only data discovery.

Integration abstraction:

- Provider.
- Connection.
- Credential (stored in abstracted secrets layer — supports DeSaaS Vault or client's own AWS Secrets Manager).
- Sync job.
- External object.
- External event.
- Normalized entity.

Normalize across tools:

- Contact.
- Company.
- Deal.
- Ticket.
- Task.
- Project.
- Invoice.
- Document.
- Message.
- Calendar event.
- User.

Webhook ingestion uses idempotency keys to handle duplicate delivery. Retry logic is handled by Inngest. Failed syncs are surfaced to the onboarding dashboard, not silently dropped.

### Security And Trust

Security is part of the product experience.

Requirements:

- Organization-based access control enforced at the database layer (Postgres RLS).
- Role-based permissions.
- Full audit log surfaced to the client — not just internal.
- Credentials stored in an abstracted secrets layer.
- Encrypted object storage.
- Clear recording consent.
- Read-only discovery mode by default.
- Domain/app exclusions for screen capture.
- Field redaction.
- Data retention controls configurable per organization.
- Human approval before write automations.
- Admin review before reports are shared broadly.

#### Data Residency And Compliance Path

DeSaaS does not pursue HIPAA or SOC 2 certifications in Phase 1, but the architecture must not make them impossible later. Requirements:

- Data is stored in a documented region (start: us-east-1).
- A data processing agreement template is available at signup.
- Clients in regulated industries are told upfront what compliance certifications are and are not in place.
- The BYOC deployment path (Stage 4) is the compliance answer for clients who cannot use shared infrastructure.

#### Client Data Ownership And Offboarding

All tables have a `deleted_at` soft-delete column. A data export job produces a full portable archive of everything DeSaaS has captured for an organization: process graph, interview transcripts, documents, recommendations, audit log. Hard-delete cascade runs after a configurable retention period post-cancellation.

GDPR right-to-erasure requests are handled through the hard-delete path.

---

## Data Model

Core tables:

- `organizations`
- `organization_profiles`
- `users`
- `memberships`
- `subscriptions`
- `usage_events`
- `billing_periods`
- `prospect_sessions`
- `website_events`
- `conversations`
- `conversation_messages`
- `documents`
- `document_chunks`
- `document_embeddings`
- `extracted_processes`
- `integrations`
- `integration_connections`
- `integration_credentials` (abstracted secrets layer reference)
- `integration_objects`
- `integration_webhook_events`
- `departments`
- `roles`
- `employees`
- `workflows`
- `workflow_versions`
- `workflow_steps`
- `workflow_runs`
- `workflow_recordings`
- `workflow_embeddings`
- `interview_sessions`
- `interview_answers`
- `interview_embeddings`
- `process_graph_nodes`
- `process_graph_edges`
- `automation_opportunities`
- `source_evidence`
- `automation_roadmaps`
- `roadmap_items`
- `approvals`
- `audit_events`
- `data_exports`
- `ai_usage_events`

### Key Design Decisions

**Tenant isolation:** Every table has `organization_id` as a non-nullable foreign key. Postgres RLS policies enforce this at the database layer.

**Source attribution:** `source_evidence` is a join table connecting any AI-derived object back to the evidence that produced it: `(subject_type, subject_id, source_type, source_id)` where `source_type` is one of `document`, `interview_answer`, `integration_event`, `workflow_recording`. Every automation opportunity, workflow extraction, and roadmap item must have at least one source evidence record.

**Workflow versioning:** `workflow_versions` stores immutable snapshots of `workflows` records. The current canonical version is a foreign key on `workflows`. When a process changes or when observed behavior contradicts an existing SOP, a new version is created — the old version is preserved.

**Soft delete:** All tables have `deleted_at` nullable timestamp. Hard deletes are reserved for the offboarding export/purge job.

**Secrets abstraction:** `integration_credentials` stores a reference to a secrets backend, not the credential itself. The backend is configurable per organization: DeSaaS-managed Vault (Stage 0–3) or the client's own AWS Secrets Manager / Azure Key Vault (Stage 4).

**Billing hooks:** `subscriptions`, `usage_events`, and `billing_periods` are in the model from day one. Billing is not built in Phase 1 but retrofitting it on a live schema is painful.

**Keep raw artifacts separate from AI-derived objects.** Every workflow, recommendation, or extraction points back to a source evidence record. AI output is never the canonical record — the source artifact always is.

---

## First Build: Website Intelligence And Pre-Onboarding

The first build should prove the DeSaaS experience before the full product exists.

### MVP Website Goals

The website should:

- Explain DeSaaS through the product experience itself.
- Let visitors interact with an AI onboarding assistant.
- Capture business context before signup.
- Generate a lightweight Automation Readiness Snapshot.
- Encourage signup or consultation booking.
- Save all collected context into a prospect profile.

### MVP Website Screens

1. Home page with embedded AI intake.
2. Use case selector.
3. Business profile intake.
4. Tool stack selector.
5. Pain point ranking.
6. Optional SOP/document upload.
7. Automation Readiness Snapshot.
8. Signup or booking handoff.

### Website AI Intake Flow

The assistant should collect:

- Name.
- Company.
- Website.
- Industry.
- Team size.
- Current tools.
- Main bottleneck.
- Repetitive workflows.
- Current SOP/document maturity.
- Desired automation outcome.
- Urgency.
- Budget range or readiness indicator.

The AI should return:

- Likely workflow categories.
- Suspected bottlenecks.
- Suggested first automations.
- Recommended onboarding path.
- Readiness score.
- Next step.

### First Technical Milestone

Build a Next.js website with:

- Public landing experience.
- AI-guided intake panel.
- Structured intake form state.
- Tool stack selector.
- Pain point selector.
- Optional document upload placeholder.
- Generated readiness snapshot.
- Prospect profile persistence.
- Admin view of captured prospects.

For the first version, the readiness snapshot can be generated from deterministic rules plus AI-written summary.

---

## Suggested Implementation Phases

### Phase 0: Product Definition

Deliverables:

- Technical architecture (this document).
- Data model with tenant isolation and ownership ladder compatibility confirmed.
- Onboarding flow.
- AI prompt and schema designs — all major AI operations, not just the three example schemas.
- Website wireframe.
- Security assumptions and compliance path documentation.
- Background job topology (Inngest flows for each async operation).

### Phase 1: Website Pre-Onboarding MVP

Ownership stage introduced: Stage 0 (Hosted SaaS, architected for the full ladder).

Deliverables:

- DeSaaS public site.
- AI intake assistant.
- Prospect session tracking.
- Business profile capture.
- Tool/pain point selectors.
- Automation Readiness Snapshot.
- Signup/booking CTA.
- Internal prospect review page.
- Postgres schema with RLS and multi-tenancy enforced from first migration.

### Phase 2: Client Workspace MVP

Ownership stage introduced: Stage 1 (Data Transparent — full export and audit log surfaced to client).

Deliverables:

- Auth.
- Organization workspace.
- Prospect-to-workspace handoff: pre-fills from website session, client sees what DeSaaS already knows.
- Document upload with BYOS option for organizations that want it.
- Basic document parsing via async Inngest job.
- Workflow extraction.
- Department/workflow inventory.
- Roadmap draft generation.
- Data export page: full portable archive downloadable at any time.
- Onboarding completeness dashboard: shows what each data source unlocks.
- One lightweight integration (Google Workspace or Slack) to prove the integration architecture before Phase 4.

### Phase 3: Guided Interviews

Ownership stage introduced: Stage 2 (Bring Your Own Storage for documents and recordings).

Deliverables:

- Role-based interview flows.
- Employee invite links (magic link, no account required, dedicated simplified experience).
- Adaptive AI questions using previous client context.
- Interview summaries.
- Missing info detection.
- Workflow confidence scoring.
- BYOS storage option available for all organizations.

### Phase 4: Integrations

Ownership stage introduced: Stage 3 (Bring Your Own AI Keys, provider abstraction live).

Deliverables:

- Google Workspace.
- Slack.
- HubSpot or Pipedrive.
- QuickBooks or Xero.
- Normalized integration object model.
- Integration-derived workflow hints.
- Integration Readiness step in onboarding: IT admin guidance, permission request generator.
- Webhook ingestion with idempotency and Inngest retry handling.
- Client AI key configuration in workspace settings.

### Phase 5: Workflow Capture

Deliverables:

- Browser-based workflow recording.
- Chrome extension (MV3, with capability validation done in Phase 0 planning).
- Graceful fallback for managed/restricted environments.
- Screen share capture.
- Session transcription.
- OCR/screen summary.
- Clarifying questions.
- Workflow reconstruction.
- Raw recording retention controls (90-day default, configurable).

### Phase 6: Automation Roadmap And Consultant Console

Ownership stage introduced: Stage 4 (BYOC infrastructure-as-code deployment option for enterprise clients).

Deliverables:

- Opportunity scoring engine.
- Roadmap builder.
- Consultant review/edit interface.
- Client-ready report.
- Exportable implementation plan.
- Terraform/Pulumi package for BYOC deployment.
- License and update mechanism for self-hosted instances.

### Phase 7: Automation Deployment Layer

Deliverables:

- Human-approved automation specs.
- n8n/Make/Zapier integration.
- DeSaaS API for automation tools to call back into.
- Custom workflow runner for DeSaaS-owned automations.
- Client AI assistant connected to the process graph.

### Phase 7+: Open-Source Core Consideration

Ownership stage introduced: Stage 5 (Fully Sovereign).

Evaluate open-sourcing the core data layer and process graph under MIT or Apache 2.0. The proprietary AI orchestration, automation pattern library, and roadmap generation engine remain commercial. Enterprise clients can run fully air-gapped with a self-hosted LLM for document and session processing. DeSaaS monetizes through software licenses, managed BYOC services, and the intelligence layer.

---

## Initial AI Schemas

### Prospect Profile

```json
{
  "companyName": "string",
  "website": "string",
  "industry": "string",
  "teamSize": "string",
  "tools": ["string"],
  "painPoints": ["string"],
  "knownWorkflows": ["string"],
  "desiredOutcomes": ["string"],
  "readinessSignals": ["string"]
}
```

### Automation Readiness Snapshot

```json
{
  "readinessScore": 0,
  "summary": "string",
  "likelyBottlenecks": ["string"],
  "quickWins": ["string"],
  "recommendedOnboardingPath": ["string"],
  "missingInformation": ["string"],
  "nextBestAction": "string"
}
```

### Workflow Candidate

```json
{
  "name": "string",
  "department": "string",
  "trigger": "string",
  "tools": ["string"],
  "manualSteps": ["string"],
  "automationPotential": "low | medium | high",
  "confidence": 0,
  "promptVersion": "string"
}
```

### Automation Opportunity

```json
{
  "workflowId": "string",
  "category": "quick_win | needs_cleanup | human_in_loop | full_automation | ai_assistant | custom_app | not_recommended",
  "frequencyPerMonth": 0,
  "estimatedMinutesSavedPerMonth": 0,
  "implementationComplexity": "low | medium | high",
  "requiredIntegrations": ["string"],
  "requiredHumanApprovals": ["string"],
  "risks": ["string"],
  "confidence": 0,
  "sourceEvidence": [
    { "sourceType": "document | interview_answer | integration_event | workflow_recording", "sourceId": "string" }
  ]
}
```

---

## First Website UX Direction

The website should not be a static brochure. The first screen should immediately feel like the onboarding product.

Recommended first viewport:

- DeSaaS identity and clear promise.
- AI intake panel as the main interaction.
- Short trust-focused copy.
- Direct path to generate a snapshot.

Avoid:

- Generic SaaS hero sections.
- Long marketing pages before interaction.
- Vague AI claims.
- Making visitors book a call before receiving value.

Design feel:

- Operational.
- Calm.
- Intelligent.
- High-trust.
- Clear.
- More "AI operations analyst" than "chatbot."

---

## MVP Build Recommendation

Start by building the public website as a working prototype of the onboarding experience.

The first build should include:

- A homepage where the AI intake is the centerpiece.
- A structured side panel showing what DeSaaS has learned so far.
- A progress model that shows onboarding depth.
- A generated readiness snapshot.
- A saved prospect record.
- A simple admin page for DeSaaS to review prospects.

The backend must be set up with the full multi-tenant schema and RLS from the first migration, even though Phase 1 only has one tenant (DeSaaS itself as the host). Getting this right at the start is far cheaper than fixing it under a live product.

---

## Key Product Principle

Every interaction should either:

- Teach DeSaaS something useful about the client.
- Give the client useful insight about their business.
- Move both sides closer to a scoped automation roadmap.

If an interaction does none of those, it should be removed.

## Key Architecture Principle

DeSaaS sells intelligence, not custody.

At every stage of the build, ask: if this client wanted to own this completely, could they? If the answer is no, fix the architecture before shipping the feature.
