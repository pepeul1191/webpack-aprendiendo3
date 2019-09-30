var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login/index', { 
    title: 'Ingresar', 
    message_color: 'text-danger',
    message: 'Usuario y/o contraseña no válidos',
  });
});

module.exports = router;