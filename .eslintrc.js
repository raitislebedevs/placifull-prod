module.exports = {
  env: {
    browser: true,
    es2020: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  root: true,
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react'],
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    quotes: ['error', 'single'],
    'semi-style': ['error', 'last'],
    'no-var': 1,
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'no-prototype-builtins': 0,
    'react/display-name': 0,
    'react/react-in-jsx-scope': 0,
  },
};
