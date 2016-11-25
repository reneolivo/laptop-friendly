describe('Places', () => {
  it('should display a list of places', () => {
    return browser.get('/')
    .then(() => element.all(by.css('#places-listing article')).count())
    .then((count) => expect(count).toBe(8));
  });

  it('should display a place details when clicked', () => {
    return browser.get('/')
    .then(() => element(by.css('#places-listing article:first-child')).click())
    .then(() => element(by.css('#place-details h2')).getText())
    .then((text) => expect(text).toBe('Listing 1'));
  });
});
