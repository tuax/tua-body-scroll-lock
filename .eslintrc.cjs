module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    'standard',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'import/order': ['error', {
      groups: [
        ['builtin', 'external'],
        ['unknown', 'internal'],
        ['parent', 'sibling', 'index'],
      ],
      pathGroups: [
        { pattern: '@/**', group: 'internal' },
        { pattern: '@!(/)**', group: 'external' },
      ],
      pathGroupsExcludedImportTypes: [],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      'newlines-between': 'always',
    }],
  },
}
