import {Component, State} from '../lib/decorators';

@Component({
  template: require('./places.html')
})
@State({
  name: 'Home',
  url: '/'
})
export default class Places {
  constructor() {
    this.hello = 'world';
  }
}
