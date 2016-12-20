import {Component, Inject} from '../../lib/decorators';
import Place from './place.dto';

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

  addFacility() {
    if (this.newFacility == false) return;

    this.place.facilities.push(this.newFacility);
    this.newFacility = '';
  }

  submit() {
    if (this.scope.formCtrl.$invalid) return;

    this.placesService.create(this.place);
  }
}
