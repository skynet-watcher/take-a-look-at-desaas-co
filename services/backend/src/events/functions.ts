import { inngest } from "./client.js";

export const extractDocumentWorkflows = inngest.createFunction(
  { id: "extract-document-workflows" },
  { event: "document/uploaded" },
  async ({ event, step }) => {
    const parsed = await step.run("parse-document", async () => ({
      organizationId: event.data.organizationId,
      documentId: event.data.documentId,
      objectStorageKey: event.data.objectStorageKey
    }));

    await step.run("extract-workflow-candidates", async () => {
      return {
        ...parsed,
        queuedAiOperation: "document-extraction-v1"
      };
    });

    await step.run("write-source-evidence", async () => ({
      documentId: event.data.documentId,
      evidenceType: "document"
    }));
  }
);

export const summarizeWorkflowRecording = inngest.createFunction(
  { id: "summarize-workflow-recording" },
  { event: "workflow-recording/ready" },
  async ({ event, step }) => {
    await step.run("transcribe-and-ocr", async () => ({
      organizationId: event.data.organizationId,
      recordingId: event.data.recordingId,
      objectStorageKey: event.data.objectStorageKey
    }));

    await step.run("summarize-session", async () => ({
      recordingId: event.data.recordingId,
      queuedAiOperation: "workflow-session-summary-v1"
    }));
  }
);

export const draftAutomationRoadmap = inngest.createFunction(
  { id: "draft-automation-roadmap" },
  { event: "roadmap/draft.requested" },
  async ({ event, step }) => {
    await step.run("load-process-graph", async () => ({
      organizationId: event.data.organizationId
    }));

    await step.run("score-opportunities", async () => ({
      organizationId: event.data.organizationId,
      queuedAiOperation: "automation-opportunity-scoring-v1"
    }));
  }
);

export const functions = [
  extractDocumentWorkflows,
  summarizeWorkflowRecording,
  draftAutomationRoadmap
];
