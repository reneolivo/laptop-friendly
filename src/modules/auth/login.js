import {Component, Inject} from '../../lib/decorators';

@Component({
  template: require('./login.html'),
  bindings: {
    showButtons: '@'
  }
})
@Inject('AuthService')
export default class Login {
  email = '';
  password = '';
  showButtons = true;

  constructor(AuthService) {
    this.authService = AuthService;
  }

  login() {
    this.authService.login(
      this.email,
      this.password
    );
  }
}
