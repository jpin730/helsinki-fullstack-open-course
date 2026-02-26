import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  prettier,
  { ignores: ['dist'] },
  {
    files: ['**/*.test.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-console': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      // 'arrow-spacing': ['error', { before: true, after: true }], // Prettier handles with "arrowParens"
      // 'linebreak-style': ['error', 'unix'], // Prettier handles with "endOfLine"
      // 'no-trailing-spaces': 'error', // Prettier handles with "trailingComma"
      // 'object-curly-spacing': ['error', 'always'], // Prettier handles with "bracketSpacing"
      // indent: ['error', 2], // Prettier handles with "tabWidth"
      // quotes: ['error', 'single'], // Prettier handles with "singleQuote"
      // semi: ['error', 'never'], // Prettier handles with "semi"
    },
  },
]
