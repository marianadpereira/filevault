output "registry_url" {
  value = azurerm_container_registry.acr.login_server
}

output "key_vault_name" {
  value       = azurerm_key_vault.kv.name
}

output "key_vault_uri" {
  value       = azurerm_key_vault.kv.vault_uri
}