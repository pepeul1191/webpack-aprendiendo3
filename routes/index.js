var express = require('express');
var bodyParser = require('body-parser');
var helpers = require('../configs/helpers');
var constants = require('../configs/constants');
var router = express.Router();

var homeView = function(req, res, next) {
  res.render('index', { title: 'Express' });
};

/* GET home page. */
router.get('/', homeView);
router.get('/user/create', homeView);
router.get('/user/edit/:id', homeView);
router.get('/autocomplete', homeView);
router.get('/upload', homeView);
router.get('/validation_form', homeView);
router.get('/table/location', homeView);
router.get('/table/carrers', homeView);
router.get('/table/images', homeView);
router.get('/table/teachers', homeView);
router.get('/table/teachers/:id/carrers', homeView);
// upload file
router.post('/upload/file', bodyParser.text({ type: 'json' }), function (req, res) {
  var file = req.files.file;
  var tempFileNameArray = file.name.split('.');
  var randomVal = helpers.makeId();
  file.mv('public/uploads/' + randomVal + '.' + tempFileNameArray[tempFileNameArray.length - 1], function(err) {
    if (err){
      res.statusCode = 500;
      res.send(err);
    }
    var rpta = {
      url: constants.base_url,
      path: 'uploads/' + randomVal + '.' + tempFileNameArray[tempFileNameArray.length - 1],
    };
    res.send(JSON.stringify(rpta));
  });
});

module.exports = router;
