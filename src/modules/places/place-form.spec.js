import PlaceForm from './place-form';
import Place from './place.dto';
import FacilityIcons from '../../config/facility-icons';

describe('PlaceForm', () => {
  it('should be defined', () => {
    expect(typeof PlaceForm).toBe('function');
  });

  describe('controller', () => {
    let ctrl;
    let PlaceService;
    let formCtrl;

    beforeEach(inject(($rootScope, $compile) => {
      PlaceService = {
          create: jasmine.createSpy('create')
      };

      let $scope = createScopeAndFormCtrl($rootScope, $compile);

      ctrl = new PlaceForm(PlaceService, $scope);
    }));

    function createScopeAndFormCtrl($rootScope, $compile) {
      let $scope = $rootScope.$new();
      $compile(`<form name="formCtrl"></form>`)($scope);
      formCtrl = $scope.formCtrl;
      return $scope;
    }

    it('should define a .place property', () => {
      since('Ctrl.place should be an instance of Place')
      .expect(ctrl.place instanceof Place).toBe(true);
    });

    describe('facilities list', () => {
      it('should define a .facilities() method', () => {
        expect(typeof ctrl.facilities).toBe('function');
      });

      it('should return a promise', () => {
        let result = ctrl.facilities();
        expect(result instanceof Promise).toBe(true);
      });

      it('should return an array of facilities', (done) => {
        ctrl.facilities()
        .then((results) => {
          let facilities = Object.keys(FacilityIcons);

          expect(results).toEqual(facilities);
        });

        setTimeout(() => done());
      });
    });

    describe('creating a new place', () => {
      it('should define a .submit method', () => {
        since('Ctrl.submit should be a method')
        .expect(typeof ctrl.submit).toBe('function');
      });

      it('should call PlaceService.create', () => {
        ctrl.submit();
        expect(PlaceService.create).toHaveBeenCalledWith(ctrl.place);
      });

      it('should not call PlaceService.create if the place is not valid', () => {
        formCtrl.$setValidity('required', false);
        ctrl.submit();
        expect(PlaceService.create).not.toHaveBeenCalled();
      });
    });
  });

  describe('bindings', () => {
    let compiler;
    let component;
    let ctrl;

    beforeEach(inject((CompileService) => {
      compiler = CompileService;
      component = compiler.compile(`<place-form></place-form>`);

      component.controller().digest((el, $ctrl) => ctrl = $ctrl);
    }));

    function expectInputToBeDefined(inputPath) {
      component.find(inputPath)
      .digest((el, input) => {
        since(`input ${inputPath} should be defined`)
        .expect(input.length).toBe(1);
      });
    }

    function expectInputAndPlaceFieldToHaveSameValue(inputPath, placeField, value) {
      component.sendKeys(inputPath, value)
      .digest(() => expect(ctrl.place[ placeField ]).toBe(value));
    }

    it('should bind the .place.name property', (done) => {
      expectInputToBeDefined('input[name=name]');
      expectInputAndPlaceFieldToHaveSameValue(
        'input[name=name]',
        'name',
        'Fun Cafe'
      );
      component.digest(done);
    });

    it('should bind the place.address property', (done) => {
      expectInputToBeDefined('input[name=address]');
      expectInputAndPlaceFieldToHaveSameValue(
        'input[name=address]',
        'address',
        'New Street 123'
      );
      component.digest(done);
    });

    it('should bind the place.description property', (done) => {
      expectInputToBeDefined('textarea[name=description]');
      expectInputAndPlaceFieldToHaveSameValue(
        'textarea[name=description]',
        'description',
        'A nice place to use your laptop'
      );
      component.digest(done);
    });

    describe('Facilities', () => {
      let ctrl;

      beforeEach(() => {
        component.controller().digest((el, $ctrl) => {
          ctrl = $ctrl;
          ctrl.place.name = 'Jon dies';
          ctrl.place.facilities = [
            'Free Wifi',
            'Opens Late',
            'Coffee'
          ];
        });

      });

      it('should bind the place.facilities property', (done) => {
        component.find('tags-input[ng-model="$ctrl.place.facilities"]')
        .digest((el, input) => expect(input.length).toBe(1))
        .digest(done);
      });

      it('should source the the tags-input using the facilities list', (done) => {
        component.find('tags-input auto-complete[source="$ctrl.facilities()"]')
        .digest((el, source) => expect(source.length).toBe(1))
        .digest(done);
      });
    });

    describe('Saving the place', () => {
      it('should define a .save button', (done) => {
        component.find('button.save')
        .digest((el, button) => expect(button.length).toBe(1))
        .digest(done);
      });

      it('should call .submit() when submiting the form', (done) => {
        component.digest(() => spyOn(ctrl, 'submit'))
        .find('form')
        .digest((el, form) => form.trigger('submit'))
        .digest(() => expect(ctrl.submit).toHaveBeenCalled())
        .digest(done);
      });
    });

  });
});
