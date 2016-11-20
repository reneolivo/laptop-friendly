import Module from '../../module';
import Helpers from '../helpers';

export default function State(options = {}) {
  return function(target) {
    autoGenerateTemplate(target, options);

    Module.config([
      '$stateProvider',
      ($stateProvider) => {
        $stateProvider.state(options.name, {
          url: options.url,
          template: options.template
        });
      }
    ]);
  };
};

function autoGenerateTemplate(target, options) {
  if (options.template) return;

  const name = Helpers.string.firstLetterToLowerCase(target.name);

  options.template = `<${name}></${name}>`;
}
