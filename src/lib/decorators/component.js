import Module from '../../module';
import Helpers from '../helpers';



export default function Component(options = {}) {
  return function(target) {
    let name = options.name || target.name;
    name = Helpers.string.firstLetterToLowerCase(name);

    Module.component(name, {
      template: options.template,
      controller: target
    });
  };
}
