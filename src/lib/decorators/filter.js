import Module from '../../module';

export default function Filter(target) {
  if (!target.$inject) target.$inject = [];

  function filterProxy(...dependencies) {
    var filter = new target(...dependencies);

    return function transform(...params) {
      return filter.transform(...params);
    }
  }

  filterProxy.$inject = target.$inject;

  Module.filter(target.name, filterProxy);
}
