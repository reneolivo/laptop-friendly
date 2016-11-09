import {Component} from '../decorators';

@Component({
  template: require('./places.html')
})
export default class Places {
  constructor() {
    this.hello = 'world';
  }
}
