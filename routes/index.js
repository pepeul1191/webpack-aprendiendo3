var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/create', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/edit/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
