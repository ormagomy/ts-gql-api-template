// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['.build', '.esbuild'],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.recommended],
  },
  {
    // disable type-aware linting on JS files
    files: ['*.js'],
    ...tseslint.configs.disableTypeChecked,
  }
)
