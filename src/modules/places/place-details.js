import {Component} from '../../lib/decorators';
import FacilityIcons from '../../config/facility-icons';


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
