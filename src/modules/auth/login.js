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
      (user) => this.onLoginSuccess({$user: user}),
      (error) => this.onLoginError({$error: error})
    );
  }
}
