var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var dotenv = require('dotenv');
var cors = require('cors');

//carga las variables de entorno
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginC = require('./src/controlador/loginControlador');
var usuarioC = require('./src/controlador/usuarioControlador');
var categoriaC = require('./src/controlador/categoriaControlador');
var productoC = require('./src/controlador/productoControlador');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// soporte cors y headers de seguridad
app.use(cors());
app.use(helmet());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginC);
app.use('/usuario', usuarioC);
app.use('/categoria', categoriaC);
app.use('/producto', productoC);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
