var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser= require('body-parser')
var logger = require('morgan');
var session=require('express-session');
var indexRouter = require('./routes/index');
var pharmacyRouter= require('./routes/pharmacy');
var usersRouter = require('./routes/users');
var methodOverride= require('method-override');
var cors=require('cors');
const helmet = require('helmet');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.options('*',cors());
app.get('*',cors());
app.post('*',cors());
app.put('*',cors());
app.delete('*',cors());
app.use(logger('dev'));
app.use(express.json());


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
secret: 'secret',
resave:true,
saveUninitialized:true
}));
app.use(methodOverride("_method"));
//app.use(cors());
app.use('/', indexRouter);
app.use('/pharmacy', pharmacyRouter);
//app.use('/', usersRouter);
app.use('/users', usersRouter);

// simple route
app.get("/moh", (req, res) => {
  res.send("Welcome to MOH Portal!");
});

const mohRouter = require('./routes/mohRoutes')
app.use('/moh', mohRouter)

//Require moh-pharmacy router
const mohPharmacyRouter = require('./routes/mohPharmacyRoutes')
//Using as a middleware
app.use('/moh/pharmacy', mohPharmacyRouter)


//Require moh-laboratory router
const mohLaboratoryRouter = require('./routes/mohLaboratoryRoutes')
//Using as a middleware
app.use('/moh/laboratory', mohLaboratoryRouter)

//Require moh-hospital router
const mohHospitalRouter = require('./routes/mohHospitalRoutes')
//Using as a middleware
app.use('/moh/hospital', mohHospitalRouter)


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
