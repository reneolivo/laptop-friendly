import FireBase from 'firebase';
import GeoFire from 'geofire';

import config from '../config/firebase';

FireBase.initializeApp(config);

const fire = FireBase.database().ref().push();
const geoFire = new GeoFire(fire);

class FireBaseService {
  database(name) {
    return fire.root.child(name);
  }
};

const service = new FireBaseService();

export default service;
