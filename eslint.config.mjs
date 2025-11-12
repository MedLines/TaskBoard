import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Sort imports & exports automatically
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Disable ESLint formatting rules so Prettier runs formatting
      quotes: 'off',
      semi: 'off',
    },
  },

  // Override Next.js ignores
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'tailwind.config.ts',
  ]),
])

export default eslintConfig
