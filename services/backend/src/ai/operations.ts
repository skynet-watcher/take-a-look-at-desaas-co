import type { OutputSchema, PromptEnvelope } from "./provider.js";

export const documentExtractionPrompt = {
  name: "document-extraction",
  version: "document-extraction-v1",
  system: "Extract operational workflows, roles, tools, handoffs, risks, and missing information from the source document.",
  input: {}
} satisfies PromptEnvelope;

export const workflowExtractionSchema = {
  name: "workflow-candidate",
  version: "workflow-candidate-v1",
  jsonSchema: {
    type: "object",
    required: ["name", "department", "tools", "manualSteps", "automationPotential", "confidence", "promptVersion"],
    properties: {
      name: { type: "string" },
      department: { type: "string" },
      trigger: { type: "string" },
      tools: { type: "array", items: { type: "string" } },
      manualSteps: { type: "array", items: { type: "string" } },
      automationPotential: { enum: ["low", "medium", "high"] },
      confidence: { type: "number", minimum: 0, maximum: 1 },
      promptVersion: { type: "string" }
    }
  }
} satisfies OutputSchema;

export const sessionSummaryPrompt = {
  name: "workflow-session-summary",
  version: "workflow-session-summary-v1",
  system: "Summarize a workflow observation session into structured workflow evidence and clarifying questions.",
  input: {}
} satisfies PromptEnvelope;
