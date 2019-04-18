// my-webpack-transformer.js
const webpackCustomizations = {
  externals: {
    'external-services': 'Services',
  },
};

module.exports = function editWebpackConfig(webpackConfig) {
  // webpackConfig is the parsed JS webpack config from react-scrips.
  // modify it here synchronously, & return it.
  return Object.assign({}, webpackConfig, {
    ...webpackCustomizations,
  });
};
