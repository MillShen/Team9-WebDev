var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const mongoose = require( 'mongoose' );
//mongoose.connect( `mongodb+srv://${auth.atlasAuth.username}:${auth.atlasAuth.password}@cluster0-yjamu.mongodb.net/authdemo?retryWrites=true&w=majority`);
mongoose.connect( 'mongodb://localhost/authDemo');
//const mongoDB_URI = process.env.MONGODB_URI
//mongoose.connect(mongoDB_URI)

const BioInfo = require('./models/bioInfo');

function populateData() {
  if (BioInfo.count() == 0) {
    //Create Miranda bioInfo
    var mirInfo = new BioInfo({
      name: "Miranda Sullivan",
      app_name: "Barter",
      about: "A trading app that allows users to connect and swap items to give them a new, loving home.",
      address: "https://morning-shelf-58124.herokuapp.com/",
      x: -2,
      y: 2
    });
    mirInfo.save();
    var stevenInfo = new BioInfo({
      name: "Steven Hightower",
      app_name: "Sim's Bakery",
      about: "A Website to purchase some delicious pastries from a small business!",
      address: "!Standin Address!",
      x: 0,
      y: 0
    });
    stevenInfo.save();
    var adharshInfo = new BioInfo({
      name: "Adharsh Ravi",
      app_name: "Climate Change App", //Maybe a name change
      about: "An app that compiles climate change data in an easy-to-understand nexus.",
      address: "!Standin Address!",
      x: -2,
      y: -2
    });
    adharshInfo.save();
    var mattInfo = new BioInfo({
      name: "Matthew Merovitz",
      app_name: "Stock Watch", //Maybe a name change
      about: ""
    });
  }
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!!!")
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authRouter)
app.use(loggingRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
