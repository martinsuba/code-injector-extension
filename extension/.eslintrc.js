const airbnbConfigStyle = require('eslint-config-airbnb-base/rules/style');
const airbnbConfigImports = require('eslint-config-airbnb-base/rules/imports');

module.exports = {
  extends: ['airbnb-base'],
  env: {
    browser: true,
    webextensions: true
  },
  settings: {
    // Externals should be resolved via webpack config but:
    // https://github.com/benmosher/eslint-plugin-import/issues/605
    'import/core-modules': [
      'external-services'
    ]
  },
  rules: {
    // Allow longer lines
    'max-len': [1, 150],
    'comma-dangle': ['error', 'never'],
    'no-plusplus': 'off',
    'no-param-reassign': ['error', { props: false }],
    // TODO: Remove these exceptions in the future
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': [
        '**/webpack.config.js',
        '**/tasks/*'
      ]
    }],
  }
};
