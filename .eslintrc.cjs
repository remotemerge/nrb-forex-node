module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es2024: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    // Prettier rules
    'prettier/prettier': 'error',
    // Custom rules
    indent: ['error', 2, { SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] }],
    'linebreak-style': ['error', 'unix'],
    'prefer-const': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
