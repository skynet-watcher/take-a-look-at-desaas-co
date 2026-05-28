import {
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from "drizzle-orm/pg-core";

export const membershipRole = pgEnum("membership_role", ["owner", "admin", "member", "viewer"]);
export const prospectStatus = pgEnum("prospect_status", ["anonymous", "identified", "converted", "archived"]);
export const aiProviderKind = pgEnum("ai_provider_kind", ["desaas_managed", "openai", "anthropic", "azure_openai"]);
export const secretBackendKind = pgEnum("secret_backend_kind", ["desaas_vault", "aws_secrets_manager", "azure_key_vault"]);

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  dataRegion: text("data_region").notNull().default("us-east-1"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true })
}, (table) => ({
  slugIdx: uniqueIndex("organizations_slug_idx").on(table.slug)
}));

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true })
}, (table) => ({
  orgEmailIdx: uniqueIndex("users_org_email_idx").on(table.organizationId, table.email),
  organizationIdx: index("users_organization_idx").on(table.organizationId)
}));

export const memberships = pgTable("memberships", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  role: membershipRole("role").notNull().default("member"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true })
}, (table) => ({
  orgUserIdx: uniqueIndex("memberships_org_user_idx").on(table.organizationId, table.userId),
  organizationIdx: index("memberships_organization_idx").on(table.organizationId)
}));

export const prospectSessions = pgTable("prospect_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  anonymousSessionId: text("anonymous_session_id").notNull(),
  status: prospectStatus("status").notNull().default("anonymous"),
  profile: jsonb("profile").notNull().default({}),
  convertedOrganizationId: uuid("converted_organization_id").references(() => organizations.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true })
}, (table) => ({
  anonymousSessionIdx: index("prospect_sessions_anonymous_session_idx").on(table.anonymousSessionId),
  organizationIdx: index("prospect_sessions_organization_idx").on(table.organizationId)
}));

export const auditEvents = pgTable("audit_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  actorUserId: uuid("actor_user_id").references(() => users.id),
  action: text("action").notNull(),
  subjectType: text("subject_type").notNull(),
  subjectId: text("subject_id").notNull(),
  metadata: jsonb("metadata").notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true })
}, (table) => ({
  organizationCreatedIdx: index("audit_events_org_created_idx").on(table.organizationId, table.createdAt)
}));

export const integrationCredentials = pgTable("integration_credentials", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  provider: text("provider").notNull(),
  secretBackend: secretBackendKind("secret_backend").notNull().default("desaas_vault"),
  secretRef: text("secret_ref").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true })
}, (table) => ({
  organizationIdx: index("integration_credentials_organization_idx").on(table.organizationId)
}));

export const aiUsageEvents = pgTable("ai_usage_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  provider: aiProviderKind("provider").notNull(),
  operation: text("operation").notNull(),
  promptVersion: text("prompt_version").notNull(),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  estimatedCostUsd: numeric("estimated_cost_usd", { precision: 12, scale: 6 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true })
}, (table) => ({
  organizationCreatedIdx: index("ai_usage_events_org_created_idx").on(table.organizationId, table.createdAt)
}));

export const dataExports = pgTable("data_exports", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  requestedByUserId: uuid("requested_by_user_id").references(() => users.id),
  status: text("status").notNull().default("queued"),
  objectStorageKey: text("object_storage_key"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true })
}, (table) => ({
  organizationIdx: index("data_exports_organization_idx").on(table.organizationId)
}));
