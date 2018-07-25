const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  locationId: String,
  date: String,
  review: String
});

module.exports = ReviewSchema;