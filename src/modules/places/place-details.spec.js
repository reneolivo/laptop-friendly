import './place-details';
import FacilityIcons from '../../config/facility-icons';


describe('Place Details component', () => {
  describe('component', () => {
    let compiler;
    let component;
    let place = {
      name: 'Laptop Café',
      address: 'Around the corner',
      mapUrl: 'https://www.example.com/map',
      images: [
        { src: 'https://www.example.com/images/1.jpg' },
        { src: 'https://www.example.com/images/2.jpg' }
      ],
      facilities: [
        'Free Wifi',
        'Coffee',
        'Lunch Menu',
        'Opens Late'
      ],
      description:
        `<p>Laptop Café is a nice place to user your
        laptop and drink a cup of coffee</p>`
    };

    beforeEach(inject((CompileService) => {
      compiler = CompileService;
      component = compiler.compile(
        '<place-details place="place"></place-details>',
        { place: place }
      );
    }));

    it('should display the place details element if a place is provided', (done) => {
      component.digest((el) => el.find('#place-details'))
      .digest((el, placeDetails) => expect(placeDetails.length).toBe(1))
      .digest(done);
    });

    it('should not display the place details element if a place is not provided', (done) => {
      compiler.compile('<place-details></place-details>')
      .digest((el) => el.find('#place-details'))
      .digest((el, placeDetails) => expect(placeDetails.length).toBe(0))
      .digest(done);
    });

    it('should display the place name', (done) => {
      component.digest((el) => el.find('h2').text())
      .digest((el, text) => expect(text).toBe(place.name))
      .digest(done);
    });

    it('should display a map iframe', (done) => {
      component.digest((el) => el.find('iframe'))
      .digest((el, iframe) => expect(iframe.length).toBe(1))
      .digest((el) => el.find('iframe').attr('src'))
      .digest((el, src) => expect(src).toBe(place.mapUrl))
      .digest(done);
    });

    it('should display an address', (done) => {
      component.digest((el) => el.find('address').text())
      .digest((el, text) => expect(text).toBe(place.address))
      .digest(done);
    });

    it('should display a list of facilities', (done) => {
      component.digest((el) => el.find('ul.facilities li'))
      .digest((el, li) => expect(li.length).toBe(place.facilities.length))
      .digest(done);
    });

    it('should display an icon and a description for each facility', (done) => {
      function checkIconAndText(n) {
        const iconClass = FacilityIcons[ place.facilities[ n ] ];
        const facilityText = place.facilities[ n ];
        let facility;

        component.digest((el) => facility = el.find(`ul.facilities li:eq(${n})`))
        .digest(() => facility.find('i.fa').hasClass(iconClass))
        .digest((el, hasClass) => expect(hasClass).toBe(true))
        .digest(() => facility.find('span').text())
        .digest((el, text) => expect(text).toBe(facilityText))
      }

      place.facilities
      .forEach((f, i) => checkIconAndText(i));

      component.digest(done);
    });

    it('should display the place description', (done) => {
      component.digest((el) => el.find('.description').html())
      .digest((el, html) => expect(html).toBe(place.description))
      .digest(done);
    });
  });
});
