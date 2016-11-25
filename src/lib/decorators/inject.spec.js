import Inject from './inject';

describe('Inject Decorator', () => {
  it('should inject one dependency', () => {
    @Inject('one')
    class MyClass {}

    expect(MyClass.$inject).toEqual(['one']);
  });

  it('should inject multiple dependencies', () => {
    @Inject('one', 'two', 'three')
    class MyClass {}

    expect(MyClass.$inject).toEqual(['one', 'two', 'three']);
  });

  it('should accept arrays as dependencies', () => {
    @Inject(['A', 'B', 'C'])
    class MyClass {}

    expect(MyClass.$inject).toEqual(['A', 'B', 'C']);
  });
});
