import {Service, Inject} from '../lib/decorators';
import FireBase from './firebase';


@Service('PlacesService')
@Inject('$firebaseArray')
export default class Places {
  constructor($firebaseArray) {
    this.$firebaseArray = $firebaseArray;
    this.db = FireBase.database('places');
  }

  getAll() {
    return this.$firebaseArray(this.db);
  }

  create(place) {
    return this.db.push(place);
  }
}
