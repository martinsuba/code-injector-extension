const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  new HtmlWebpackPlugin({
    filename: './background.html',
    template: './background.html',
    title: 'Background Page'
  }),
  new CopyWebpackPlugin([
    {
      from: './manifest.json',
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
  ]),
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../ui/public/services.js'),
      to: './',
      toType: 'dir'
    }
  ])
];

module.exports = {
  mode: 'none',
  context: path.resolve(__dirname, 'src'),
  entry: {
    js: './background.js'
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './')
    ]
  },
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: {
    'external-services': 'Services'
  },
  plugins,
  module: {
    rules: [
      jsLoader
    ]
  }
};
