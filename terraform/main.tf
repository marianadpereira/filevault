provider "azurerm" {
  features {}
  subscription_id ="680a7707-ec64-4b22-a46a-8747188752b6"
}

resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = "Basic"
  admin_enabled       = true
}

