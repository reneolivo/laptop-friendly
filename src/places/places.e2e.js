describe('Places', () => {
  it('should exist', () => {
    return browser.get('/')
    .then(() => element(by.css('section#places h2')))
    .then((h2) => expect(h2.getText()).toBe('Hello'));
  });
});
