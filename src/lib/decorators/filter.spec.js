import Filter from './filter';
import Module from '../../module';

describe('Filter decorator', () => {
  it('should be defined', () => {
    expect(typeof Filter).toBe('function');
  });

  describe('Setting a class as a filter', () => {
    let filter;
    let dependency1;
    let dependency2;
    let input;
    let find;
    let replace;
    let transformSpy;

    beforeEach(() => {
      spyOn(Module, 'filter').and.callFake(($name, $filter) => {
        filter = $filter;
      });

      transformSpy = jasmine.createSpy('transformSpy');

      @Filter
      class Replace {
        constructor($dependency1, $dependency2) {
          dependency1 = $dependency1;
          dependency2 = $dependency2;
        }

        transform($input, $find, $replace) {
          transformSpy();
          input = $input;
          find = $find;
          replace = $replace;
        }
      }
    });

    it('should create a Replace filter', () => {
      expect(Module.filter).toHaveBeenCalled();
      expect(Module.filter.calls.argsFor(0)[0]).toBe('Replace');
    });

    it('should provide a $inject array if none are found', () => {
      @Filter
      class InjectMe {}

      expect(InjectMe.$inject).toEqual([]);
    });

    it('should not provide a $inject array if one is provided', () => {
      let injectables = ['test'];

      @Filter
      class InjectMe {
        static $inject = injectables;
      }

      expect(InjectMe.$inject).toBe(injectables);
    });

    it('should pass a filter function', () => {
      expect(typeof filter).toBe('function');
    });

    it('should set the $inject variable to the new filter function from the original target', () => {
      @Filter
      class InjectMe {}

      expect(filter.$inject).toEqual(InjectMe.$inject);
    });

    it('should pass the dependencies to the constructor', () => {
      let a = {};
      let b = {};

      filter(a, b);

      expect(dependency1).toBe(a);
      expect(dependency2).toBe(b);
    });

    it('should return a transform function', () => {
      let transform = filter();
      expect(typeof transform).toBe('function');
    });

    it('should call Replace.transform', () => {
      let transform = filter();
      transform();
      expect(transformSpy).toHaveBeenCalled();
    });

    it('should only call Replace.transform from within the transform fn', () => {
      let transform = filter();
      expect(transformSpy).not.toHaveBeenCalled();
    });

    it('should pass all relevant params to Replace.transform', () => {
      let a = {};
      let b = {};
      let c = {};
      let transform = filter();
      transform(a, b, c);
      expect(input).toBe(a);
      expect(find).toBe(b);
      expect(replace).toBe(c);
    });
  });
});
