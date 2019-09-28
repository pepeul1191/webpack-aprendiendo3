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

router.get('/list', async function(req, res, next) {
  var respData = null;
  var respStatus = 200;
  try {
    var districts = await models.District.findAll({
      where: {
        province_id: req.query.province_id
      }
    });
    respData = JSON.stringify(districts);
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
    tx = await models.db.transaction();
    // news
    for(var i = 0; i < news.length; i++){
      var n = await models.District.create({
        name: news[i].name,
        province_id: extra.provinceId,
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
      await models.District.update({
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
      await models.District.destroy({
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
