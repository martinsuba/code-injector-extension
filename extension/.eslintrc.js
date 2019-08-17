module.exports = {
  extends: ['airbnb-base'],
  env: {
    browser: true,
    webextensions: true
  },
  rules: {
    'max-len': [1, 150],
    'comma-dangle': ['error', 'never'],
    'no-plusplus': 'off',
    'no-param-reassign': ['error', { props: false }],
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': [
        '**/webpack.config.js',
        '**/tasks/*'
      ]
    }],
    "import/prefer-default-export": "off",
  }
};
