import Data from '../data';

class Places {
  getAll() {
    const places = Data.places();
    return Promise.resolve(places);
  }
}

export default new Places();
