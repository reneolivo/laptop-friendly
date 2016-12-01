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
        component.controller((el) => el)
        .digest((el, homeCtrl) => homeCtrl.selectedPlace = place)
        .controller((el) => el.find('place-details'))
        .digest((el, placeDetailsCtrl) => expect(placeDetailsCtrl.place).toBe(place))
        .digest(done);
      });
    });
  });
});
