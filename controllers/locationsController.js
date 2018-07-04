'use strict';
const config = require('../config');
const mongoose = require('mongoose');
const {Location} = require('../models/model_locations');

mongoose.connect(config.DATABASE_URL);

module.exports = {
  // NOTE: alternate module.export syntax than authController.js exports.signup syntax.
  getAllLocations(req, res, next) {
    console.log('locationController getAllLocations req.body = ', req.body);
    Location
      .find()
      .then((locations) => { res.json(locations).status(200); })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', err: err });
      });

  },

  getLocationsByState(req, res, next) {
    const state = req.params;
    console.log('locationController getLocationsByState req.body = ', req.body);
    console.log('locationController getLocationsByState req.params = ', req.params);
  },

  getLocationsNearme(req, res, next) {
    console.log('locationController getLocationsNearMe req.body = ', req.body);
  }
};
