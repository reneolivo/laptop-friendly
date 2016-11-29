import Module from '../../module';
import Helpers from '../helpers';



export default function Component(options = {}) {
  return function(target) {
    let name = options.name || target.name;
    name = Helpers.string.firstLetterToLowerCase(name);

    options.template = options.template || '';
    options.controller = target;

    delete options.name;

    Module.component(name, options);
  };
}
