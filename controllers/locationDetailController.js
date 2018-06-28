'use strict';
const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.DATABASE_URL);

exports.getLocationDetail = (req, res) => {
  console.log('locationController getLocationDetail req.body = ', req.body);
};
