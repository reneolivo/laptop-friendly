import User from './user';

describe('User', () => {
  let authService;
  let userChangeCallback;
  let user;

  beforeEach(() => {
    user = { uid: '1234', name: 'Jon Snow' };

    authService = {
      getCurrentUser: jasmine.createSpy('getCurrentUser')
      .and.returnValue(user),
      onUserChange: (callback) => {
        userChangeCallback = callback;
      }
    };
  });

  describe('Controller', () => {
    let ctrl;

    beforeEach(() => {
      ctrl = new User(authService);
    });

    it('should be defined', () => {
      expect(ctrl).toBeDefined();
    });

    describe('.user', () => {
      it('should define a .user property', () => {
        expect(ctrl.user).toBeDefined();
      });

      it('should set .user to the current firebase user', () => {
        expect(ctrl.user).toBe(user);
      });

      it('should set .user to null if the current user is not logged in', () => {
        authService.getCurrentUser.and.returnValue(null);
        ctrl = new User(authService);
        expect(ctrl.user).toBe(null);
      });

      it('should update .user when the firebase user logs in', () => {
        ctrl.user = null;
        userChangeCallback(user);
        expect(ctrl.user).toBe(user);
      });

      it('should update .user to null when the firebase user logs out', () => {
        ctrl.user = user;
        userChangeCallback(null);
        expect(ctrl.user).toBe(null);
      });
    });
  });

  describe('Component', () => {
    let component;
    let compiler;
    let scope;

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('AuthService', authService);
    }));

    beforeEach(inject((CompileService) => {
      scope = {
        myUser: null
      };

      compiler = CompileService;
      component = compiler.compile('<user user="myUser"></user>', scope);
    }));

    it('should set .myUser to the current logged in user', (done) => {
      component.digest(() => expect(component.scope.myUser).toBe(user))
      .digest(done);
    });

    it('should set .myUser to null when the current logged in user logs out', (done) => {
      userChangeCallback(null);
      component.digest(() => expect(component.scope.myUser).toBe(null))
      .digest(done);
    });
  });
});
