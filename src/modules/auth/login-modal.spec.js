import LoginModal from './login-modal';
import Modal from '../../widgets/modal';

describe('LoginModal', () => {
  describe('Controller', () => {
    let ctrl;

    beforeEach(() => {
      ctrl = new LoginModal();
    });

    it('should be defined', () => {
      expect(ctrl).toBeDefined();
    });

    it('should define a .modal property', () => {
      expect(ctrl.modal).toBeDefined();
    });

    it('should define a .loginModalCtrl property', () => {
      expect(ctrl.loginModalCtrl).toBe(ctrl);
    });

    describe('Opening and closing', () => {
      beforeEach(() => {
        ctrl.modal = {
          open: jasmine.createSpy('open'),
          close: jasmine.createSpy('close')
        };
      });

      it('should define an .open() method', () => {
        expect(typeof ctrl.open).toBe('function');
      });

      it('should call modal.open() when .open() is called', () => {
        ctrl.open();
        expect(ctrl.modal.open).toHaveBeenCalled();
      });

      it('should define a .close() method', () => {
        expect(typeof ctrl.close).toBe('function');
      });

      it('should call modal.close() when .close() is called', () => {
        ctrl.close();
        expect(ctrl.modal.close).toHaveBeenCalled();
      });
    });
  });

  describe('Component', () => {
    let component;
    let compiler;

    beforeEach(inject((CompileService) => {
      compiler = CompileService;
      component = compiler.compile(`
        <login-modal
        login-modal-ctrl="myLoginModal"
        ></login-modal>
      `)
    }));

    it('should expose the controller', (done) => {
      component.controller()
      .digest((el, ctrl) => expect(component.scope.myLoginModal).toBe(ctrl))
      .digest(done);
    });

    it('should pass the login component to the modal content', (done) => {
      component.find('modal-content login')
      .digest((el, login) => expect(login.length).toBe(1))
      .digest(done);
    });

    it('should not display the login form buttons', (done) => {
      component.find('login div.button')
      .digest((el, buttons) => expect(buttons.length).toBe(0))
      .digest(done);
    });

    describe('Opening and Closing', () => {
      let modal;

      beforeEach(() => {
        component.controller()
        .digest((el, ctrl) => {
          modal = ctrl.modal;
        });
      });

      it('should implement a modal widget', (done) => {
        component.digest(() => expect(modal instanceof Modal).toBe(true))
        .digest(done);
      });

      it('should open the modal', (done) => {
        component.digest(() => spyOn(modal, 'open'))
        .controller()
        .digest((el, ctrl) => ctrl.open())
        .digest(() => expect(modal.open).toHaveBeenCalled())
        .digest(done);
      });

      it('should close the modal', (done) => {
        component.digest(() => spyOn(modal, 'close'))
        .controller()
        .digest((el, ctrl) => ctrl.close())
        .digest(() => expect(modal.close).toHaveBeenCalled())
        .digest(done);
      });
    });
  });
});
