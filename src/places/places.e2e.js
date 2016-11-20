describe('Places', () => {
  it('should exist', () => {
    return browser.get('/')
    .then(() => element(by.css('section#places h1')))
    .then((h1) => expect(h1.getText()).toBe('Hello'));
  });
});
