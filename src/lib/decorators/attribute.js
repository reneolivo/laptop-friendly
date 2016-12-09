import Module from '../../module';

export default function Attribute(params) {
  return function(target) {
    if (!target.$inject) target.$inject = [];

    function Directive(...dependencies) {
      const instance = new target(...dependencies);

      params.restrict = 'A';
      params.link = (scope, element, attributes, controllers) => {
        instance.link(scope, element, attributes, controllers);
      };

      return params;
    }

    Directive.$inject = target.$inject;

    Module.directive(target.name, Directive);
  }
}
