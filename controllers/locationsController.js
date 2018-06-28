'use strict';
const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.DATABASE_URL);

exports.getAllLocations = (req, res) => {
  console.log('locationController getAllLocations req.body = ', req.body);
};

exports.getLocationsByState = (req, res) => {
  const state = req.params;
  console.log('locationController getLocationsByState req.body = ', req.body);
  console.log('locationController getLocationsByState req.params = ', req.params);
};

exports.getLocationsNearMe = (req, res) => {
  console.log('locationController getLocationsNearMe req.body = ', req.body);
};