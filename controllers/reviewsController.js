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
        user.reviews.push(review);
        user.save(err => {
          if (err) {
            res.send(err)
          }
          res.json(user.sendReviews());
        })
      })
};

exports.getReviewToEdit = (req, res) => {
  const userId = req.params.userId;
  const reviewId = req.params.reviewId;

  User.findById(userId)
      .then(user => {
        const review = user.reviews.id(reviewId);
        res.status(200).json(review)
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' })
      });
};

exports.editReview = (req, res) => {

  const userId = req.params.userId;
  const reviewId = req.params.reviewId;

  // prod
  const toUpdate = {};

  // Ensure req.body contains proper update fields.
  const updatableFields = ['date', 'review'];
  updatableFields.forEach(field => {

    if (field in req.body) {
      toUpdate[field] = req.body[field];
    } else {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }

  });

  // make sure userId is in url.
  if ( !req.params.userId ) {
    const message = `Missing userId in request params`;
    console.error(message);
    return res.status(400).send(message);
  }

  // make sure reviewId is in url.
  if ( !req.params.reviewId ) {
    const message = `Missing reviewId in request params`;
    console.error(message);
    return res.status(400).send(message);
  }

  User.findById(userId)
      .then(user => {

        user.reviews.id(reviewId).set(toUpdate);

        user.save(err => {
          if (err) {
            res.send(err)
          }
          res.json(user.sendReviews())
        })
      })

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