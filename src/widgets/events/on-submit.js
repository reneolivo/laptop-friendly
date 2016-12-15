import {Attribute, Inject} from '../../lib/decorators';

@Attribute({
  scope: {
    action: '@onSubmit'
  },
  require: 'form'
})
@Inject('$parse')
export default class OnSubmit {
  constructor($parse) {
    this.$parse = $parse;
  }

  link() {
    this.element.on('submit', (event) => {
      event.preventDefault();
      this._setFormAsSubmitted();
      this._parseAction(event);
    });
  }

  _setFormAsSubmitted() {
    this.controller.$setSubmitted();
  }

  _parseAction(event) {
    this.scope.$parent.$event = event;
    this.$parse(this.scope.action)(this.scope.$parent);
    delete this.scope.$parent.$event;
  }
}
