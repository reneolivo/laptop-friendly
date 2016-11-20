import 'angular';
import 'angular-mocks';

beforeEach(angular.mock.module('laptopFriendly'));


const tests = require.context(".", true, /\.spec\.js$/);
tests.keys().forEach(tests);
