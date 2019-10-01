function error404(){
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

function errorHandler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

exports.error404 = error404;
exports.errorHandler = errorHandler;
