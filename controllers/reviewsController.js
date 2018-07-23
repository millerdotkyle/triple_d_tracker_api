'use strict';
const config = require('../config');
const mongoose = require('mongoose');
const {User} = require('../models/model_user');

mongoose.connect(config.DATABASE_URL);

exports.addReview = (req, res) => {
  console.log('reviewsController addReview req.body = ', req.body);

  // // Ray code - BEGIN
  // router.post('/:userId', (req, res) => {
  //   const expense = {
  //     amount: req.body.amount,
  //     category: req.body.category,
  //     owner: req.body.owner,
  //     workExpense: req.body.workExpense,
  //     location: req.body.location,
  //     createdAt: req.body.date,
  //   }
  //
  //   User.findById(req.params.userId)
  //       .then(user => {
  //         user.expenses.push(expense)
  //
  //         user.save(err => {
  //           if (err) {
  //             res.send(err)
  //           }
  //           res.json(user)
  //         })
  //       })
  // })
  // // Ray code - END
};
exports.editReview = (req, res) => {
  console.log('reviewsController editReview req.body = ', req.body);
};
exports.deleteReview = (req, res) => {
  console.log('reviewsController deleteReview req.body = ', req.body);
};