export default function Inject() {
  let dependencies = Array.prototype.slice.call(arguments);

  if (Array.isArray(arguments[0])) {
    dependencies = arguments[0];
  }

  return function(target) {
    target.$inject = dependencies;
  }
}
