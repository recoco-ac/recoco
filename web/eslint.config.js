/*
 * Copyright 2024 Recoco
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import react from "eslint-plugin-react/configs/recommended.js";
import regexp from "eslint-plugin-regexp";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unicorn from "eslint-plugin-unicorn";
import tslint from "typescript-eslint";

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: _dirname });

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ["node_modules", "build"],
  },

  // Code Quality

  eslint.configs.recommended,
  ...tslint.configs.recommended,
  unicorn.configs["flat/recommended"],
  ...compat.extends("plugin:sonarjs/recommended"),

  {
    rules: {
      "unicorn/prevent-abbreviations": "off",
    },
  },

  // Practices

  Object.assign(react, {
    settings: {
      react: {
        version: "18",
      },
    },
  }),
  ...compat.extends("plugin:react-hooks/recommended"),
  ...compat.extends("plugin:jsx-a11y/recommended"),
  regexp.configs["flat/recommended"],

  // Code Style

  prettier,
  ...compat.extends("plugin:tailwindcss/recommended"),

  {
    plugins: {
      onlyWarn,
      simpleImportSort,
    },

    rules: {
      "simpleImportSort/imports": "warn",
      "simpleImportSort/exports": "warn",
    },
  },
];
