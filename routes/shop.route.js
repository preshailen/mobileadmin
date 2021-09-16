const express = require('express');
const Shop = require('../models/shop.model');
const router = express.Router();

/*Functions*/
  router.post('/add-shop', async (req, res) => {
    try {
      const shop = new Shop(req.body);
      await shop.save();
      res.send(shop);
    } catch(err) {
      res.status(500).send(err);
    }
  });
  router.get('/get-shops', async (req, res) => {
    try {
      res.send(await Shop.find());
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.put('/edit-shop', async (req, res) => {
    try {
      const existingShop = await Shop.findById({ '_id': req.body._id});
      if (existingShop != null) {
        existingShop.name = req.body.name;
        existingShop.location = req.body.location;
        await existingShop.save();
        res.send(existingShop);
      } else {
        res.send(null);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.delete('/delete-shop/:id', async (req, res) => {
    try {
      res.send(await Shop.findByIdAndDelete({ '_id': req.params.id }));
    } catch (err) {
      res.status(500).send(err);
    } 
  });
/*Functions*/

module.exports = router;