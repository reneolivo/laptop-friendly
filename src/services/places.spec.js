import './places';

describe('Places Service', () => {
  let Places;
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

  beforeEach(inject((PlacesService) => {
    Places = PlacesService;
  }));

  describe('Get All', () => {
    it('should define a .getAll method', () => {
      expect(typeof Places.getAll).toBe('function');
    });

    it('should return a promise', () => {
      const result = Places.getAll();
      expect(result instanceof Promise).toBe(true);
    });

    it('should return Place 1 and Place 2', (done) => {
      Places.getAll()
      .then((places) => expect(places).toBe(listings))
      .then(() => done());
    });
  });
});
