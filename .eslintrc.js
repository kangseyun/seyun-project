/**
 * ESLint Configuration
 * Optimized for AI-assisted development
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      './tsconfig.json',
      './apps/*/tsconfig.json',
      './packages/*/tsconfig.json',
    ],
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Enforces consistent code style for AI readability
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      // Interface names must start with I
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
      // Type names must use PascalCase
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // Variable names must use camelCase
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
      },
      // Function names must use camelCase
      {
        selector: 'function',
        format: ['camelCase'],
      },
    ],
    // Enforce imports ordering for better organization
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    // Enforce JSDoc comments for public APIs
    'jsdoc/require-jsdoc': [
      'error',
      {
        publicOnly: true,
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true,
        },
      },
    ],
    // React specific rules
    'react/prop-types': 'off', // Prefer TypeScript types
    'react/react-in-jsx-scope': 'off', // Not needed with Next.js
    'react-hooks/exhaustive-deps': 'error', // Catch missing dependencies
  },
  overrides: [
    // Backend NestJS rules
    {
      files: ['apps/api/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': ['error'],
      },
    },
    // Frontend React rules
    {
      files: ['apps/web/**/*.tsx'],
      rules: {
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      },
    },
    // Test files
    {
      files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
}; 