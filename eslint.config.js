import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import daStyle from 'eslint-config-dicodingacademy';
import pluginCypress from 'eslint-plugin-cypress/flat';
export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js, react: pluginReact },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    settings: {
      react: {
        version: '18.0',
      },
    },
    rules: {
      indent: 'off',
    },
  },
  pluginCypress.configs.recommended,
  pluginReact.configs.flat.recommended,
  daStyle,
]);
