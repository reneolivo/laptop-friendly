import ShowIfInvalid from './show-if-invalid';

describe('Show If Invalid attribute', () => {
  let ctrl;
  let element;
  let scope;
  let form;

  beforeEach(inject(($rootScope, $compile, $animate) => {
    initLinkAttributes();
    initDirective();

    function initLinkAttributes() {
      setScope();
      setElement();
      setController();
    }

    function setScope() {
      scope = $rootScope.$new();
      scope.inputName = "username";
    }

    function setElement() {
      element = jQuery('<span class="error">Username Error</span>');
      element.appendTo('body');
    }

    function setController() {
      let formScope = $rootScope.$new();

      $compile(`
        <form name="login">
          <input name="username" ng-model="username" required />
        </form>
      `)(formScope);

      form = formScope.login;
    }

    function initDirective() {
      ctrl = new ShowIfInvalid($animate);
      ctrl.scope = scope;
      ctrl.element = element;
      ctrl.controller = form;
    }
  }));

  function expectElementToBeHidden() {
    expect(jQuery('body .error').length).toBe(0);
  }

  function expectElementToBeVisible() {
    expect(jQuery('body .error').length).toBe(1);
  }

  it('should be defined', () => {
    expect(ctrl).toBeDefined();
  });

  it('should define a .link() method', () => {
    expect(typeof ctrl.link).toBe('function');
  });

  describe('initial state', () => {
    beforeEach(() => ctrl.link());

    it('should hide the element at first', () => {
      expectElementToBeHidden();
    });
  });

  describe('When will the element be shown?', () => {
    beforeEach(() => ctrl.link());

    it('should be shown when the form input has errors and has been touched', () => {
      form.username.$setValidity('required', false);
      form.username.$setTouched();

      scope.$digest();

      expectElementToBeVisible();
    });

    it('should be hidden when the form input has erros but has not been touched', () => {
      form.username.$setValidity('required', false);
      form.username.$setUntouched();

      scope.$digest();

      expectElementToBeHidden();
    });

    it('should be hidden when the form input has no errors', () => {
      form.username.$setValidity('required', true);
      form.username.$setTouched();

      scope.$digest();

      expectElementToBeHidden();
    });

    it('should be hidden when the form input was invalid, but then it was fixed', () => {
      form.username.$setValidity('required', false);
      form.username.$setTouched();

      scope.$digest();

      expectElementToBeVisible();

      form.username.$setValidity('required', true);
      scope.$digest();

      expectElementToBeHidden();
    });

    it('should be shown when the form input has errors and is untouched, but the form has been submitted', () => {
      form.username.$setValidity('required', false);
      form.username.$setUntouched();
      form.$setSubmitted();

      scope.$digest();

      expectElementToBeVisible();
    });

    it('should be hidden when the form input has errors and is untouched, but the form has not been submitted', () => {
      form.username.$setValidity('required', false);
      form.username.$setUntouched();
      form.$setPristine();

      scope.$digest();

      expectElementToBeHidden();
    });
  });
});
