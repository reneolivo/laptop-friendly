import {Component, State, Inject} from '../lib/decorators';

@Component({
  template: require('./places.html')
})
@State({
  name: 'Home',
  url: '/'
})
@Inject('PlacesService')
export default class Places {
  constructor(PlacesService) {
    this.PlacesService = PlacesService;

    this.loadPlaces();
  }

  loadPlaces() {
    this.PlacesService.getAll().then((places) => {
      this.places = places;
    });
  }
}
