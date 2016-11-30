import 'angular';
import 'angular-ui-router';
import 'angular-sanitize';
import './data';

const Module =  angular.module('laptopFriendly', [
  'ui.router',
  'ngSanitize',
  'laptopFriendly.data'
]);

export default Module;
