import {Service} from '../lib/decorators';

@Service
export default class Toast {
  success(message, delay = 3000) {
    Materialize.toast(message, delay, 'toast-success');
  }

  error(message, delay = 3000) {
    Materialize.toast(message, delay, 'toast-error');
  }
}
