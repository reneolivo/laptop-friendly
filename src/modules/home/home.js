import {Component, State} from '../../lib/decorators';
import '../places/places';
import '../places/place-details';
import '../auth/login-modal';
import '../auth/user';

@Component({
  template: require('./home.html')
})
@State({
  name: 'Home',
  url: '/'
})
export default class Home {
  user = null;

  selectPlace(place) {
    this.selectedPlace = place;
  }
}
