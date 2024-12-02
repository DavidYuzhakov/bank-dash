import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'


/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    plugins: {
      'react': pluginReact,
      'prettier': pluginPrettier,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
  },
  {
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...configPrettier.rules,
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': 'off' //?
    }
  }
]