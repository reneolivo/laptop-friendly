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
}
