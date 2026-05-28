import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { readEnv } from "../config/env.js";
import { assertTenantContext, tenantSettings, type TenantContext } from "./tenant.js";

const env = readEnv();
const sqlClient = postgres(env.DATABASE_URL, { prepare: false });

export const db = drizzle(sqlClient);

export async function withTenant<T>(
  context: TenantContext,
  run: (tx: Parameters<Parameters<typeof db.transaction>[0]>[0]) => Promise<T>
): Promise<T> {
  assertTenantContext(context);

  return db.transaction(async (tx) => {
    for (const statement of tenantSettings(context)) {
      await tx.execute(statement);
    }

    return run(tx);
  });
}
