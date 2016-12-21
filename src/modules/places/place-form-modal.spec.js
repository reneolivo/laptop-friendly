import PlaceFormModal from './place-form-modal';

describe('Place Form Modal', () => {
  let component;
  let compiler;
  let placeFormCtrl;
  let modalCtrl;
  let placesService;

  beforeEach(angular.mock.module(($provide) => {
    placesService = {
      create: jasmine.createSpy('create')
      .and.returnValue(Promise.resolve())
    };

    $provide.value('PlacesService', placesService);
  }));

  beforeEach(inject((CompileService) => {
    compiler = CompileService;

    createComponent();
    attachSpies();
  }));

  function createComponent(controllerName = false) {
    let tag = controllerName ?
      `<place-form-modal controller="${controllerName}"></place-form-modal>`: '<place-form-modal></place-form-modal>';

    component = compiler.compile(tag);

    component.controller((el) => el.find('modal'))
    .digest((el, ctrl) => modalCtrl = ctrl)
    .controller((el) => el.find('place-form'))
    .digest((el, ctrl) => placeFormCtrl = ctrl)
    .digest((el) => el.find('place-form form[name=formCtrl]').scope())
    .digest((el, ctrl) => {
      ctrl.formCtrl.$valid = true;
      ctrl.formCtrl.$invalid = false;
    });
  }

  function attachSpies() {
    component.digest(() => {
      spyOn(modalCtrl, 'open');
      spyOn(modalCtrl, 'close');
      spyOn(placeFormCtrl, 'submit');
    });
  }

  it('should be defined', () => {
    expect(typeof PlaceFormModal).toBe('function');
  });

  it('should have a *modal* component', (done) => {
    component.find('modal', (modal) => {
      expect(modal.length).toBe(1);
      done();
    });
  });

  it('should have a *place-form* component inside the *modal-content*', (done) => {
    component.find('modal-content place-form', (placeForm) => {
      expect(placeForm.length).toBe(1);
      done();
    });
  });

  it('should call the .submit() method of place-form when the submit button is clicked', (done) => {
    component.find('modal-footer button.save', (button) => {
      since('there should be a *button.save* element inside *modal-footer*')
      .expect(button.length).toBe(1);
    })
    .click('modal-footer button.save')
    .digest(() => expect(placeFormCtrl.submit).toHaveBeenCalled())
    .digest(done);
  });

  it('should close the modal when the close button is clicked', (done) => {
    component.find('modal-footer button.close')
    .digest((el, close) => {
      since('there should be a *button.close* inside *modal-footer*')
      .expect(close.length).toBe(1);
    })
    .click('modal-footer button.close')
    .digest(() => expect(modalCtrl.close).toHaveBeenCalled())
    .digest(done);
  });

  it('should close the modal after the form has been submitted successfuly', (done) => {
    createComponent();

    component.digest(() => spyOn(modalCtrl, 'close'))
    .digest(() => placeFormCtrl.submit())
    .digest(() => expect(modalCtrl.close).toHaveBeenCalled())
    .digest(done);
  });

  it('should not close the modal if the submission was not successful', (done) => {
    createComponent();

    component.digest(() => placesService.create.and.returnValue(Promise.reject()))
    .digest(() => spyOn(modalCtrl, 'close'))
    .digest(() => placeFormCtrl.submit())
    .digest(() => expect(modalCtrl.close).not.toHaveBeenCalled())
    .digest(done);
  });

  it('should bind itself to a controller property', (done) => {
    createComponent('placeFormModalCtrl');

    component.digest((el, ctrl) => since('*placeFormModalCtrl* should equal to the component controller')
    .expect(component.scope.placeFormModalCtrl).toBeDefined())
    .digest(done);
  });

  it('should not bind itself to a controller property if the property is not defined', (done) => {
    createComponent();

    component.digest((el, ctrl) => since('*placeFormModalCtrl* should equal to the component controller')
    .expect(component.scope.placeFormModalCtrl).not.toBeDefined())
    .digest(done);
  });

  it('should define an .open() method', (done) => {
    createComponent('placeFormModalCtrl');
    attachSpies();

    component.controller().digest((el, ctrl) => expect(typeof ctrl.open).toBe('function'))
    .controller().digest((el, ctrl) => ctrl.open && ctrl.open())
    .digest(() => expect(modalCtrl.open).toHaveBeenCalled())
    .digest(done);
  });

  it('should define a .close() method', (done) => {
    createComponent('placeFormModalCtrl');
    attachSpies();

    component.controller().digest((el, ctrl) => expect(typeof ctrl.close).toBe('function'))
    .controller().digest((el, ctrl) => ctrl.close && ctrl.close())
    .digest(() => expect(modalCtrl.close).toHaveBeenCalled())
    .digest(done);
  });

  it('should define a .submit() method', (done) => {
    createComponent('placeFormModalCtrl');
    attachSpies();

    component.controller().digest((el, ctrl) => expect(typeof ctrl.submit).toBe('function'))
    .controller().digest((el, ctrl) => ctrl.submit && ctrl.submit())
    .digest(() => expect(placeFormCtrl.submit).toHaveBeenCalled())
    .digest(done);
  });
});
