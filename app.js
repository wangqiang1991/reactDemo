var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
var order = require('./routes/order');
var hot = require('./routes/hot');
var promotion = require('./routes/promotion');
var className = require('./routes/className');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret:'sdaaddssasd',
	resave:true,
	saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));
//设置ajax跨域访问
app.use('/*', function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","POST,GET");
    next();
});
//设置ajax跨域访问
app.use('/*', function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST");
    next();
});


app.use('/', routes);
app.use('/goods', goods);
app.use('/order', order);
app.use('/hot', hot);
app.use('/promotion', promotion);
app.use('/className', className);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
		console.log('err:',err);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
	console.log('err:',err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;