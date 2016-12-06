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

  describe('selecting places', () => {
    it('should define a .selectPlace method', () => {
      expect(typeof Ctrl.selectPlace).toBe('function');
    });

    it('should call .onPlaceSelected when a place is selected', () => {
      Ctrl.onPlaceSelected = jasmine.createSpy('onPlaceSelected');

      Ctrl.selectPlace(listings[0]);

      expect(Ctrl.onPlaceSelected).toHaveBeenCalledWith({
        $place: listings[0]
      });
    });
  });

  describe('Component', () => {
    let compiler;
    let component;

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
      compiler = CompileService;
      component = compiler.compile('<places></places>');
    }));

    it('should display the two listings', (done) => {
      component.digest((el) => el.find('place-resume'))
      .digest((el, placeResumes) => expect(placeResumes.length).toBe(2))
      .digest(() => done());
    });

    describe('Selecting a place', () => {
      let placeSelected;

      beforeEach(() => {
        placeSelected = jasmine.createSpy('placeSelected');

        component = compiler.compile(`
            <places
            on-place-selected="placeSelected($place)"
            ></places>
          `,
          { placeSelected }
        );
      });

      it('should emit the place that was selected', (done) => {
        component.digest((el) => el.find('article').first().click())
        .digest(() => expect(placeSelected).toHaveBeenCalledWith(listings[0]))
        .digest(done);
      });
    });
  });
});
