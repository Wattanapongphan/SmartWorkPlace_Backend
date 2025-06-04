var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();
// Connect to MongoDB
require('./db.js');

var seatRouter = require('./routes/seat.js');
var dashboardRouter = require('./routes/dashboard.js');
var floorRouter = require('./routes/floor.js');
var zoneRouter = require('./routes/zone.js');
var branchRouter = require('./routes/building.js');
var employeeRouter = require('./routes/employee.js');


var app = express();

//setup CORS
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/seats', seatRouter);
app.use('/dashboard', dashboardRouter);
app.use('/floors', floorRouter);
app.use('/zones', zoneRouter);
app.use('/branch', branchRouter);
app.use('/employee', employeeRouter);


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
