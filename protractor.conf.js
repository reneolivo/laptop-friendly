'use strict';

const chromeDriver = require('chromedriver');

exports.config = {
  baseUrl: 'http://localhost:8080/',
  specs: [
    'src/**/*.e2e.js'
  ],
  exlude: [
    /node_modules/
  ],
  framework: 'jasmine',
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    includeStackTrace: true,
  },
  directConnect: true,
  capabilities: {
    browserName: 'chrome',
  },
  chromeDriver: chromeDriver.path,
  seleniumServerJar: 'node_modules/selenium-standalone/.selenium/selenium-server/2.53.0-server.jar'
};
