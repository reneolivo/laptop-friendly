import Module from '../../module';
import Component from './component';

describe('Component decorator', () => {
  beforeEach(() => {
    spyOn(Module, 'component');
  });

  it('should create a new component', () => {
    @Component({
      template: 'Hello'
    })
    class MyClass {}

    expect(Module.component).toHaveBeenCalledWith(
      'myClass',
      {
        template: 'Hello',
        controller: MyClass
      }
    );
  });

  it('should be able to specifiy the component name', () => {
    @Component({
      name: 'myComponentName',
      template: 'Hello'
    })
    class MyClass {}

    expect(Module.component).toHaveBeenCalledWith(
      'myComponentName',
      {
        template: 'Hello',
        controller: MyClass
      }
    );
  });
});
