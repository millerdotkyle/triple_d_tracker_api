'use strict';
const config = require('../config');
const mongoose = require('mongoose');
const {Location} = require('../models/model_locations');

// TODO - Question for Ray.  mongoose.connect() is in server.js alreay. Do I need mongoose.connect() here too?
// mongoose.connect(config.DATABASE_URL);


exports.getAllLocations = (req, res, next) => {

  Location
    .find()
    .sort({'state': 1, 'name': 1})
    .then((locations) => { res.json(locations).status(200); })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error', err: err });
    });
};

exports.getNearmeLocations = (req, res, next) => {
  // NOTE: req.query.lat, req.query.lon are Strings, convert to Numbers.
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lon);
  const distanceMeters = parseFloat(req.query.distanceMeters);

  // NOTE: In mongoose v5, .geoNear() is deprecated.
  // Production
  // 20 miles = 32000 km
  // 50 miles = 80000 km
  // 100 miles = 160000 km
  Location.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [ lng , lat ] },
        distanceField: "dist.calculated",
        maxDistance: distanceMeters,
        spherical: true
      }
    }
  ])
    .then((locations) => { res.json(locations).status(200); })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error', err: err});
    });

};