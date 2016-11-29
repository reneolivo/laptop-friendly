'use strict';

const path = require('path');
const webpack = require('webpack');
const Extract = require('extract-text-webpack-plugin');

const JSDIR = path.join(__dirname, 'src');
const JSOUT = path.join(__dirname, 'dist');

const extractCss = new Extract('styles.css');

let cssLoader = 'style-loader!css-loader!sass-loader';

if (process.env.NODE_ENV === 'production') {
  cssLoader = extractCss.extract([
    'css-loader',
    'sass-loader'
  ]);
}

module.exports = {
  debug: true,
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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: cssLoader,
        exclude: /node_modules/
      },
      {
        test: /\.(ttf|eot|woff2?)(\?v=.*)?$/,
        loader: 'file-loader',
        query: {
          name: '../fonts/[name].[ext]'
        }
      },
      {
        test: /fonts\/.*\.svg(\?v=.*)?$/,
        loader: 'file-loader',
        query: {
          name: '../fonts/[name].[ext]'
        }
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        query: {
          name: '../images/[name].[ext]'
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
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
