import globals from "globals";
import recommended from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'], // Apply to TypeScript files
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: './tsconfig.json', // Adjust if your tsconfig is located elsewhere
      },
      ecmaVersion: 2022, // Set ECMAScript version
      sourceType: 'module', // Set source type as module
      globals: {
        ...globals.node,
      }
    },
    plugins: {
      '@typescript-eslint': recommended,
    },
    rules: {
      'semi': ['error', 'always'],
      'indent': ['error', 2, {
        'SwitchCase': 1,
        'VariableDeclarator': { 'var': 2 },
        'outerIIFEBody': 0,
      }],
      'operator-linebreak': ['error', 'before', { 'overrides': { '=': 'after' } }],
      'space-before-function-paren': ['error', 'never'],
      'no-cond-assign': 'off',
      'no-useless-escape': 'off',
      'one-var': 'off',
      'no-control-regex': 'off',
      'no-prototype-builtins': 'off',
      'no-extra-semi': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'args': 'none' }],
    },
  },
  {
    ignores: [
      // Ignore node_modules folder
      "node_modules/**",
      // build path
      "dist/**",
      // environmental variables
      ".env",
      // yarn error log
      "yarn-error.log",
      // vscode config
      ".vscode",
      // test coverage
      "coverage",
      // The code is compiled
      "lib/**",
      "*.min.js",
      "public"
    ],
  },
];
