import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Node backend files (CommonJS)
  {
    files: ["src/azure-sa/**/*.js"], // adjust if your backend folder is named differently
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script", // CommonJS
      globals: {
        ...globals.node,
        __dirname: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
]);
