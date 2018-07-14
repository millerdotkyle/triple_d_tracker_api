'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  visited: [],
  image: {type: String},
  coords: {
    lat: {type: Number},
    lon: {type: Number}
  },
  ratings: []
});

const Location = mongoose.model('location', LocationSchema);

module.exports = {Location};