import {Attribute, Inject} from '../../lib/decorators';

@Attribute({
  require: '^form',
  scope: {
    inputName: '@showIfInvalid'
  }
})
@Inject('$animate')
export default class ShowIfInvalid {
  constructor($animate) {
    this.$animate = $animate;
  }

  link() {
    this._setupElements();
    this._hideElement();
    this._updateElementVisibilityWhenValidityChanges();
  }

  _setupElements() {
    this.parentElement = this.element.parent()[0];
    this.previousElement = this.element.prev()[0];
  }

  _hideElement() {
    this.$animate.leave(this.element);
  }

  _showElement() {
    this.$animate.enter(this.element, this.parentElement, this.previousElement);
  }

  _updateElementVisibilityWhenValidityChanges() {
    this.scope.$watch(
      () => this._isInvalid(),
      (isInvalid) => this._hideOrShowElementIfInValid(isInvalid)
    );
  }

  _isInvalid() {
    let input = this.controller[ this.scope.inputName ];

    return (
      this._isInvalidWhenInputIsInvalidAndTouched(input) ||
      this._isInvalidWhenInputIsInvalidAndUntouchedButFormIsSubmitted(input)
    );
  }

  _isInvalidWhenInputIsInvalidAndTouched(input) {
    return input && input.$invalid && input.$touched;
  }

  _isInvalidWhenInputIsInvalidAndUntouchedButFormIsSubmitted(input) {
    return input && input.$invalid && input.$untouched && this.controller.$submitted;
  }

  _hideOrShowElementIfInValid(isInvalid) {
    if (isInvalid) {
      this._showElement();
    } else {
      this._hideElement();
    }
  }
}
