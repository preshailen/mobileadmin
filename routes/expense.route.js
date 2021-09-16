const express = require('express');
const Expense = require('../models/expense.model');
const router = express.Router();

/*Functions*/
  router.post('/add-expense', async (req, res) => {
    try {
      const expense = new Expense(req.body);
      await expense.save();
      res.send(expense);
    } catch(err) {
      res.status(500).send(err);
    }
  });
  router.get('/get-expenses', async (req, res) => {
    try {
      res.send(await Expense.find());
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.put('/edit-expense', async (req, res) => {
    try {
      const existingExpense = await Expense.findById({ '_id': req.body._id});
      if (existingExpense != null) {
        existingExpense.title = req.body.title;
        existingExpense.cost = req.body.cost;
        existingExpense.date = req.body.date;
        existingExpense.categories = req.body.categories;
        existingExpense.shop = req.body.shop;
        await existingExpense.save();
        res.send(existingExpense);
      } else {
        res.send(null);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.delete('/delete-expense/:id', async (req, res) => {
    try {
      res.send(await Expense.findByIdAndDelete({ '_id': req.params.id }));
    } catch (err) {
      res.status(500).send(err);
    } 
  });
/*Functions*/

module.exports = router;

//dfdfdf