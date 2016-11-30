import {Component, State, Inject} from '../../lib/decorators';
import './place-details';

@Component({
  template: require('./places.html')
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
