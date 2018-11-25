const path = require('path');

const jsLoader = {
  test: /\.js$/,
  loaders: [
    {
      loader: 'babel-loader',
      options: {
        plugins: ['@babel/plugin-transform-runtime'],
        presets: ['@babel/preset-env']
      }
    }
  ],
  exclude: /node_modules/
};

module.exports = {
  mode: 'none',
  context: path.resolve(__dirname, 'src'),
  entry: {
    services: './index.js'
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../ui/public'),
    library: 'Services',
    libraryTarget: 'umd'
  },
  plugins: [],
  module: {
    rules: [
      jsLoader
    ]
  }
};
