import Module from '../../module';
import Helpers from '../helpers';


export default function Service(target) {
  if (typeof target === 'function') {
    Module.service(target.name, target);
    return;
  }

  const name = target;
  return function(target) {
    Module.service(name, target);
  };
}
