const express = require('express');
const router = express.Router();
const Sex = require('../models/sex');

router.get('/list', async function(req, res, next) {
  var sexs = await Sex.findAll({});
  res.send(JSON.stringify(sexs));
});

module.exports = router;
