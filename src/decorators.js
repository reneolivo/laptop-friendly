import Module from './module';



export function Component(options = {}) {
  return function(target) {
    let name = options.name || target.name;
    name = firstLetterToLowerCase(name);

    Module.component(name, {
      template: options.template,
      controller: target
    });
  };
};

function firstLetterToLowerCase(string) {
  return string[0].toLowerCase() + string.slice(1);
}
