const express = require('express');
const router = express.Router();
const models = require('../configs/models');

router.get('/list', async function(req, res, next) {
  var carrers = await models.Carrer.findAll({});
  res.send(JSON.stringify(carrers));
});

module.exports = router;
