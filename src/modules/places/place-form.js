import {Component, Inject} from '../../lib/decorators';
import Place from './place.dto';
import FacilityIcons from '../../config/facility-icons';
import '../../widgets/events/on-submit';

@Component({
  template: require('./place-form.html')
})
@Inject('PlacesService', '$scope')
export default class PlaceForm {
  place = new Place();
  newFacility = '';

  constructor(PlacesService, $scope) {
    this.placesService = PlacesService;
    this.scope = $scope;
  }

  facilities() {
    let values = Object.keys(FacilityIcons);
    return Promise.resolve(values);
  }

  submit() {
    if (this.scope.formCtrl.$invalid) return;

    this.placesService.create(this.place);
  }
}
