const indexRouter = require('../api/controllers/index_controller');
const carrerRouter = require('../api/controllers/carrer_controller');
const districtRouter = require('../api/controllers/district_controller');
const errorRouter = require('../api/controllers/error_controller');
const departmentRouter = require('../api/controllers/department_controller');
const provinceRouter = require('../api/controllers/province_controller');
const loginRouter = require('../api/controllers/login_controller');
const imageRouter = require('../api/controllers/image_controller');
const teacherRouter = require('../api/controllers/teacher_controller');
const sexRouter = require('../api/controllers/sex_controller');

module.exports = function(app){
  app.use('/', indexRouter);
  app.use('/carrer', carrerRouter);
  app.use('/district', districtRouter);
  app.use('/error', errorRouter);
  app.use('/department', departmentRouter);
  app.use('/province', provinceRouter);
  app.use('/login', loginRouter);
  app.use('/image', imageRouter);
  app.use('/teacher', teacherRouter);
  app.use('/sex', sexRouter);
};
