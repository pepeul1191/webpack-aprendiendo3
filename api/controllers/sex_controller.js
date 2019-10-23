const express = require('express');
const router = express.Router();
const models = require('../../configs/models');

router.get('/list', async function(req, res, next) {
  var sexs = await models.Sex.findAll({});
  res.send(JSON.stringify(sexs));
});

module.exports = router;
