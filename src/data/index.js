import 'angular';

const placesFiles = require.context("./places", true, /\.json$/);
const places = placesFiles.keys().map(placesFiles);

angular.module('laptopFriendly.data', [])
.value('laptopFriendly.data.places', places);
