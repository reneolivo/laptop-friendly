import Login from './login';

describe('Login', () => {
  let AuthService;
  let scope;
  let user;

  beforeEach(() => {
    user = { id: '1234', name: 'Jon Snow' };

    AuthService = {
      login: jasmine.createSpy('login')
      .and.returnValue(Promise.resolve(user))
    };

    scope = {
      email: 'jsnow@example.com',
      password: 'IKnowNothing'
    };
  });

  describe('Controller', () => {
    let Ctrl;

    beforeEach(() => {
      Ctrl = new Login(AuthService);
    });

    it('should be defined', () => {
      expect(Ctrl).toBeDefined();
    });

    it('should define a .email property', () => {
      expect(Ctrl.email).toBeDefined();
    });

    it('should define a .password property', () => {
      expect(Ctrl.password).toBeDefined();
    });

    it('should define a .showButtons property', () => {
      expect(Ctrl.showButtons).toBe(true);
    });

    it('should define a .loginCtrl property', () => {
      expect(Ctrl.loginCtrl).toBe(Ctrl);
    });

    describe('Loging in', () => {
      it('should define a .login() method', () => {
        expect(typeof Ctrl.login).toBe('function');
      });

      it('should call authService.login', () => {
        Ctrl.email = scope.email;
        Ctrl.password = scope.password;
        Ctrl.login();

        expect(AuthService.login).toHaveBeenCalledWith(
          scope.email,
          scope.password
        );
      });
    });

    describe('Login success and failure', () => {
      let error;

      beforeEach(() => {
        error = {
          code: 'auth/user-not-found'
        };

        spyOn(Materialize, 'toast');

        AuthService.login
        .and.returnValue(Promise.resolve(user));

        Ctrl.email = scope.email;
        Ctrl.password = scope.password;

        Ctrl.onLoginSuccess = jasmine.createSpy('onLoginSuccess');
        Ctrl.onLoginError = jasmine.createSpy('onLoginError');
      });

      describe('Success', () => {
        it('should call .onLoginSuccess() when login is successful', (done) => {
          Ctrl.login();

          setTimeout(() => {
            expect(Ctrl.onLoginError).not.toHaveBeenCalled();
            expect(Ctrl.onLoginSuccess).toHaveBeenCalledWith({
              $user: user
            });
            done();
          });
        });

        it('should display a success modal when successful', (done) => {
          Ctrl.login();

          setTimeout(() => {
            expect(Materialize.toast).toHaveBeenCalledWith(
              `Welcome, ${user.email}`,
              3000,
              'toast-success'
            );
            done();
          });
        });
      });

      describe('Failure', () => {
        beforeEach(() => {
          AuthService.login
          .and.returnValue(Promise.reject(error));
        });

        it('should call .onLoginError() when login fails', (done) => {
          Ctrl.login();

          setTimeout(() => {
            expect(Ctrl.onLoginSuccess).not.toHaveBeenCalled();
            expect(Ctrl.onLoginError).toHaveBeenCalledWith({
              $error: error
            });
            done();
          });
        });

        describe('Login Errors', () => {
          it('should handle *auth/user-not-found* code', (done) => {
            Ctrl.login();
            expectWrongUserNameOrPasswordToast(done);
          });

          it('should handle *auth/wrong-password* code', (done) => {
            error.code = 'auth/wrong-password';
            Ctrl.login();

            expectWrongUserNameOrPasswordToast(done);
          });

          it('should handle *auth/invalid-email* code', (done) => {
            error.code = 'auth/invalid-email';
            Ctrl.login();

            expectWrongUserNameOrPasswordToast(done);
          });

          it('should handle *auth/network-request-failed* code', (done) => {
            error.code = 'auth/network-request-failed';
            Ctrl.login();

            expectErrorToast(done, 'Network Disconnected.');
          });

          function expectWrongUserNameOrPasswordToast(done) {
            expectErrorToast(done, 'Username or Password not valid. Please try again.');
          }

          function expectErrorToast(done, message) {
            setTimeout(() => {
              expect(Materialize.toast).toHaveBeenCalledWith(
                message,
                3000,
                'toast-error'
              );
              done();
            });
          }
        });
      });
    });
  });

  describe('Component', () => {
    let component;
    let compiler;

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('AuthService', AuthService);
    }));

    beforeEach(inject((CompileService) => {
      compiler = CompileService;
      component = compiler.compile('<login></login>');
    }));

    it('should bind login-ctrl property', (done) => {
      component = compiler.compile('<login login-ctrl="loginCtrl"></login>')
      .controller()
      .digest((el, ctrl) => expect(component.scope.loginCtrl).toBe(ctrl))
      .digest(done);
    });

    it('should define an email input', (done) => {
      component.find('input[type=email]')
      .digest((el, input) => expect(input.length).toBe(1))
      .digest(done);
    });

    it('should bind .email to the email input', (done) => {
      component.controller()
      .digest((el, ctrl) => ctrl.email = scope.email)
      .find('input[type=email]')
      .digest((el, input) => expect(input.val()).toBe(scope.email))
      .digest(done);
    });

    it('should define a password input', (done) => {
      component.find('input[type=password]')
      .digest((el, input) => expect(input.length).toBe(1))
      .digest(done);
    });

    it('should bind .password to the password input', (done) => {
      component.controller()
      .digest((el, ctrl) => ctrl.password = scope.password)
      .find('input[type=password]')
      .digest((el, input) => expect(input.val()).toBe(scope.password))
      .digest(done);
    });

    describe('Loging in', () => {
      it('should define a login button', (done) => {
        component.find('button.login')
        .digest((el, btn) => expect(btn.length).toBe(1))
        .digest(done);
      });

      it('should call .login when clicking the login button', (done) => {
        let ctrl;

        component.controller()
        .digest((el, $ctrl) => {
          ctrl = $ctrl;
          spyOn(ctrl, 'login');
        })
        .click('button.login')
        .digest(() => expect(ctrl.login).toHaveBeenCalled())
        .digest(done);
      });
    });

    describe('Showing & Hiding buttons', () => {
      it('should show the form buttons if .showButtons is true', (done) => {
        compiler.compile('<login></login>')
        .find('div.button')
        .digest((el, buttons) => expect(buttons.length > 0).toBe(true))
        .digest(done);
      });

      it('should hide the form buttons if .showButtons is false', (done) => {
        compiler.compile('<login show-buttons="false"></login>')
        .find('div.button')
        .digest((el, buttons) => expect(buttons.length).toBe(0))
        .digest(done);
      });
    });

    describe('Login Success & Error', () => {
      let events;

      beforeEach(() => {
        events = {
          success: jasmine.createSpy('success'),
          error: jasmine.createSpy('error')
        };

        component = compiler.compile(`
          <login
          on-login-success="success($user)"
          on-login-error="error($error)"
          ></login>
        `, events);
      });

      it('should call event.success when login is successful', (done) => {
        component.controller()
        .digest((el, ctrl) => {
          ctrl.email = scope.email;
          ctrl.password = scope.password;
          ctrl.login();
        })
        .digest(() => expect(events.success).toHaveBeenCalledWith(user))
        .digest(done);
      });

      it('should call event.error when login fails', (done) => {
        let error = {message: 'error'};
        AuthService.login.and.returnValue(Promise.reject(error));

        component.controller()
        .digest((el, ctrl) => {
          ctrl.email = scope.email;
          ctrl.password = scope.password;
          ctrl.login();
        })
        .digest(() => expect(events.error).toHaveBeenCalledWith(error))
        .digest(done);
      });
    });

  });
});
