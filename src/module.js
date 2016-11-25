import 'angular';
import 'angular-ui-router';
import './data';

const Module =  angular.module('laptopFriendly', [
  'ui.router',
  'laptopFriendly.data'
]);

export default Module;
