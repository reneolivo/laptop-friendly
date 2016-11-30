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
  });
});
