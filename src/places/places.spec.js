import Places from './places';

describe('Places', () => {
  let $componentController;

  beforeEach(inject((_$componentController_, _$injector_) => {
    $componentController = _$componentController_;
  }));

  it('should be defined', () => {
    const ctrl = $componentController('places');
    expect(ctrl.hello).toBe('world');
  });
});
