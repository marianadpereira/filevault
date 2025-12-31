variable "resource_group_name" {
  description = "Resource Group name in Azure"
  default     = "FileVault"
}
variable "location" {
  description = "Resource location in Azure"
  default     = "UK South"
}
variable "acr_name" {
  description = "ACR name"
  default     = "filevaultregistrymariana"
}

variable "kv_name" {
  description = "Key Vault name"
  default     = "filevault-kv-mariana"
}