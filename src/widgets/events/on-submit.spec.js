import OnSubmit from './on-submit';

describe('on Submit Event', () => {
  let component;
  let compiler;
  let submitSpy;

  beforeEach(inject((CompileService) => {
    compiler = CompileService;
    submitSpy = jasmine.createSpy('submitSpy');
    event = new Event('submit');

    component = compiler.compile(
      `<form name="myForm" on-submit="submit($event)">
        <span class="submitted">{{ myForm.$submitted }}</span>
      </form>`,
      { submit: submitSpy }
    );
  }));

  function submitForm() {
    component.digest((el) => el.trigger('submit'));
  }

  it('should be defined', () => {
    expect(OnSubmit).toBeDefined();
  });

  it('should not execute a command if the form was not submitted', (done) => {
    component.digest(() => expect(submitSpy).not.toHaveBeenCalled())
    .digest(done);
  });

  it('should execute a command on form submit', (done) => {
    submitForm();

    component.digest(() => expect(submitSpy).toHaveBeenCalled())
    .digest(done);
  });

  it('should pass the $event object', (done) => {
    submitForm();


    component.digest(() => submitSpy.calls.argsFor(0)[0])
    .digest((el, event) => expect(event instanceof jQuery.Event).toBe(true))
    .digest(done);
  });

  it('should prevent the default submit action', (done) => {
    submitForm();

    component.digest(() => submitSpy.calls.argsFor(0)[0])
    .digest((el, event) => expect(event.isDefaultPrevented()).toBe(true))
    .digest(done);
  });

  it('should set the form as submitted', (done) => {
    submitForm();

    component.find('.submitted')
    .digest((el, submitted) => expect(submitted.text()).toBe('true'))
    .digest(done);
  });
});
