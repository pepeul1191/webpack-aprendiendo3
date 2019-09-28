const express = require('express');
const router = express.Router();
const models = require('../configs/models');

router.get('/list', async function(req, res, next) {
  var respData = null;
  var respStatus = 200;
  try {
    var provinces = await models.Province.findAll({
      where: {
        department_id: req.query.department_id
      }
    });
    respData = JSON.stringify(provinces);
  } catch (err) {
    console.log(err);
    respStatus = 501;
    respData = err.message;
  }
  res.status(respStatus).send(respData);
});

module.exports = router;
