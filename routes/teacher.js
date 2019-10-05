const express = require('express');
const router = express.Router();
const models = require('../configs/models');

router.get('/list', async function(req, res, next) {
  var teachers = [];
  var count = Math.ceil(
    await models.Teacher.count() / 
    parseInt(req.query.step)
  );
  if(
    typeof req.query.page === 'undefined' || 
    typeof req.query.step === 'undefined'
  ){
    teachers = await models.Teacher.findAll();
  }else{
    teachers = await models.Teacher.findAll({
      offset: (req.query.page - 1) * req.query.step, 
      limit: req.query.step, 
    });
  }
  res.send(JSON.stringify({
    list: teachers,
    pages: count,
  }));
});

module.exports = router;