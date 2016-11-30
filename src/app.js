import Module from './module';
import './services/places';
import './modules/home/home';
import './styles/styles.scss';



Module.config([
  '$urlRouterProvider',
  ($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
  }
]);

export default Module;
