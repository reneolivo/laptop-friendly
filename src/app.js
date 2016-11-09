import Module from './module';
import Places from './places/places';



Module.config([
  '$stateProvider',
  '$urlRouterProvider',
(
  $stateProvider,
  $urlRouterProvider
) => {
  $stateProvider.state('home', {
    url: '/',
    template: '<places></places>'
  });

  $urlRouterProvider.otherwise('/');
}]);

export default module;
