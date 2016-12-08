import './vendors';

// configures firebase for the first time:
import './services/firebase';

const Module =  angular.module('laptopFriendly', [
  'ui.router',
  'ngSanitize',
  'firebase'
]);

export default Module;
