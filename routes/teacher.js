const express = require('express');
const router = express.Router();
const models = require('../configs/models');

router.get('/list', async function(req, res, next) {
  var teachers = [];
  var count = Math.ceil(
    await models.VWTeacherLocation.count() / 
    parseInt(req.query.step)
  );
  if(
    typeof req.query.page === 'undefined' || 
    typeof req.query.step === 'undefined'
  ){
    teachers = await models.VWTeacherLocation.findAll();
  }else{
    teachers = await models.VWTeacherLocation.findAll({
      offset: (parseInt(req.query.page) - 1) * req.query.step, 
      limit: parseInt(req.query.step), 
    });
  }
  res.send(JSON.stringify({
    list: teachers,
    pages: count,
  }));
});

router.post('/save', async function(req, res, next){
  var data = JSON.parse(req.body.data);
  var news = data['new'];
  var edits = data['edit'];
  var deletes = data['delete'];
  console.log(edits);
  var createdIds = [];
  var respData = null;
  var respStatus = 200;
  // do transaction
  try {
    tx = await models.db.transaction();
    // news
    for(var i = 0; i < news.length; i++){
      var n = await models.Teacher.create({
        names: news[i].names,
        last_names: news[i].last_names,
        district_id: news[i].district_id,
        img:'http://oliva.ulima.edu.pe/imagenes/fotos/162505.jpg',
        sex_id: news[i].sex_id,
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
      await models.Teacher.update({
        names: edits[i].names,
        last_names: edits[i].last_names,
        district_id: edits[i].district_id,
        sex_id: edits[i].sex_id,
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
      await models.Teacher.destroy({
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