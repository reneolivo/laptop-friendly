import './vendors';

// configures firebase for the first time:
import './services/firebase';

const Module =  angular.module('laptopFriendly', [
  'ngAria',
  'ngAnimate',
  'ui.router',
  'ngSanitize',
  'firebase',
  'ngTagsInput',
]);

export default Module;
