import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  { ignores: ['public/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {  '@stylistic/js': stylisticJs },
    languageOptions: { globals: globals.node },
    rules: {
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/object-curly-newline': ['error', { multiline: true }],
      '@stylistic/js/object-property-newline': ['error'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/no-multiple-empty-lines': [
        'error', {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', {
        before: true,
        after: true,
      }],
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
])
