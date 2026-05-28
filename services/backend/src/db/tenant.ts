import type { SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";

export type TenantContext = {
  organizationId: string;
  actorUserId?: string;
};

export function tenantSettings(context: TenantContext): SQL[] {
  return [
    sql`select set_config('app.current_organization_id', ${context.organizationId}, true)`,
    sql`select set_config('app.current_user_id', ${context.actorUserId ?? ""}, true)`
  ];
}

export function assertTenantContext(context: Partial<TenantContext>): asserts context is TenantContext {
  if (!context.organizationId) {
    throw new Error("Tenant context requires organizationId before database access.");
  }
}
