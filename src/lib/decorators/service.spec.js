import Module from '../../module';
import Service from './service';

describe('Service Decorator', () => {
  it('should be defined', () => {
    expect(Service).toBeDefined();
  });

  it('should set the class as a service', () => {
    spyOn(Module, 'service');

    @Service
    class MyService {}

    expect(Module.service).toHaveBeenCalledWith(
      'MyService',
      MyService
    );
  });

  it('should set the name of the service', () => {
    spyOn(Module, 'service');


    @Service('newService')
    class MyService {}

    expect(Module.service).toHaveBeenCalledWith(
      'newService',
      MyService
    );
  });
});
