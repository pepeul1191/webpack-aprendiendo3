var express = require('express');
var bodyParser = require('body-parser');
var helpers = require('../../configs/helpers');
var constants = require('../../configs/constants');
var router = express.Router();

router.post('/file', bodyParser.text({ type: 'json' }), function (req, res) {
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
