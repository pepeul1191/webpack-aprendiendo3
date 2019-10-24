const express = require('express');
const router = express.Router();
const database = require('../../configs/database');
const Province = require('../models/province');

router.get('/list', async function(req, res, next) {
  var respData = null;
  var respStatus = 200;
  try {
    var provinces = await Province.findAll({
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

router.post('/save', async function(req, res, next){
  var data = JSON.parse(req.body.data);
  var news = data['new'];
  var edits = data['edit'];
  var deletes = data['delete'];
  var extra = data['extra'];
  var createdIds = [];
  var respData = null;
  var respStatus = 200;
  // do transaction
  try {
    tx = await database.db.transaction();
    // news
    for(var i = 0; i < news.length; i++){
      var n = await Province.create({
        name: news[i].name,
        department_id: extra.departmentId,
      },{
        transaction: tx
      });
      createdIds.push({
        newId: n.id,
        tempId: news[i].id
      });
    } 
    // edits
    for(var i = 0; i < edits.length; i++){
      await Province.update({
        name: edits[i].name,
      }, {
        where: {
          id: edits[i].id  
        }
      },{
        transaction: tx
      });
    } 
    // deletes
    for(var i = 0; i < deletes.length; i++){
      await Province.destroy({
        where: {
          id: deletes[i]
        }
      },{
        transaction: tx
      });
    } 
    // commmit changes
    await tx.commit();
    // make respData
    respData = JSON.stringify(createdIds);
  } catch (err) {
    console.log(err);
    respStatus = 501;
    respData = err.message;
    // rollback transcation
    await tx.rollback();
  }
  res.status(respStatus).send(respData);
});

module.exports = router;
