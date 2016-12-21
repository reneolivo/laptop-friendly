import {Component, Inject} from '../../lib/decorators';
import Place from './place.dto';
import FacilityIcons from '../../config/facility-icons';
import '../../widgets/events/on-submit';

@Component({
  template: require('./place-form.html'),
  bindings: {
    onSubmitSuccess: '&'
  }
})
@Inject('PlacesService', '$scope')
export default class PlaceForm {
  place = new Place();
  newFacility = '';

  constructor(PlacesService, $scope, toast) {
    this.placesService = PlacesService;
    this.scope = $scope;
    this.toast = toast;
  }

  facilities() {
    let values = Object.keys(FacilityIcons);
    return Promise.resolve(values);
  }

  submit() {
    if (this.scope.formCtrl.$invalid) return;

    this.placesService.create(this.place).then((place) => {
      this.toast.success('Place created successfuly');

      this.onSubmitSuccess({$place: place});
    });
  }
}
