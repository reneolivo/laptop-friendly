import {Component, Inject} from '../../lib/decorators';

@Component({
  template: require('./login.html')
})
@Inject('AuthService')
export default class Login {
  email = '';
  password = '';

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
