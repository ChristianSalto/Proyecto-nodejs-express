var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

// conectar a la base de datos
require('./lib/connectMongoose');

/**
 * Setup de i18n
 */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/**
 * Rutas del API
 */

app.use('/apiv1/adsnodepops', require('./routes/api/adsNodepops'));

/**
 * Rutas del webside
 */

app.use('/', require('./routes/index'));
app.use('/listTags', require('./routes/listTags'));
app.use('/cards', require('./routes/cards'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  res.status(err.status || 500);

  // we can handle the error and give more 
  // details if the error comes from the URL /api/

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  };

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.startsWith('/apiv1/');
}

module.exports = app;
