import Module from '../../module';
import Helpers from '../helpers';

export default function Attribute(params = {}) {
  return function(target) {
    if (!target.$inject) target.$inject = [];

    function Directive(...dependencies) {
      params.restrict = 'A';

      params.link = (scope, element, attributes, controller) => {
        const instance = new target(...dependencies);

        instance.scope = scope;
        instance.element = element;
        instance.attributes = attributes;
        instance.controller = controller;

        instance.link();
      };

      return params;
    }

    Directive.$inject = target.$inject;

    let directiveName = Helpers.string.firstLetterToLowerCase(target.name);
    Module.directive(directiveName, Directive);
  }
}
