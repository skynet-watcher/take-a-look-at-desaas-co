export type SecretBackendKind = "desaas_vault" | "aws_secrets_manager" | "azure_key_vault";

export type SecretRef = {
  organizationId: string;
  backend: SecretBackendKind;
  ref: string;
};

export interface SecretsBackend {
  read(ref: SecretRef): Promise<string>;
  write(input: {
    organizationId: string;
    backend: SecretBackendKind;
    value: string;
    label: string;
  }): Promise<SecretRef>;
  delete(ref: SecretRef): Promise<void>;
}

export function isClientOwnedSecret(ref: SecretRef): boolean {
  return ref.backend === "aws_secrets_manager" || ref.backend === "azure_key_vault";
}
