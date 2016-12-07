import {Service, Inject} from '../lib/decorators';

@Service('AuthService')
@Inject('$firebaseAuth')
export default class AuthService {
  constructor($firebaseAuth) {
    this.fireAuth = $firebaseAuth();
  }

  login(email, password) {
    this.fireAuth.$signInWithEmailAndPassword(email, password);
  }

  onUserChange(callback) {
    this.fireAuth.$onAuthStateChanged(callback);
  }

  getCurrentUser() {
    return this.fireAuth.$getAuth();
  }
}
