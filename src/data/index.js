const placesFiles = require.context("./places", true, /\.json$/);
const places = placesFiles.keys().map(placesFiles);

export default {
  places: () => places
};
