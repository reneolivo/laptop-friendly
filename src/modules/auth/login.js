import {Component, Inject} from '../../lib/decorators';

@Component({
  template: require('./login.html'),
  bindings: {
    loginCtrl: '=?',
    showButtons: '@',
    onLoginSuccess: '&',
    onLoginError: '&'
  }
})
@Inject('AuthService')
export default class Login {
  email = '';
  password = '';
  showButtons = true;

  constructor(AuthService) {
    this.loginCtrl = this;

    this.authService = AuthService;
  }

  login() {
    this.authService.login(
      this.email,
      this.password
    ).then(
      (user) => this._handleLoginSuccess(user),
      (error) => this._handleLoginError(error)
    );
  }

  _handleLoginSuccess(user) {
    this._dispatchSuccess(user);
    this._displaLoginSuccess(user);
  }

  _handleLoginError(error) {
    this._dispatchError(error);
    this._displayLoginErrors(error);
  }

  _dispatchSuccess(user) {
    this.onLoginSuccess({$user: user})
  }

  _displaLoginSuccess(user) {
    Materialize.toast(
      `Welcome, ${user.email}`,
      3000,
      'toast-success'
    );
  }

  _dispatchError(error) {
    this.onLoginError({$error: error})
  }

  _displayLoginErrors(error) {
    if (this._isCredentialError(error.code)) {
      this._displayCredentialError();
    } else if (this._isNetworkError(error.code)) {
      this._displayNetworkError();
    }
  }


  _isCredentialError(errorCode) {
    return errorCode === 'auth/user-not-found' ||
    errorCode === 'auth/wrong-password' ||
    errorCode === 'auth/invalid-email';
  }

  _isNetworkError(errorCode) {
    return errorCode === 'auth/network-request-failed';
  }

  _displayCredentialError() {
    this._toastError(`Username or Password not valid. Please try again.`);
  }

  _displayNetworkError() {
    this._toastError(`Network Disconnected.`);
  }

  _toastError(message) {
    Materialize.toast(message, 3000,'toast-error');
  }
}
