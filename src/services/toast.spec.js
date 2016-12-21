import Toast from './toast';

describe('Toast', () => {
  let toast;
  let message;

  beforeEach(() => {
    toast = new Toast();
    message = 'Message in a bottle';
    spyOn(Materialize, 'toast');
  });

  it('should be defined', () => {
    expect(toast).toBeDefined();
  });

  it('should send a success toast', () => {
    expect(typeof toast.success).toBe('function');
    toast.success(message);
    expect(Materialize.toast).toHaveBeenCalledWith(
      message,
      3000,
      'toast-success'
    );
  });

  it('should allow to set the successful toast delay', () => {
    toast.success(message, 10000);
    expect(Materialize.toast).toHaveBeenCalledWith(
      message,
      10000,
      'toast-success'
    );
  });

  it('should send an error toast', () => {
    expect(typeof toast.error).toBe('function');
    toast.error(message);
    expect(Materialize.toast).toHaveBeenCalledWith(
      message,
      3000,
      'toast-error'
    );
  });

  it('should allow to set the error toast delay', () => {
    toast.error(message, 10000);
    expect(Materialize.toast).toHaveBeenCalledWith(
      message,
      10000,
      'toast-error'
    );
  });
});
