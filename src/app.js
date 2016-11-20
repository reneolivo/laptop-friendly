import Module from './module';
import Places from './places/places';
import './styles/styles.scss';



Module.config([
  '$urlRouterProvider',
  ($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
  }
]);

export default Module;
