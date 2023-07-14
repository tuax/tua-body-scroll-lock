module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: 'tsconfig.eslint.json'
  },
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  }
}
