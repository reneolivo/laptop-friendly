import {Component, State} from '../../lib/decorators';
import '../places/places';
import '../places/place-details';

@Component({
  template: require('./home.html')
})
@State({
  name: 'Home',
  url: '/'
})
export default class Home {
  selectPlace(place) {
    this.selectedPlace = place;
  }
}
