const express = require('express');
const router = express.Router();
const models = require('../../configs/models');

router.get('/list', async function(req, res, next) {
  var deparments = await models.Deparment.findAll();
  res.send(JSON.stringify(deparments));
});

router.post('/save', async function(req, res, next){
  var data = JSON.parse(req.body.data);
  var news = data['new'];
  var edits = data['edit'];
  var deletes = data['delete'];
  var createdIds = [];
  var respData = null;
  var respStatus = 200;
  // do transaction
  try {
    tx = await models.db.transaction();
    // news
    for(var i = 0; i < news.length; i++){
      var n = await models.Deparment.create({
        name: news[i].name,
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
      await models.Deparment.update({
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
      await models.Deparment.destroy({
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
