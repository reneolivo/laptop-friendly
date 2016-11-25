'use strict';

const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    frameworks: [ 'jasmine' ],
    reporters: [
      'spec',
      'coverage',
    ],
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
      'src/specs.js'
    ],
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
