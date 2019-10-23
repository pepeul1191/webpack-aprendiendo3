module.exports = function error404(){
  return function (req, res, next) {
    if ('GET' == req.method){
      var resource = req.path.split('.');
      var extensions = ['css', 'js', 'png', 'jpg', ];
      if(extensions.indexOf(resource[resource.length - 1]) == -1){
        res.redirect('/error/access/404');
      }else {
        return next();
      }
    }else{
      var rpta = 'Recurso no encontrado';
      res.status(404).send(rpta);
    }
  }
}
