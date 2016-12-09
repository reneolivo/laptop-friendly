import Attribute from './attribute';
import Module from '../../module';

describe('Attribute', () => {
  it('should be defined', () => {
    expect(typeof Attribute).toBe('function');
  });

  describe('Setting a class as an attribute directive', () => {
    let directiveName;
    let directiveParamsFn;
    let params;
    let dependency1;
    let dependency2;
    let linkSpy;

    beforeEach(() => {
      spyOn(Module, 'directive').and.callFake((name, paramsFn) => {
        directiveName = name;
        directiveParamsFn = paramsFn;
      });

      linkSpy = jasmine.createSpy('link');

      params = {
        require: 'ngModel'
      };

      @Attribute(params)
      class MyAttribute {
        constructor($dependency1, $dependency2) {
          dependency1 = $dependency1;
          dependency2 = $dependency2;
        }

        link(...args) {
          linkSpy(...args);
        }
      }
    });

    it('should call Module.directive', () => {
      expect(Module.directive).toHaveBeenCalled();
      expect(directiveName).toBe('MyAttribute');
    });

    it('should return a directive function', () => {
      expect(typeof directiveParamsFn).toBe('function');
    });

    describe('Injection', () => {
      it('should set a default $inject property for the class if one is not provided', () => {
        @Attribute(params)
        class MyAttribute {}

        expect(MyAttribute.$inject).toEqual([]);
      });

      it('should not set a default $inject property for the class if one was already provided', () => {
        let inject = ['dependency'];

        @Attribute(params)
        class MyOtherAttribute {
          static $inject = inject;
        }

        expect(MyOtherAttribute.$inject).toBe(inject);
      });

      it('Should set the $inject property of the directive function equal to the class $inject property', () => {
        let inject = ['dependency'];

        @Attribute(params)
        class MyOtherAttribute {
          static $inject = inject;
        }

        expect(directiveParamsFn.$inject).toBe(inject);
      });

      it('should pass the dependencies to MyAttribute constructor', () => {
        let a = {};
        let b = {};

        directiveParamsFn(a, b);

        expect(dependency1).toBe(a);
        expect(dependency2).toBe(b);
      });
    });

    describe('Directive Params', () => {
      let directiveParams;

      beforeEach(() => directiveParams = directiveParamsFn());

      it('should pass the decorator params to the directive function', () => {
        expect(directiveParams).toBe(params);
      });

      it('should restrict the directive as an attribute only', () => {
        expect(directiveParams.restrict).toBe('A');
      });

      describe('Linking function', () => {
        let a = {};
        let b = {};
        let c = {};
        let d = {};
        let e = {};

        it('should call MyAttribute.link', () => {
          directiveParams.link(a, b, c, d);
          expect(linkSpy).toHaveBeenCalledWith(a, b, c, d);
        });

        it('should only call MyAttribute.link with the appropiate params', () => {
          directiveParams.link(a, b, c, d, e);
          expect(linkSpy).toHaveBeenCalledWith(a, b, c, d);
        });
      });
    });
  });
});
