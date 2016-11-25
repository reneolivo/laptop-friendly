import {Service, Inject} from '../lib/decorators';

@Service('PlacesService')
@Inject('laptopFriendly.data.places')
export default class Places {
  constructor(places) {
    this.places = places;
  }

  getAll() {
    return Promise.resolve(this.places);
  }
}
