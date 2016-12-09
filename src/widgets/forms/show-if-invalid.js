import {Attribute} from '../../lib/decorators';

@Attribute({
  require: '^form',
  scope: {
    inputName: '@showIfInvalid'
  }
})
export default class ShowIfInvalid {
  link() {
    this._hideElement();

    this._updateElementVisibilityWhenValidityChanges();
  }

  _hideElement() {
    jQuery(this.element).hide();
  }

  _showElement() {
    jQuery(this.element).show();
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
