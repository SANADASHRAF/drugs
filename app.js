var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const expresssession=require('express-session');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authrauter=require('./routes/auth');
const cookies=require('./routes/cookies');
const signupvalidate=require('./routes/signupvalidate');
const { error } = require('console');

const jwt=require('jsonwebtoken');
var app = express();




// auth
require('dotenv').config()


//mongoose connect to db
mongoose.connect('mongodb://localhost/druggs', { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('connect to database ....');
  }
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expresssession({secret:'druggss',saveUninitialized:false ,resave:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authrauter);
app.use('/cookies',cookies);
app.use('/signupvalidate',signupvalidate);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});







module.exports = app;
