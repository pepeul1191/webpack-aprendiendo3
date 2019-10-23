var express = require('express');
var middlewareSessionTrue = require('../middlewares/session_true');
var router = express.Router();

var homeView = function(req, res, next) {
  res.render('index', { title: 'Express' });
};
/* GET home page. */
router.get('/', middlewareSessionTrue, homeView);
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

module.exports = router;
