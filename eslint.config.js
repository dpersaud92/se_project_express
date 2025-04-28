import js from "@eslint/js";
import nodePlugin from "eslint-plugin-node";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-config-prettier";

export default [
  {
    files: ["**/*.js"],
    ignores: ["eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        process: "readonly",
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      node: nodePlugin,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nodePlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      "no-underscore-dangle": ["error", { allow: ["_id"] }],
    },
  },
  prettierPlugin,
];
