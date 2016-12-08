import Home from './home';

describe('Home component', () => {
  describe('Component', () => {
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
      let authService;
      let user = { uid: '1234', name: 'Jon Snow' };
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
          .click('button.login')
          .digest(() => expect(loginModalCtrl.open).toHaveBeenCalled())
          .digest(done);
        });
      });
    });
  });
});
