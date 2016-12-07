import './vendors';
import './data';
// configures firebase for the first time:
import './services/firebase';

const Module =  angular.module('laptopFriendly', [
  'ui.router',
  'ngSanitize',
  'firebase',
  'laptopFriendly.data'
]);

export default Module;
