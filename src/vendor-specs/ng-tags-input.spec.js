describe('Angular Tags Input component', () => {
  let component;
  let compiler;
  let tags;

  beforeEach(inject((CompileService) => {
    compiler = CompileService;
    component = compiler.compile(`<tags-input ng-model="tags"></tags-input>`);

    tags = [ 'Apple', 'Beer', 'Chorizo' ];
    component.digest(() => component.scope.tags = tags);
  }));

  it('should bind a list of tags', (done) => {
    component.find('ti-tag-item span')
    .digest((el, tagsSpan) => expect(tagsSpan.length).toBe(3))
    .digest(done);
  });

  it('should bind each component tag to a corresponding the scope tag', (done) => {
    component.find('ti-tag-item span:eq(0)')
    .digest((el, span) => expect(span.text()).toBe(component.scope.tags[0].text))
    .find('ti-tag-item span:eq(1)')
    .digest((el, span) => expect(span.text()).toBe(component.scope.tags[1].text))
    .find('ti-tag-item span:eq(2)')
    .digest((el, span) => expect(span.text()).toBe(component.scope.tags[2].text))
    .digest(done);
  });

  it('should update the scope tags when adding a new component tag', (done) => {
    component.sendKeys('input', 'Date')
    .sendEnterKey('input')
    .digest(() => expect(component.scope.tags.length).toBe(4))
    .digest(() => expect(component.scope.tags[3].text).toBe('Date'))
    .digest(done);
  });

  describe('Auto complete', () => {
    let component;

    beforeEach(() => {
      component = compiler.compile(
        `<tags-input ng-model="tags" add-from-autocomplete-only="true">
          <auto-complete source="source()"></auto-complete>
        </tags-input>`,
        {
          tags: [],
          source: () => Promise.resolve([{text: 'Apple'}])
        }
      );
    });

    it('should not allow me to input Figs', (done) => {
      component.sendKeys('input', 'Figs')
      .sendEnterKey('input')
      .digest(() => expect(component.scope.tags.length).toBe(0))
      .digest(done);
    });
  });
});
