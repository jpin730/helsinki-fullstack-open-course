import js from '@eslint/js'
import globals from 'globals'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-plugin-prettier/recommended'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore')

export default defineConfig([
  prettier,
  includeIgnoreFile(gitignorePath),
  { ignores: ['package-lock.json'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
    extends: ['markdown/recommended'],
  },
])
