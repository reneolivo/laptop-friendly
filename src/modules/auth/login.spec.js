import Login from './login';

describe('Login', () => {
  let AuthService;
  let scope;
  let user;
  let formScope;
  let formCtrl;
  let compiler;

  beforeEach(angular.mock.module(($provide) => {
    user = { id: '1234', name: 'Jon Snow' };

    scope = {
      email: 'jsnow@example.com',
      password: 'IKnowNothing'
    };

    AuthService = {
      login: jasmine.createSpy('login')
      .and.returnValue(Promise.resolve(user))
    };

    $provide.value('AuthService', AuthService);
  }));

  beforeEach(inject(($compile, $rootScope, CompileService) => {
    compiler = CompileService;

    formScope = $rootScope.$new();
    $compile(`<form name="formCtrl"></form>`)(formScope);
    formCtrl = formScope.formCtrl;
  }));

  describe('Controller', () => {
    let Ctrl;

    beforeEach(() => {
      Ctrl = new Login(AuthService, formScope);
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

    describe('Validation', () => {
      it('should not try to login if the form is not valid', () => {
        formCtrl.$setValidity('required', false);
        Ctrl.login();
        expect(AuthService.login).not.toHaveBeenCalled();
      });

      it('should try to login if the form is valid', () => {
        formCtrl.$setValidity('required', true);
        Ctrl.login();
        expect(AuthService.login).toHaveBeenCalled();
      });

      it('should mark the form as submitted when trying to login', () => {
        expect(formCtrl.$submitted).toBe(false);
        Ctrl.login();
        expect(formCtrl.$submitted).toBe(true);
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

    beforeEach(() => {
      component = compiler.compile('<login></login>');
    });

    function sendKeys(inputName, value) {
      return component.digest((el) => {
        return el.find(inputName)
        .val(value)
        .trigger('input')
        .trigger('blur');
      });
    }

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
        .digest((el) => el.find('form').trigger('submit'))
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
        sendKeys('[name=email]', scope.email);
        sendKeys('[name=password]', scope.password);

        component.click('button.login')
        .digest(() => expect(events.success).toHaveBeenCalledWith(user))
        .digest(done);
      });

      it('should call event.error when login fails', (done) => {
        let error = {message: 'error'};
        AuthService.login.and.returnValue(Promise.reject(error));

        sendKeys('[name=email]', scope.email);
        sendKeys('[name=password]', scope.password);

        component.click('button.login')
        .digest(() => expect(events.error).toHaveBeenCalledWith(error))
        .digest(done);
      });
    });

    describe('Validation', () => {
      let emailErrorElement = '.error.email-error';
      let passwordErrorElement = '.error.password-error';
      let emailErrorMessage = 'Valid email required.';
      let passwordErrorMessage = 'Valid password required.';

      function expectError(errorElementPath, errorMessage) {
        let error;

        return component.digest((el) => el.find(errorElementPath))
        .digest((el, errorElement) => error = errorElement)
        .digest((el) => expect(error.length).toBe(1))
        .digest((el) => expect(error.text()).toBe(errorMessage));
      }

      function dontExpectError(errorElementPath) {
        return component.digest((el) => el.find(errorElementPath))
        .digest((el, error) => expect(error.length).toBe(0));
      }

      describe('Showing validation errors', () => {
        it('should show an error message after entering an invalid email', (done) => {
          sendKeys('[name=email]', 'info@');
          expectError(emailErrorElement, emailErrorMessage);
          component.digest(done);
        });

        it('should show an error after leaving the email field empty', (done) => {
          sendKeys('[name=email]', '');
          expectError(emailErrorElement, emailErrorMessage);
          component.digest(done);
        });

        it('should show an error after leaving the password field empty', (done) => {
          sendKeys('[name=password]', '');
          expectError(passwordErrorElement, passwordErrorMessage);
          component.digest(done);
        });

        it('should show several error messages after trying to submit an empty form', (done) => {
          component.digest((el) => el.find('form').trigger('submit'));
          expectError(emailErrorElement, emailErrorMessage);
          expectError(passwordErrorElement, passwordErrorMessage);
          component.digest(done);
        });
      });

      describe('Hiding validation errors', () => {
        it('should not show an error message if the email is valid', (done) => {
          sendKeys('[name=email]', 'info@example.com');
          dontExpectError(emailErrorElement);
          component.digest(done);
        });

        it('should not show an error message if the password is valid', (done) => {
          sendKeys('[name=password]', '12345678');
          dontExpectError(passwordErrorElement);
          component.digest(done);
        });

        it('should not show an error message when submitting a valid form', (done) => {
          sendKeys('[name=email]', 'info@example.com');
          sendKeys('[name=password]', '12345678');
          component.digest((el) => el.find('form').trigger('submit'));
          dontExpectError(emailErrorElement);
          dontExpectError(passwordErrorElement);
          component.digest(done);
        });
      });
    });

  });
});
