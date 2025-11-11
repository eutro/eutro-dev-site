import js from "@eslint/js";
import ts from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from 'eslint/config';

import globals from "globals";

const config = defineConfig([
  js.configs.recommended,
  ts.configs.strict,
  ts.configs.stylistic,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
      }
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],
      "semi": [2, "always"],
    },
  },
  {
    ignores: ["dist"],
  }
]);

export default config;
