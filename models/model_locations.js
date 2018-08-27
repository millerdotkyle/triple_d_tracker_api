'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// for mongoose $geoNear().
const PointSchema = new Schema({
  type: {type: String, default: 'Point'},
  coordinates: {type: [Number], index: '2dsphere'}
});

const LocationSchema = new Schema({
  poiType: {type: String},
  name: {type: String, required: true},
  addrFull: {type: String},
  addr: {type: String},
  city: {type: String},
  state: {type: String},
  phone: {type: String},
  about: {type: String},
  cuisine: [String],
  outOfBusiness: {type: Boolean},
  visited: {type: Boolean},
  image: {type: String},
  coords: {
    lat: {type: Number},
    lon: {type: Number}
  },
  // for mongoose $geoNear(),
  geometry: PointSchema,
  // TODO - future dev - add ratings for a User's Review.
  // User gets ONE and only ONE vote per Location, regardless of the number
  // of Reviews he may write for a single Location.
  ratings: []
});

const Location = mongoose.model('location', LocationSchema);

module.exports = {Location};