import Places from './places';
import Data from '../data';

describe('Places Service', () => {
  const listings = [
    {
      name: 'Place 1'
    },
    {
      name: 'Place 2'
    }
  ];

  beforeEach(() => {
    spyOn(Data, 'places').and.returnValue(listings);
  });

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
