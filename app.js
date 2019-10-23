const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
// custom configs and middlewares
const error404 = require('./api/middlewares/error_404');
const errorHandler = require('./api/middlewares/error_handler');
const bootstrap = require('./configs/bootstrap');
// app
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// register routes
bootstrap(app);
// catch 404 and forward to error handler
app.use(error404());
// error handler
app.use(errorHandler);
// export app
module.exports = app;
