var express = require('express');
var router = express.Router();

router.get('/access/:numero_error', function(req, res, next) {
  res.status(404).send('Recurso no encontrado');
});

module.exports = router;