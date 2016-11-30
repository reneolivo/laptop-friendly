import {Component, State} from '../../lib/decorators';
import '../places/places';

@Component({
  template: require('./home.html')
})
@State({
  name: 'Home',
  url: '/'
})
export default class Home {

}
