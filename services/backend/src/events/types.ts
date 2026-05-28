export type DocumentUploadedEvent = {
  name: "document/uploaded";
  data: {
    organizationId: string;
    documentId: string;
    objectStorageKey: string;
    requestedByUserId?: string;
  };
};

export type WorkflowRecordingReadyEvent = {
  name: "workflow-recording/ready";
  data: {
    organizationId: string;
    recordingId: string;
    objectStorageKey: string;
    requestedByUserId?: string;
  };
};

export type RoadmapDraftRequestedEvent = {
  name: "roadmap/draft.requested";
  data: {
    organizationId: string;
    requestedByUserId?: string;
  };
};

export type BackendEvent =
  | DocumentUploadedEvent
  | WorkflowRecordingReadyEvent
  | RoadmapDraftRequestedEvent;
