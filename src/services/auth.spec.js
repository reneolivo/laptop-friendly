import AuthService from './auth';

describe('AuthService', () => {
  let service;
  let fireAuth;
  let scope;

  beforeEach(() => {
    fireAuth = {
      $signInWithEmailAndPassword: jasmine.createSpy('$signIn'),
      $onAuthStateChanged: jasmine.createSpy('$onAuth'),
      $getAuth: jasmine.createSpy('$getAuth')
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

  describe('.onUserChange()', () => {
    it('should define a .onUserChange() method', () => {
      expect(typeof service.onUserChange).toBe('function');
    });

    it('should call fireAuth.$onAuthStateChanged', () => {
      let callback = () => true;
      service.onUserChange(callback);
      expect(fireAuth.$onAuthStateChanged).toHaveBeenCalledWith(callback);
    });
  });

  describe('.getCurrentUser()', () => {
    it('should define a .getCurrentUser() method', () => {
      expect(typeof service.getCurrentUser).toBe('function');
    });

    it('should call fireAuth.$getAuth()', () => {
      service.getCurrentUser();
      expect(fireAuth.$getAuth).toHaveBeenCalled();
    });
  });
});
