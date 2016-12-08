import {Component} from '../../lib/decorators';
import '../../widgets/modal';
import './login';

@Component({
  template: require('./login-modal.html'),
  bindings: {
    loginModalCtrl: '=?'
  }
})
export default class LoginModal {
  modal = null;

  constructor() {
    this.loginModalCtrl = this;
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  loginSuccess(user) {
    this.close();

    Materialize.toast(
      `Welcome, ${user.name}`,
      3000,
      'toast-success'
    );
  }

  loginError(error) {
    if (this._isLoginError(error.code)) {
      Materialize.toast(
        `Username or Password not valid. Please try again.`,
        3000,
        'toast-error'
      );
    }
  }

  _isLoginError(errorCode) {
    return errorCode === 'INVALID_EMAIL' ||
    errorCode === 'INVALID_PASSWORD';
  }
}
