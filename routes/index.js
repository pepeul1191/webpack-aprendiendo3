var express = require('express');
var router = express.Router();

var homeView = function(req, res, next) {
  res.render('index', { title: 'Express' });
};

/* GET home page. */
router.get('/', homeView);
router.get('/user/create', homeView);
router.get('/user/edit/:id', homeView);
router.get('/autocomplete', homeView);

module.exports = router;
