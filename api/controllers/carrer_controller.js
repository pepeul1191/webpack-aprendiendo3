const express = require('express');
const router = express.Router();
const Carrer = require('../models/carrer');

router.get('/list', async function(req, res, next) {
  var carrers = await Carrer.findAll({});
  res.send(JSON.stringify(carrers));
});

router.get('/name/count', async function(req, res, next) {
  var count = await Carrer.count({
    where: {
      name: req.query.name,
    },
  });
  res.send(count + '');
});

module.exports = router;
