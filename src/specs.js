import 'angular';
import 'angular-mocks';
import 'jasmine2-custom-message';
import './data';
import './lib/helpers/angular/compile';

beforeEach(angular.mock.module('laptopFriendly'));

const tests = require.context(".", true, /\.spec\.js$/);
tests.keys().forEach(tests);
