var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var biosRouter = require('./routes/bios');

const mongoose = require( 'mongoose' );
//mongoose.connect( `mongodb+srv://${auth.atlasAuth.username}:${auth.atlasAuth.password}@cluster0-yjamu.mongodb.net/authdemo?retryWrites=true&w=majority`);
mongoose.connect( 'mongodb://localhost/teamNine');
// const mongoDB_URI = process.env.MONGODB_URI
// mongoose.connect(mongoDB_URI)

var app = express();

const BioInfo = require('./models/bioInfo');

async function populateData() {
    //Create Miranda bioInfo
    const mirInfo = new BioInfo({
      name: "Miranda Sullivan",
      app_name: "Barter",
      about: "A trading app that allows users to connect and swap items to give them a new, loving home.",
      address: "https://morning-shelf-58124.herokuapp.com/",
      img: "./images/barter.jpg",
      x: -2,
      y: 2
    });
    await mirInfo.save();
    //Create Steven bioInfo
    var stevenInfo = new BioInfo({
      name: "Steven Hightower",
      app_name: "Sim's Bakery",
      about: "A Website to purchase some delicious pastries from a small business!",
      address: "!Standin Address!",
      img: "./images/bakery.jpg",
      x: 0,
      y: 0
    });
    await stevenInfo.save();
    //Create Adharsh bioInfo
    var adharshInfo = new BioInfo({
      name: "Adharsh Ravi",
      app_name: "Climate Change App", //Maybe a name change
      about: "An app that compiles climate change data in an easy-to-understand nexus.",
      address: "!Standin Address!",
      img: "./images/change.jpg",
      x: -2,
      y: -2
    });
    await adharshInfo.save();
    //Create Matthew bioInfo
    var mattInfo = new BioInfo({
      name: "Matthew Merovitz",
      app_name: "Inventory Tracker", //Maybe a name change
      about: "Helps Businesses keep track of their stock and other crucial data",
      address: "https://red-poutine-00067.herokuapp.com/",
      img: "./images/inventory.jpg",
      x: 2,
      y: 2
    });
    await mattInfo.save();
    //Create Millan bioInfo
    var millInfo = new BioInfo({
      name: "Millan Shenoy",
      app_name: "Accessible Routing",
      about: "An app that will help you find wheelchair-friendly accessible routes in your area.",
      address: "!Standin Address!",
      img: "./images/route.jpg",
      x: 2,
      y: -2
    });
    await millInfo.save();
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("we are connected!!!")
  if (await BioInfo.countDocuments({}) == 0) {
    populateData();
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bios', biosRouter);
app.use('/users', usersRouter);

app.get("/", async (req, res, next) => {
  res.locals.bios = await BioInfo.find({});
  res.render("index");
});

app.get("/quiz", (request, response) => {
  response.render("quiz");
});

app.get('/quizresults', async (req, res, next) => {
  res.render('quizresults')
});
app.post('/quizresults', async (req, res, next) => {
  var x = parseFloat(req.body.x);
  var y = parseFloat(req.body.y);
  var nearest = [];
  var distances = [];
  var allBios = await BioInfo.find();
  allBios.map((bio) => {
    let diffX = Math.pow(bio.x - x, 2);
    let diffY = Math.pow(bio.y - y, 2);
    let temp = Math.sqrt(diffX + diffY);
    distances.push(temp);
  });
  var lowestDistance = distances[0];
  distances.forEach((dist) => {
    if (dist < lowestDistance) {
      lowestDistance = dist;
    }
  });
  for (let i = 0; i < distances.length; i++) {
    if (lowestDistance == distances[i]) {
      nearest.push(allBios[i]);
    }
  }
  res.locals.nearest = nearest;
  res.render('quizresults');
});

module.exports = app;

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
