'use strict';
const config = require('../config');
const mongoose = require('mongoose');
const {User} = require('../models/model_user');

mongoose.connect(config.DATABASE_URL);

exports.addReview = (req, res) => {
  const userId = req.body.userId;
  const review = {
    locationId: req.body.locationId,
    date: req.body.date,
    review: req.body.review
  };

  User.findById(userId)
      .then(user => {
        console.log('user, ', user);
        user.reviews.push(review);
        user.save(err => {
          if (err) {
            res.send(err)
          }
          res.json(user.sendReviews())
        })
      })
};

exports.editReview = (req, res) => {
  console.log('reviewsController editReview req.body = ', req.body);
};
exports.deleteReview = (req, res) => {
  console.log('reviewsController deleteReview req.body = ', req.body);
};