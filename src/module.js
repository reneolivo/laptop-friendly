import 'angular';
import 'angular-ui-router';
import 'angular-sanitize';
import './data';
import './services/firebase';
import 'angularfire';

const Module =  angular.module('laptopFriendly', [
  'ui.router',
  'ngSanitize',
  'firebase',
  'laptopFriendly.data'
]);

export default Module;
