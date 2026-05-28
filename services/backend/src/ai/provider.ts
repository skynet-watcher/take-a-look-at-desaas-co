export type AIProviderKind = "desaas_managed" | "openai" | "anthropic" | "azure_openai";

export type PromptEnvelope = {
  name: string;
  version: string;
  system: string;
  input: unknown;
};

export type OutputSchema = {
  name: string;
  version: string;
  jsonSchema: Record<string, unknown>;
};

export type CredentialRef = {
  provider: AIProviderKind;
  secretRef: string;
};

export type StructuredOutput<T = unknown> = {
  data: T;
  provider: AIProviderKind;
  promptVersion: string;
  usage?: {
    inputTokens?: number;
    outputTokens?: number;
    estimatedCostUsd?: string;
  };
};

export interface AIProvider {
  complete<T>(request: {
    organizationId: string;
    prompt: PromptEnvelope;
    schema: OutputSchema;
    credential: CredentialRef;
  }): Promise<StructuredOutput<T>>;
}

export function assertAsyncOnly(operation: string): void {
  if (operation !== "website_intake_conversation") {
    throw new Error(`${operation} must be queued through Inngest before invoking an AI provider.`);
  }
}
