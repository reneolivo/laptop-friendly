import {Component} from '../../lib/decorators';
import '../../widgets/modal';
import './place-form';

@Component({
  template: require('./place-form-modal.html'),
  bindings: {
    controller: '=?'
  }
})
export default class PlaceFormModal {
  constructor() {
    this.controller = this;
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  submit() {
    this.placeForm.submit();
  }
}
