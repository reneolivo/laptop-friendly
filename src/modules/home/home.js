import {Component, State} from '../../lib/decorators';
import '../auth/login-modal';
import '../auth/user';
import '../places/places';
import '../places/place-details';
import '../places/place-form';

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
