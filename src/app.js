import Module from './module';
import './services/places';
import './places/places';
import './styles/styles.scss';
import './lib/helpers/angular/compile';



Module.config([
  '$urlRouterProvider',
  ($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
  }
]);

export default Module;
