import Login from './login';

describe('Login', () => {
  let AuthService;
  let scope;

  beforeEach(() => {
    AuthService = {
      login: jasmine.createSpy('login')
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

  });
});
