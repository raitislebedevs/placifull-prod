module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
    'node': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 11,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi-style': [
      'error',
      'last'
    ],
    'no-var': 1,
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'no-prototype-builtins': 0,
    'react/display-name': 0,
    'eqeqeq': 1,
    'react/react-in-jsx-scope': 0
  }
}