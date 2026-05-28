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

- “What are you trying to automate?”
- “What tools does your team currently use?”
- “Where does work get stuck?”
- “Do you have SOPs, spreadsheets, or templates we can review?”
- “Would you like an initial automation opportunity snapshot?”

The website should offer a low-friction first value moment:

- Website URL scan.
- Short AI interview.
- Tool stack intake.
- Optional SOP upload.
- Generated “Automation Readiness Snapshot.”

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

Signup should preserve everything already learned from the website session.

Initial post-signup flow:

1. Confirm company profile.
2. Identify primary onboarding owner.
3. Select departments to onboard.
4. Invite key employees.
5. Upload documents.
6. Connect tools.
7. Schedule or launch guided workflow capture.

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

- “The SOP says sales creates the project, but screen capture shows operations creates it.”
- “The checklist includes approval, but no approval appeared in the observed workflow.”
- “The spreadsheet appears to be the real source of truth, not the CRM.”

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

If document parsing finds a “New Customer Onboarding SOP,” the system should ask the customer success lead:

- “Is this still current?”
- “Which steps usually get skipped?”
- “What is the most common exception?”
- “Where do you wait on another person?”
- “What do you copy manually between tools?”

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

- “You copied the client name from email into the CRM. Is email always the source?”
- “You waited on a Slack reply before continuing. Who approves this step?”
- “You changed the invoice amount manually. What determines that value?”
- “This task took 14 minutes. How often do you do it?”

### 7. Process Graph Layer

The platform should maintain a canonical graph of the client’s operations.

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

This graph becomes the source of truth for roadmap generation, future automations, and the client’s AI assistant.

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

## Recommended Technical Architecture

### Frontend

Use Next.js with React and TypeScript.

Recommended stack:

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS.
- shadcn/ui for components.
- React Flow for workflow/process maps.
- TanStack Query or SWR for client data fetching.
- Zod for validation.
- Vercel for hosting.

Primary frontend apps:

- Public website.
- AI website intake assistant.
- Client onboarding portal.
- Internal DeSaaS admin console.
- Workflow map viewer.
- Document review workspace.
- Automation roadmap workspace.

### Backend

Recommended stack:

- Next.js API routes or a separate Node.js service.
- TypeScript.
- Postgres.
- Prisma or Drizzle ORM.
- Background job system.
- Object storage.
- Queue-based processing.
- Webhook ingestion for integrations.

Core backend services:

- Identity and workspace service.
- Prospect/session tracking service.
- AI conversation service.
- Document ingestion service.
- Integration service.
- Workflow capture ingestion service.
- Process graph service.
- Opportunity scoring service.
- Roadmap generation service.
- Notification service.

### Data Storage

Use Postgres as the system of record.

Use object storage for:

- Uploaded documents.
- Screen recordings.
- Audio recordings.
- Generated reports.
- Extracted artifacts.

Use vector search for:

- SOP retrieval.
- Interview context.
- Client knowledge base.
- Similar workflow matching.
- Automation pattern retrieval.

Use a graph-friendly schema in Postgres first. Add a dedicated graph database only if relationship queries become painful.

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

