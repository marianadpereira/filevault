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

variable "monitor_workspace_name" {
  description = "Monitor Workspace name"
  default     = "filevault-monitor-workspace"
}

variable "grafana_dashboard_name" {
  description = "Grafana Dashboard name"
  default     = "filevault-grafana"
}

variable "log_analytics_workspace_name" {
  description = "Log Analytics Workspace name"
  default     = "filevault-logs-workspace"
}

variable "filevault-aks-cluster_name" {
  description = "AKS Cluster name"
  default     = "filevault-aks-cluster"
}