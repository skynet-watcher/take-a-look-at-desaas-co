export type ObjectStorageBackend = "desaas_managed_s3" | "client_s3" | "client_azure_blob";

export type ObjectLocation = {
  backend: ObjectStorageBackend;
  region: string;
  bucket: string;
  key: string;
};

export interface ObjectStorage {
  createUploadUrl(input: {
    organizationId: string;
    contentType: string;
    purpose: "document" | "workflow_recording" | "export";
  }): Promise<ObjectLocation & { uploadUrl: string }>;
  createDownloadUrl(location: ObjectLocation): Promise<string>;
  delete(location: ObjectLocation): Promise<void>;
}
