import PlaceDetails from './place-resume';
import FacilityIcons from '../../config/facility-icons';

describe('PlaceDetails', () => {
  describe('Component', () => {
    let compiler;
    let component;
    let place = {
      name: 'Laptop Café',
      address: 'Around the corner',
      images: [
        { src: 'https://www.example.com/images/1.jpg' },
        { src: 'https://www.example.com/images/2.jpg' }
      ],
      facilities: [
        'free-wifi',
        'coffee',
        'lunch-menu',
        'opens-late'
      ]
    };

    beforeEach(inject((CompileService) => {
      compiler = CompileService;
      component = compiler.compile(
        '<place-resume place="place"></place-resume>',
        { place: place }
      );
    }));

    it('should display the place name', (done) => {
      component.digest((el) => el.find('h3').text())
      .digest((el, text) => expect(text).toBe(place.name))
      .digest(done);
    });

    it('should display their address', (done) => {
      component.digest((el) => el.find('address').text())
      .digest((el, text) => expect(text).toBe(place.address))
      .digest(done);
    });

    it('should display the first three facilities for the place', (done) => {
      component.digest((el) => el.find('.facilities i'))
      .digest((el, facilities) => expect(facilities.length).toBe(3))
      .digest(done);
    });

    it('should map to a font-awesome icon for each facility', (done) => {
      function hasIconClass(n) {
        const iconClass = FacilityIcons[ place.facilities[ n ] ];
        const errorMessage = `Expected icon to have class ${iconClass}`;

        component.digest((el) => el.find(`.facilities i:eq(${n})`))
        .digest((el, icon) => icon.hasClass(iconClass))
        .digest((el, hasClass) => {
          since(errorMessage)
          .expect(hasClass)
          .toBe(true);
        });
      }

      hasIconClass(0);
      hasIconClass(1);
      hasIconClass(2);

      component.digest(done);
    });

    it('should display the first image of the place', (done) => {
      component.digest((el) => el.find('img'))
      .digest((el, img) => img.attr('src'))
      .digest((el, src) => expect(src).toBe(place.images[0].src))
      .digest(done);
    });

    it('should display a default image if no images are defined', (done) => {
      place.images = [];

      compiler.compile(
        '<place-resume place="place"></place-resume>',
        { place: place }
      )
      .digest((el) => el.find('img').attr('src'))
      .digest((el, src) => expect(src).toContain('images/default-place.png'))
      .digest(done);
    });
  });
});
