import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  INNGEST_EVENT_KEY: z.string().optional(),
  INNGEST_SIGNING_KEY: z.string().optional(),
  DEFAULT_DATA_REGION: z.string().default("us-east-1")
});

export type BackendEnv = z.infer<typeof envSchema>;

export function readEnv(input: NodeJS.ProcessEnv = process.env): BackendEnv {
  return envSchema.parse(input);
}
