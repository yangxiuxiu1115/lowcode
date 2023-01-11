module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'prettier'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './packages/core/tsconfig.json',
      './packages/server/tsconfig.json',
      './packages/concept/tsconfig.json',
      './packages/material/tsconfig.json'
    ]
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    'no-new-func': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-unneeded-ternary': 'off',
    '@typescript-eslint/no-misused-promises': 'off'
  }
}
