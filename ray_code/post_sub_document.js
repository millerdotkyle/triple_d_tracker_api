router.post('/:userId', (req, res) => {
  const expense = {
    amount: req.body.amount,
    category: req.body.category,
    owner: req.body.owner,
    workExpense: req.body.workExpense,
    location: req.body.location,
    createdAt: req.body.date,
  }

  User.findById(req.params.userId)
      .then(user => {
        user.expenses.push(expense)

        user.save(err => {
          if (err) {
            res.send(err)
          }
          res.json(user)
        })
      })
})