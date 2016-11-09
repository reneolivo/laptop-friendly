import Module from './module';
import Places from './places/places';



Module.config([
  '$urlRouterProvider',
($urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');
}]);

export default module;
