module.exports = function (req, res, next) {
  if (Boolean(process.env.ENV_SESSION)){
    var forward = false;
    if(typeof req.session.state !== 'undefined'){
      if(req.session.state == 'inactive'){
        req.session.messageError = 'Su tiempo de sesión ha terminado';
      }
      if(req.session.state == 'active'){
        forward = true;
      }
    }else{
      req.session.messageError = 'Nececita estar logeuado';
    }
    // forward???
    if (forward == false){
      return res.redirect('/error/access/8080');
    }
  }
  return next();
}