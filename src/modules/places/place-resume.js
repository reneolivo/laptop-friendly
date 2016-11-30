import {Component, Bind} from '../../lib/decorators';
import FacilityIcons from '../../config/facility-icons';
import '../../images/default-place.png';


@Component({
  template: require('./place-resume.html'),
  bindings: {
    place: '='
  }
})
export default class PlaceResume {
  constructor() {
    this.icons = FacilityIcons;
  }
}
