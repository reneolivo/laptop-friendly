import Home from './home';

describe('Home component', () => {
  let compiler;
  let component;

  beforeEach(inject((CompileService) => {
    compiler = CompileService;
    component = compiler.compile('<home></home>');
  }));

  it('should define a places component', (done) => {
    component.digest((el) => el.find('places'))
    .digest((el, places) => expect(places.length).toBe(1))
    .digest(done);
  });

  it('should define a place-details component', (done) => {
    component.digest((el) => el.find('place-details'))
    .digest((el, placeDetails) => expect(placeDetails.length).toBe(1))
    .digest(done);
  });

  describe('Viewing place details', () => {
    let place = { name: 'Laptop Café' };

    it('should set .selectedPlace to the selected place', (done) => {
      component.controller((el) => el.find('places'))
      .digest((el, placesCtrl) => placesCtrl.onPlaceSelected({$place: place}))
      .controller((el) => el)
      .digest((el, homeCtrl) => expect(homeCtrl.selectedPlace).toBe(place))
      .digest(done);
    });

    it('should pass .selectedPlace to the place-details component', (done) => {
      component.controller()
      .digest((el, homeCtrl) => homeCtrl.selectedPlace = place)
      .controller((el) => el.find('place-details'))
      .digest((el, placeDetailsCtrl) => expect(placeDetailsCtrl.place).toBe(place))
      .digest(done);
    });
  });

  describe('User authentication', () => {
    let user = { uid: '1234', name: 'Jon Snow' };
    let authService;
    let userChangeCallback;

    beforeEach(inject((AuthService) => {
      authService = AuthService;

      authService.onUserChange = (callback) => {
        userChangeCallback = callback;
      };

      authService.getCurrentUser = () => null;

      component = compiler.compile('<home></home>');
    }));

    it('should include the user component', (done) => {
      component.find('user')
      .digest((el, user) => expect(user.length).toBe(1))
      .digest(done);
    });

    it('should display a login button if the user is not authenticated', (done) => {
      component.digest(() => userChangeCallback(null))
      .find('#home-wrapper > button.login')
      .digest((el, login) => expect(login.length).toBe(1))
      .digest(done);
    });

    it('should not display the login button if the user is authenticated', (done) => {
      component.digest(() => userChangeCallback(user))
      .find('#home-wrapper > button.login')
      .digest((el, login) => expect(login.length).toBe(0))
      .digest(done);
    });

    describe('Login Modal', () => {
      it('should include the login-modal component', (done) => {
        component.find('login-modal')
        .digest((el, loginModal) => expect(loginModal.length).toBe(1))
        .digest(done);
      });

      it('should open the login modal when the login button is clicked', (done) => {
        let loginModalCtrl;

        component.controller((el) => el.find('login-modal'))
        .digest((el, $loginModalCtrl) => {
          loginModalCtrl = $loginModalCtrl;

          spyOn(loginModalCtrl, 'open');
        })
        .click('#home-wrapper > button.login')
        .digest(() => expect(loginModalCtrl.open).toHaveBeenCalled())
        .digest(done);
      });
    });
  });

  describe('Create place modal', () => {
    let user;

    beforeEach(() => {
      user = { name: 'Jon Snow' };

      component.controller()
      .digest((el, ctrl) => ctrl.user = user);
    });

    it('should display a *button.create* if the user is logged in', (done) => {
      component.find('button.create')
      .digest((el, button) => expect(button.length).toBe(1))
      .digest(done);
    });

    it('should not display a *button.create* if the user is not logged in', (done) => {
      component.controller()
      .digest((el, ctrl) => ctrl.user = null)
      .find('button.create')
      .digest((el, button) => expect(button.length).toBe(0))
      .digest(done);
    });

    it('should have a *place-form-modal* component', (done) => {
      component.find('place-form-modal')
      .digest((el, placeFormModal) => since('there should be a place-form-modal component')
      .expect(placeFormModal.length).toBe(1))
      .controller()
      .digest((el, ctrl) => since('should capture the place-form-modal controller')
      .expect(ctrl.placeFormModal).toBeDefined())
      .digest(done);
    });

    it('should open the *place-form-modal* when *button.create* is clicked', (done) => {
      component.controller().digest((el, ctrl) => spyOn(ctrl.placeFormModal, 'open'))
      .click('button.create')
      .controller().digest((el, ctrl) => expect(ctrl.placeFormModal.open).toHaveBeenCalled())
      .digest(done);
    });

    it('should not open the *place-form-modal* if *button.create* is not clicked', (done) => {
      component.controller().digest((el, ctrl) => spyOn(ctrl.placeFormModal, 'open'))
      .digest(() => {})
      .controller().digest((el, ctrl) => expect(ctrl.placeFormModal.open).not.toHaveBeenCalled())
      .digest(done);
    });
  });
});
