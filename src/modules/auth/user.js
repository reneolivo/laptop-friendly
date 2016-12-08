import {Component, Inject} from '../../lib/decorators';
import '../../services/auth';

@Component({
  bindings: {
    user: '='
  }
})
@Inject('AuthService')
export default class User {
  user = null;

  constructor(authService) {
    this.authService = authService;

    this.getCurrentUser();
    this.watchCurrentUserChanges();
  }

  getCurrentUser() {
    this.user = this.authService.getCurrentUser();
  }

  watchCurrentUserChanges() {
    this.authService.onUserChange((user) => {
      this.user = user;
    });
  }
}
