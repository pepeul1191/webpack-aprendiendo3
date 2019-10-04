const express = require('express');
const router = express.Router();
const models = require('../configs/models');
const database = require('../configs/database');

router.get('/list', async function(req, res, next) {
  var respData = null;
  var respStatus = 200;
  try {
    var images = await models.Image.findAll({});
    respData = JSON.stringify(images);
  } catch (err) {
    console.log(err);
    respStatus = 501;
    respData = err.message;
  }
  res.status(respStatus).send(respData);
});

module.exports = router;
