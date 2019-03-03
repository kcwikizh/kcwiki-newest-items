// https://eslint.org/
module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // semi: ['error', 'never'],
    // 'comma-dangle': ['error', 'always-multiline'],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'no-undef': 'error',
    'no-var': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
    'unicode-bom': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'import/no-named-as-default-member': 'off',
    'prettier/prettier': 'warn',
  },
  settings: {
    react: {
      // https://github.com/yannickcr/eslint-plugin-react#configuration
      version: require('react').version,
    },
  },
}
