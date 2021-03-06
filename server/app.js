var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var sequelize = require('sequelize');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

var expressSession = require('express-session');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var models = require('./models');

var routes = require('./routes/index');
var polls = require('./routes/polls');
var users = require('./routes/users');
var discussions = require('./routes/discussions');
var comments = require('./routes/comments');

var globalFunctions = require('./globalFunctions.js');

//passport's user authentication strategy
passport.use(new Strategy(
  function(username, password, cb) {
    models.User.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        username.toLowerCase()
      ),
      include: [
        {model: models.LoginInfo, required: true}
      ]
    }).then(function(user) {
      if (!user) { return cb(null, false); }
      if (!bcrypt.compareSync(password, user.LoginInfo.passwordHash)) { return cb(null, false); }
      return cb(null, restrict(user, ['id','name']));
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  models.User.findById(id).then(function(user) {
    cb(null, user);
  });
});

// uncomment after placing your favicon in ../client/public-build
//app.use(favicon(path.join(__dirname, '../client/public-build', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public-build')));
app.use(expressSession({secret:'asdf', resave:false, saveUninitialized:false}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/', routes);
app.use('/api/polls', polls);
app.use('/api/users', users);
app.use('/api/discussions', discussions);
app.use('/api/comments', comments);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public-build/views/index.html'));
});

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
    res.send(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


module.exports = app;
