'use strict';

const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    frameworks: [ 'jasmine' ],
    reporters: [
      'spec',
      'coverage',
    ],
    specReporter: {
      suppressSkipped: true
    },
    coverageReporter: {
      includeAllSources: true,
      dir: 'coverage',
      reporters: [
        { includeAllSources: true, type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    files: [
      'src/specs.js',
      { pattern: 'images/**/*.png', served: true, included: false, watched: false }
    ],
    proxies: {
      '/images/': '/base/images/'
    },
    preprocessors: {
      'src/**/*.js': [
        'webpack',
        'sourcemap'
      ]
    },
    port: 9090,
    colors: true,
    autoWatch: true,
    browsers: [ 'Chrome' ],
    singleRun: true,
    webpack: webpackConfig
  });
};
