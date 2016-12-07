import AuthService from './auth';

describe('AuthService', () => {
  let service;
  let fireAuth;
  let scope;

  beforeEach(() => {
    fireAuth = {
      $signInWithEmailAndPassword: jasmine.createSpy('$signIn')
    };

    scope = {
      email: 'jsnow@example.com',
      password: 'IKnowNothing'
    };

    service = new AuthService(() => fireAuth);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.login()', () => {
    it('should define a .login() method', () => {
      expect(typeof service.login).toBe('function');
    });

    it('should call fireAuth.$signInWithEmailAndPassword', () => {
      service.login(scope.email, scope.password);

      expect(fireAuth.$signInWithEmailAndPassword).toHaveBeenCalledWith(
        scope.email,
        scope.password
      );
    });
  });
});
