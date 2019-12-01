const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

module.exports = function buildExtension(mode) {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig(mode), (err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString({
          colors: true,
          hash: false,
          version: false,
          timings: true,
          assets: false,
          chunks: false,
          modules: false,
          reasons: false,
          children: false,
          source: false,
          errors: true,
          errorDetails: true,
          warnings: true,
          publicPath: false
        }));
      }

      resolve();
    });
  });
};
