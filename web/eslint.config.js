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

import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import path from "path";
import { fileURLToPath } from "url";

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: _dirname });

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  {
    ignores: ["node_modules", ".next"],
  },

  {
    plugins: {
      onlyWarn,
      unusedImports,
      simpleImportSort,
    },

    rules: {
      "no-unused-vars": "off",
      "unusedImports/no-unused-imports": "error",
      "unusedImports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "simpleImportSort/imports": "warn",
      "simpleImportSort/exports": "warn",
    },
  },

  {
    plugins: {
      reactRefresh,
    },

    rules: {
      "reactRefresh/only-export-components": [
        "warn",
        { allowExportNames: ["metadata"] },
      ],
    },
  },

  prettier,
  ...compat.extends("plugin:tailwindcss/recommended"),
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
