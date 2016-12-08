import LoginModal from './login-modal';
import Modal from '../../widgets/modal';

describe('LoginModal', () => {
  let user;
  let error;
  let modal;

  beforeEach(() => {
    user = {uid: '1234', name: 'Jon Snow'};
    error = {message: 'error'};

    modal = {
      open: jasmine.createSpy('open'),
      close: jasmine.createSpy('close')
    };
  });

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
        ctrl.modal = modal;
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

    describe('Login Success', () => {
      beforeEach(() => ctrl.modal = modal);

      it('should define a .loginSuccess() method', () => {
        expect(typeof ctrl.loginSuccess).toBe('function');
      });

      it('should call .close() when .loginSuccess() executes', () => {
        spyOn(ctrl, 'close');
        ctrl.loginSuccess(user);

        expect(ctrl.close).toHaveBeenCalled();
      });

      it('should display a success modal when successful', () => {
        spyOn(Materialize, 'toast');

        ctrl.loginSuccess(user);

        expect(Materialize.toast).toHaveBeenCalledWith(
          `Welcome, ${user.name}`,
          3000,
          'toast-success'
        );
      });
    });


    describe('Login Errors', () => {
      let error ;

      beforeEach(() => {
        ctrl.modal = modal;

        error = {
          code: 'auth/user-not-found'
        };

        spyOn(Materialize, 'toast');
      });

      it('should define a .loginError() method', () => {
        expect(typeof ctrl.loginError).toBe('function');
      });

      describe('Bad User name or password', () => {
        it('should handle *auth/user-not-found* code', () => {
          ctrl.loginError(error);
          expectWrongUserNameOrPasswordToast();
        });

        it('should handle *auth/wrong-password* code', () => {
          error.code = 'auth/wrong-password';
          ctrl.loginError(error);

          expectWrongUserNameOrPasswordToast();
        });

        it('should handle *auth/invalid-email* code', () => {
          error.code = 'auth/invalid-email';
          ctrl.loginError(error);

          expectWrongUserNameOrPasswordToast();
        });

        it('should handle *auth/network-request-failed* code', () => {
          error.code = 'auth/network-request-failed';
          ctrl.loginError(error);

          expectErrorToast('Network Disconnected.');
        });

        function expectWrongUserNameOrPasswordToast() {
          expectErrorToast('Username or Password not valid. Please try again.');
        }

        function expectErrorToast(message) {
          expect(Materialize.toast).toHaveBeenCalledWith(
            message,
            3000,
            'toast-error'
          );
        }
      });
    });
  });

  describe('Component', () => {
    let component;
    let compiler;
    let AuthService;

    beforeEach(angular.mock.module(($provide) => {
      AuthService = {
        login: jasmine.createSpy('login')
        .and.returnValue(Promise.resolve(user))
      };

      $provide.value('AuthService', AuthService);
    }));

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
      let ctrl;

      beforeEach(() => {
        component.controller()
        .digest((el, $ctrl) => {
          ctrl = $ctrl;
          modal = $ctrl.modal;
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

      it('should display a close button on the footer', (done) => {
        component.find('modal-footer button.close')
        .digest((el, close) => expect(close.length).toBe(1))
        .digest(done);
      });

      it('should close the modal when clicking button.close', (done) => {
        component.digest(() => spyOn(ctrl, 'close'))
        .click('modal-footer button.close')
        .digest(() => expect(ctrl.close).toHaveBeenCalled())
        .digest(done);
      });
    });

    describe('Loging in', () => {
      it('should add a button.login button to the modal-footer', (done) => {
        component.find('modal-footer button.login')
        .digest((el, login) => expect(login.length).toBe(1))
        .digest(done);
      });

      it('should call login.login() when clicking button.login', (done) => {
        let loginCtrl;

        component.controller((el) => el.find('login'))
        .digest((el, $ctrl) => {
          loginCtrl = $ctrl;
          spyOn(loginCtrl, 'login');
        })
        .click('modal-footer button.login')
        .digest(() => expect(loginCtrl.login).toHaveBeenCalled())
        .digest(done);
      });
    });

    describe('Login Success & Failure', () => {
      let ctrl;
      let loginCtrl;

      beforeEach(() => {
        component.controller()
        .controller((el) => el.find('login'))
        .digest((el, $ctrl) => loginCtrl = $ctrl)
        .controller()
        .digest((el, $ctrl) => {
          ctrl = $ctrl;
          ctrl.modal = modal;
        });
      });

      describe('Success', () => {
        it('should call .loginSuccess() when the login is successful', (done) => {
          component.digest(() => spyOn(ctrl, 'loginSuccess'))
          .digest(() => loginCtrl.onLoginSuccess({$user: user}))
          .digest(() => expect(ctrl.loginSuccess).toHaveBeenCalledWith(user))
          .digest(done);
        });

        it('should close the modal when login is successful', (done) => {
          component.digest(() => loginCtrl.onLoginSuccess({$user: user}))
          .digest(() => expect(ctrl.modal.close).toHaveBeenCalled())
          .digest(done);
        });
      });

      describe('Error', () => {
        it('should call .loginError() when a login error occurs', (done) => {
          let error = {code: 'auth/user-not-found'};
          component.digest(() => spyOn(ctrl, 'loginError'))
          .digest(() => loginCtrl.onLoginError({$error: error}))
          .digest(() => expect(ctrl.loginError).toHaveBeenCalledWith(error))
          .digest(done);
        });
      });
    });
  });
});