Use structured outputs wherever possible. The AI should not just produce prose; it should produce validated workflow objects, process steps, scores, and recommendations.

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
  "confidence": 0.82
}
```

### Workflow Capture Technology

Phase 1:

- Web-based guided walkthroughs.
- Manual workflow builder.
- Upload Loom videos or transcripts.
- Browser-based screen share capture for recorded workflow sessions.

Phase 2:

- Chrome extension.
- Event capture for browser workflows.
- Domain/app allowlists.
- Local redaction controls.

Phase 3:

- Desktop app using Electron or Tauri.
- Cross-application workflow capture.
- OCR.
- App switching detection.
- Sensitive app exclusion.

### Integrations Architecture

Start with OAuth integrations and read-only data discovery.

Build an integration abstraction:

- Provider.
- Connection.
- Credential.
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

This allows DeSaaS to reason across fragmented SMB tool stacks.

### Security And Trust

Security must be part of the product experience, not buried in legal text.

Requirements:

- Organization-based access control.
- Role-based permissions.
- Audit logs.
- Encrypted credentials.
- Encrypted object storage.
- Clear recording consent.
- Read-only discovery mode.
- Domain/app exclusions for screen capture.
- Field redaction.
- Data retention controls.
- Human approval before write automations.
- Admin review before reports are shared broadly.

## Data Model Draft

Core tables:

- organizations
- organization_profiles
- users
- memberships
- prospect_sessions
- website_events
- conversations
- conversation_messages
- documents
- document_chunks
- extracted_processes
- integrations
- integration_connections
- integration_objects
- departments
- roles
- employees
- workflows
- workflow_steps
- workflow_runs
- workflow_recordings
- interview_sessions
- interview_answers
- process_graph_nodes
- process_graph_edges
- automation_opportunities
- automation_roadmaps
- roadmap_items
- approvals
- audit_events

Important design choice:

Keep raw source artifacts separate from AI-derived objects. Every workflow or recommendation should point back to source evidence such as a document, interview answer, integration event, or screen session.

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

For the first version, the readiness snapshot can be generated from deterministic rules plus AI-written summary. This keeps cost and complexity low while still feeling intelligent.

## Suggested Implementation Phases

### Phase 0: Product Definition

Deliverables:

- Technical architecture.
- Data model.
- Onboarding flow.
- AI prompt and schema designs.
- Website wireframe.
- Security assumptions.

### Phase 1: Website Pre-Onboarding MVP

Deliverables:

- DeSaaS public site.
- AI intake assistant.
- Prospect session tracking.
- Business profile capture.
- Tool/pain point selectors.
- Automation Readiness Snapshot.
- Signup/booking CTA.
- Internal prospect review page.

### Phase 2: Client Workspace MVP

Deliverables:

- Auth.
- Organization workspace.
- Document upload.
- Basic document parsing.
- Workflow extraction.
- Department/workflow inventory.
- Roadmap draft generation.

### Phase 3: Guided Interviews

Deliverables:

- Role-based interview flows.
- Employee invite links.
- Adaptive AI questions.
- Interview summaries.
- Missing info detection.
- Workflow confidence scoring.

### Phase 4: Integrations

Deliverables:

- Google Workspace.
- Slack.
- HubSpot or Pipedrive.
- QuickBooks or Xero.
- Normalized integration object model.
- Integration-derived workflow hints.

### Phase 5: Workflow Capture

Deliverables:

- Browser-based workflow recording.
- Screen share capture.
- Session transcription.
- OCR/screen summary.
- Clarifying questions.
- Workflow reconstruction.

### Phase 6: Automation Roadmap And Consultant Console

Deliverables:

- Opportunity scoring.
- Roadmap builder.
- Consultant review/edit interface.
- Client-ready report.
- Exportable implementation plan.

### Phase 7: Automation Deployment Layer

Deliverables:

- Human-approved automation specs.
- n8n/Make/Zapier integration.
- Custom workflow runner for DeSaaS-owned automations.
- Client AI assistant connected to the process graph.

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
  "confidence": 0
}
```

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
- More “AI operations analyst” than “chatbot.”

## MVP Build Recommendation

Start by building the public website as a working prototype of the onboarding experience.

The first build should include:

- A homepage where the AI intake is the centerpiece.
- A structured side panel showing what DeSaaS has learned so far.
- A progress model that shows onboarding depth.
- A generated readiness snapshot.
- A saved prospect record.
- A simple admin page for DeSaaS to review prospects.

This creates an immediate sales asset and the foundation for the larger onboarding platform.

## Key Product Principle

Every interaction should either:

- Teach DeSaaS something useful about the client.
- Give the client useful insight about their business.
- Move both sides closer to a scoped automation roadmap.

If an interaction does none of those, it should be removed.
