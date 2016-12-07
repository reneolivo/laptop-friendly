import {Component, State, Inject} from '../../lib/decorators';
import './place-resume';

@Component({
  template: require('./places.html'),
  bindings: {
    onPlaceSelected: '&'
  }
})
@Inject('PlacesService')
export default class Places {
  constructor(PlacesService) {
    this.PlacesService = PlacesService;

    this.loadPlaces();
  }

  loadPlaces() {
    this.places = this.PlacesService.getAll();
  }

  selectPlace(place) {
    this.onPlaceSelected({ $place: place });
  }
}
