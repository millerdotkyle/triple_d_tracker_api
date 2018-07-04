'use strict';
const config = require('../config');
const mongoose = require('mongoose');
const {Location} = require('../models/model_locations');

// TODO - Question for Ray.  mongoose.connect() is in server.js alreay. Do I need mongoose.connect() here too?
// mongoose.connect(config.DATABASE_URL);

module.exports = {
  // NOTE: alternate module.export syntax than authController.js exports.signup syntax.
  getAllLocations(req, res, next) {

    Location
      .find()
      .then((locations) => { res.json(locations).status(200); })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', err: err });
      });

  },

  getLocationsByState(req, res, next) {
    let { state } = req.params;
    state = state.toUpperCase();

    Location
      .find({state: state})
      .then((locations) => { res.json(locations).status(200); })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', err: err });
      });
  },

  getLocationsNearme(req, res, next) {
    console.log('locationController getLocationsNearMe req.body = ', req.body);
  }
};
