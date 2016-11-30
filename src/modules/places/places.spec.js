import Places from './places';


describe('Places', () => {
  let PlacesService;
  let Ctrl;
  let listings = [
    { name: 'Place 1' },
    { name: 'Place 2' }
  ];

  beforeEach(() => {
    PlacesService = {
      getAll: () => Promise.resolve(listings)
    };

    Ctrl = new Places(PlacesService);
  });

  it('should be defined', () => {
    expect(Ctrl).toBeDefined();
  });

  it('should load a list of places', (done) => {
    setTimeout(() => {
      expect(Ctrl.places).toBe(listings);
      done();
    }, 0);
  });

  describe('Component', () => {
    let compile;

    const listings = [
      {
        name: 'Place 1'
      },
      {
        name: 'Place 2'
      }
    ];

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('laptopFriendly.data.places', listings);
    }));

    beforeEach(inject((CompileService) => {
      compile = CompileService;
    }));

    it('should display the two listings', (done) => {
      compile.compile('<places></places>')
      .digest((el) => expect(el.find('place-details').length).toBe(2))
      .digest(() => done());
    });
  });
});
