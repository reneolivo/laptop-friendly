import Module from './module';
import './services/places';
import './places/places';
import './styles/styles.scss';



Module.config([
  '$urlRouterProvider',
  ($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
  }
]);

export default Module;
