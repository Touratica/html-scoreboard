import js from "@eslint/js";
import html from "@html-eslint/eslint-plugin";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const htmlRecommended = html.configs["flat/recommended"];

export default defineConfig(
  {
    // Flat config only lints *.js, *.mjs and *.cjs by default.
    files: ["**/*.ts", "**/*.html"],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    rules: {
      "no-warning-comments": ["error", { terms: ["XXX"] }],
      indent: ["error", 2, { SwitchCase: 1 }],
      "no-case-declarations": "off",
    },
  },
  {
    files: ["**/*.config.js"],
    languageOptions: { sourceType: "script" },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    ...htmlRecommended,
    files: ["**/*.html"],
    rules: {
      ...htmlRecommended.rules,
      "@html-eslint/indent": ["error", 2],
      "@html-eslint/no-extra-spacing-attrs": [
        "warn",
        { enforceBeforeSelfClose: true },
      ],
      "@html-eslint/require-closing-tags": ["warn", { selfClosing: "always" }],
      // Newer recommended rules that contradict Prettier's HTML output.
      "@html-eslint/no-extra-spacing-tags": "off",
      "@html-eslint/attrs-newline": "off",
    },
  },
);
