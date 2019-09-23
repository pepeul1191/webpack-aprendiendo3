const express = require('express');
const router = express.Router();
const models = require('../configs/models');
const database = require('../configs/database');

router.get('/search', async function(req, res, next) {
  var districts = await models.LocationVW.findAll({
    where: {
      name:{
        [database.Op.like]: '%' + req.query.name + '%',
      },
    },
    limit: 10,
  });
  res.send(JSON.stringify(districts));
});

module.exports = router;
