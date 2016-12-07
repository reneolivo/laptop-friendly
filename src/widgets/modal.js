import {Component, Inject} from '../lib/decorators';

@Component({
  template: require('./modal.html'),
  bindings: {
    modalCtrl: '='
  },
  transclude: {
    'modal-content': 'modalContent',
    'modal-footer': '?modalFooter'
  }
})
@Inject('$element')
export default class Modal {
  constructor(element) {
    this.modalCtrl = this;

    this.element = element;
    this.modalElement = jQuery(this.element.find('.modal'));
  }

  open() {
    this.modalElement.modal('open');
  }

  close() {
    this.modalElement.modal('close');
  }
}
