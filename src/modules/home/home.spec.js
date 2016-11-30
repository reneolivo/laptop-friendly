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
  });
});
