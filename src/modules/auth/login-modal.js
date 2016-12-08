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
      this._displayLoginError();
    } else if (this._isNetworkError(error.code)) {
      this._displayNetworkError();
    }
  }


  _isLoginError(errorCode) {
    return errorCode === 'auth/user-not-found' ||
    errorCode === 'auth/wrong-password' ||
    errorCode === 'auth/invalid-email';
  }

  _isNetworkError(errorCode) {
    return errorCode === 'auth/network-request-failed';
  }

  _displayLoginError() {
    this._toastError(`Username or Password not valid. Please try again.`);
  }

  _displayNetworkError() {
    this._toastError(`Network Disconnected.`);
  }

  _toastError(message) {
    Materialize.toast(message, 3000,'toast-error');
  }
}
