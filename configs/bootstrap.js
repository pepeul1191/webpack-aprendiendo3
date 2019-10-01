const indexRouter = require('../routes/index');
const carrerRouter = require('../routes/carrer');
const districtRouter = require('../routes/district');
const errorRouter = require('../routes/error');
const departmentRouter = require('../routes/department');
const provinceRouter = require('../routes/province');
const loginRouter = require('../routes/login');

module.exports = function(app){
  app.use('/', indexRouter);
  app.use('/carrer', carrerRouter);
  app.use('/district', districtRouter);
  app.use('/error', errorRouter);
  app.use('/department', departmentRouter);
  app.use('/province', provinceRouter);
  app.use('/login', loginRouter);
};
