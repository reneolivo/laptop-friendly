'use strict';

const path = require('path');
const webpack = require('webpack');

const JSDIR = path.join(__dirname, 'src');
const JSOUT = path.join(__dirname, 'dist');

module.exports = {
  entry: path.join(JSDIR, 'app.js'),
  output: {
    path: JSOUT,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js$/
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
