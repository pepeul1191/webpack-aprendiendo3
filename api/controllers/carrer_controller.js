const express = require('express');
const router = express.Router();
const models = require('../../configs/models');

router.get('/list', async function(req, res, next) {
  var carrers = await models.Carrer.findAll({});
  res.send(JSON.stringify(carrers));
});

router.get('/name/count', async function(req, res, next) {
  var count = await models.Carrer.count({
    where: {
      name: req.query.name,
    },
  });
  res.send(count + '');
});

module.exports = router;
