import Places from './places';
import FireBase from './firebase';

describe('Places Service', () => {
  let Ctrl;
  let spy;
  let $firebaseArray;
  let $firebase;

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

    Ctrl = new Places($firebaseArray, $firebase);
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

  describe('Create', () => {
    let place;
    let promise;

    beforeEach(() => {
      place = { name: 'A fun Cafe' };
      promise = Promise.resolve(place);
      spyOn(listings, 'push').and.returnValue(promise);
    });

    it('should define a .create() method', () => {
      expect(typeof Ctrl.create).toBe('function');
    });

    it('should create a new place on firebase', () => {
      let place = {name: 'Some Place'};
      Ctrl.create(place);
      expect(listings.push).toHaveBeenCalledWith(place);
    });

    it('should return a promise', () => {
      let result = Ctrl.create(place);
      expect(result).toBe(promise);
    });
  });
});
