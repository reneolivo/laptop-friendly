'use strict';

const path = require('path');
const webpack = require('webpack');
const Extract = require('extract-text-webpack-plugin');

const JSDIR = path.join(__dirname, 'src');
const JSOUT = path.join(__dirname, 'dist');

const extractCss = new Extract('styles.css');

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
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: 'raw-loader',
        test: /\.html$/,
        exclude: /node_modules/
      },
      {
        loader: extractCss.extract([ 'css-loader', 'sass-loader' ]),
        test: /\.scss$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    extractCss
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
