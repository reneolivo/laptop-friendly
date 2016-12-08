import 'angular';
import 'angular-mocks';
import 'jasmine2-custom-message';
import './data';
import './lib/helpers/angular/compile';

import firebase from 'firebase';
window.firebase = firebase;

beforeEach(angular.mock.module('laptopFriendly'));

angular.module('laptopFriendly').config(($sceDelegateProvider) => {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://*.example.com/**'
  ]);
});

const tests = require.context(".", true, /\.spec\.js$/);
tests.keys().forEach(tests);
