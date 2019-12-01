const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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

const plugins = [
  new CopyWebpackPlugin([
    {
      from: './manifest.json',
      to: './',
      toType: 'dir'
    },
    {
      from: './background.html',
      to: './',
      toType: 'dir'
    }
  ]),
  new CopyWebpackPlugin([
    {
      from: './icons',
      to: './icons/',
      toType: 'dir'
    }
  ]),
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../ui/build/'),
      to: './ui/',
      toType: 'dir'
    }
  ])
];

module.exports = mode => ({
  mode,
  context: path.resolve(__dirname, 'src'),
  entry: {
    background: './background.js',
    'content-script': './content-script.js'
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins,
  module: {
    rules: [
      jsLoader
    ]
  }
});
