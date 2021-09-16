const express = require('express');
const Category = require('../models/category.model');
const router = express.Router();

/*Functions*/
  router.post('/add-category', async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.send(category);
    } catch(err) {
      res.status(500).send(err);
    }
  });
  router.get('/get-categories', async (req, res) => {
    try {
      res.send(await Category.find());
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.put('/edit-category', async (req, res) => {
    try {
      const existingCategory = await Category.findById({ '_id': req.body._id});
      if (existingCategory != null) {
        existingCategory.title = req.body.title;
        await existingCategory.save();
        res.send(existingCategory);
      } else {
        res.send(null);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.delete('/delete-category/:id', async (req, res) => {
    try {
      res.send(await Category.findByIdAndDelete({ '_id': req.params.id }));
    } catch (err) {
      res.status(500).send(err);
    } 
  });
/*Functions*/

module.exports = router;