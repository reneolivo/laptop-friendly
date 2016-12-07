import Places from './places';
import FireBase from './firebase';

describe('Places Service', () => {
  let Ctrl;
  let spy;
  let $firebaseArray;

  const listings = [
    {
      name: 'Place 1'
    },
    {
      name: 'Place 2'
    }
  ];

  beforeEach(() => {
    spyOn(FireBase, 'database').and.returnValue(listings);
    $firebaseArray = jasmine.createSpy('$firebaseArray')
    .and.returnValue({array: listings});

    Ctrl = new Places($firebaseArray);
  });

  describe('init', () => {
    it('should define a places database', () => {
      expect(FireBase.database).toHaveBeenCalledWith('places');
    });
  });

  describe('Get All', () => {
    it('should define a .getAll method', () => {
      expect(typeof Ctrl.getAll).toBe('function');
    });

    it('should return Place 1 and Place 2', () => {
      const result = Ctrl.getAll();

      expect(result).toEqual({array: listings});
      expect($firebaseArray).toHaveBeenCalledWith(listings);
    });
  });
});
