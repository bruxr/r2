module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'eqeqeq': ['warn', 'smart'],
    'semi': ['warn', 'always'],
    'max-len': ['error', { code: 120 }],
    'object-curly-spacing': ['warn', 'always'],
    'quotes': ['warn', 'single'],
  },
};
