const express = require('express');
const router = express.Router();
const models = require('../configs/models');
const database = require('../configs/database');

router.get('/list', async function(req, res, next) {
  var deparments = await models.Deparment.findAll();
  res.send(JSON.stringify(deparments));
});

module.exports = router;
