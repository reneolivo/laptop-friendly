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
      getAll: () => listings
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

    let listings = [
      {
        name: 'Place 1'
      },
      {
        name: 'Place 2'
      }
    ];

    beforeEach(angular.mock.module(($provide) => {
      PlacesService = {
        getAll: jasmine.createSpy('getAll').and.returnValue(listings)
      };

      $provide.value('PlacesService', PlacesService);
    }));

    beforeEach(inject((CompileService) => {
      compiler = CompileService;
      component = compiler.compile('<places></places>');
    }));

    describe('Displaying listings', () => {
      it('should display the two listings', (done) => {
        expectPlacesResumeToEqual(component, 2, done);
      });

      it('should not display any listings if listings are empty', (done) => {
        PlacesService.getAll = () => [];
        component = compiler.compile('<places></places>')

        expectPlacesResumeToEqual(component, 0, done);
      });

      it('should not display more than 15 listings at a time', (done) => {
        listings = Array.from(new Array(100)).map((a, i) => ({ name: `Place ${i}`}));
        PlacesService.getAll = () => listings;
        component = compiler.compile('<places></places>')

        expectPlacesResumeToEqual(component, 15, done);
      });

      function expectPlacesResumeToEqual(component, number, done) {
        component.digest((el) => el.find('place-resume'))
        .digest((el, placeResumes) => expect(placeResumes.length).toBe(number))
        .digest(done);
      }
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
