import Modal from './modal';

describe('Modal', () => {
  describe('Controller', () => {
    let ctrl;
    let element;

    beforeEach(() => {
      spyOn(jQuery.fn, 'modal').and.callThrough();

      element = jQuery('<div class="modal"></div>');

      ctrl = new Modal(element);
    });

    it('should be defined', () => {
      expect(ctrl).toBeDefined();
    });

    it('should define a .modalElement property', () => {
      let modal = jQuery(element.find('.modal'));

      expect(ctrl.modalElement).toEqual(modal);
    });

    it('should define a .modalCtrl property', () => {
      expect(ctrl.modalCtrl).toBe(ctrl);
    });

    describe('.open()', () => {
      it('should define an .open() method', () => {
        expect(typeof ctrl.open).toBe('function');
      });

      it('should call modalElement.modal("open")', () => {
        ctrl.open();
        expect(jQuery.fn.modal).toHaveBeenCalledWith('open');
      });
    });

    describe('.close()', () => {
      it('should define a .close() method', () => {
        expect(typeof ctrl.close).toBe('function');
      });

      it('should call modalElement.modal("close")', () => {
        ctrl.close();
        expect(jQuery.fn.modal).toHaveBeenCalledWith('close');
      });
    });
  });

  describe('Component', () => {
    let component;
    let compiler;

    beforeEach(inject((CompileService) => {
      compiler = CompileService;

      component = compiler.compile(`
        <modal modal-ctrl="myModal">
          <modal-content>Hello</modal-content>
          <modal-footer>
            <button class="save">Save</button>
          </modal-footer>
        </modal>
      `);
    }));

    it('should expose modalCtrl', (done) => {
      component.controller()
      .digest((el, ctrl) => expect(component.scope.myModal).toBe(ctrl))
      .digest(done);
    });

    it('should transclude the modal content', (done) => {
      component.find('.modal-content')
      .digest((el, content) => content.text())
      .digest((el, text) => expect(text).toBe('Hello'))
      .digest(done);
    });

    it('should transclude the modal footer', (done) => {
      component.find('button.save')
      .digest((el, button) => expect(button.length).toBe(1))
      .digest(done);
    });

    describe('default footer', () => {
      beforeEach(() => {
        component = compiler.compile(`
          <modal modal-ctrl="myModal">
            <modal-content>Hello</modal-content>
          </modal>
        `);
      });

      it('should display a default footer if none is provided', (done) => {
        let button;

        component.find('.modal-footer button.close')
        .digest((el, $button) => button = $button)
        .digest((el) => expect(button.length).toBe(1))
        .digest((el) => expect(button.text()).toBe('Close'))
        .digest(done);
      });

      it('should close the modal when clicked', (done) => {
        let ctrl;

        component.controller()
        .digest((el, $ctrl) => {
          ctrl = $ctrl;
          spyOn(ctrl, 'close');
        })
        .click('button.close')
        .digest(() => expect(ctrl.close).toHaveBeenCalled())
        .digest(done);
      });
    });
  });
});
