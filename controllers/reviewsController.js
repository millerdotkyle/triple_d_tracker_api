'use strict';
const config = require('../config');
const mongoose = require('mongoose');
const {User} = require('../models/model_user');

mongoose.connect(config.DATABASE_URL);

exports.getReviews = (req, res) => {
  // For when Map renders on app launch, or when User refreshes the Browser.
  const userId = req.params.userId;

  User.findById(userId)
      .then(user => { res.status(200).json(user.sendReviews()) });
};

exports.createReview = (req, res) => {
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
          res.json(user.sendReviews());
        })
      })
};

exports.editReview = (req, res) => {
  // TODO - Postman test b@b.com userId = 5b578696527db520e24a7bc2
  console.log('reviewsController editReview req.body = ', req.body);
};

exports.deleteReview = (req, res) => {
  const userId = req.params.userId;
  const reviewId = req.params.reviewId;

  User.findById(userId)
      .then(user => {

        user.reviews.id(reviewId).remove();

        user.save(err => {
          if (err) {
            res.send(err)
          }
          res.json(user.sendReviews())
        })
      })
};