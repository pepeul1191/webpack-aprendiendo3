module.exports = function (req, res, next) {
  res.set('Server', 'Ubuntu');
  res.set('sistema_id', 1);
  return next();
}