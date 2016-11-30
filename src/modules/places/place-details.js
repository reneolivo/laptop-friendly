import {Component, Bind} from '../../lib/decorators';
import FacilityIcons from '../../config/facility-icons';
import '../../images/default-place.png';


@Component({
  template: require('./place-details.html'),
  bindings: {
    place: '='
  }
})
export default class PlaceDetails {
  constructor() {
    this.icons = FacilityIcons;
  }
}
