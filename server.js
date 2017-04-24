// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var cookieParser = require('cookie-parser');
    // var registerRouter = require('./app/registerRouter');
    // var statsRouter = require('./app/statsRouter');
    // var imageUploadRouter = require('./app/imageUploadRouter');
var userRouter = require('./route/userRouter.js');
var feedbackRouter = require('./route/feedbackRouter.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/userRegistration');


// configuration ===========================================

// config files
var db = require('./config/db');

var port = process.env.PORT || 3005; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
    extended: true
})); // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride('X-HTTP-Method-Override')); // override with the
// X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

//app.set('view engine', 'html');
// app.set('views', path.join(__dirname, '/views')); // Convenience since it's the default anyway.
app.set('view engine', 'jade');
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// routes ==================================================
//require('./app/routes')(app);
// pass our application into our routes
app.use('/feedback', feedbackRouter);
app.use('/', userRouter);

// app.use('/stats',statsRouter);
// app.use('/image',imageUploadRouter);

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app
