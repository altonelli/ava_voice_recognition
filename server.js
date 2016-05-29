require('./secrets.js');
var https = require('https');
var express = require('express');
var app = express();
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var controllers = require('./controllers');
var db = require('./models'),
    User = db.User;

// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey', // change this!
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var ejs = require('ejs');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');


app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// app.post('/api/users', controllers.users.create);
app.post('/signup', function create(req,res){
  User.register(
    new User({ firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username}),
      req.body.password,
      function(err, newUser){
        if (err) {console.log("Error in server js: " + err);}
        passport.authenticate('local')(req, res, function() {
          console.log(req.user);
          res.json(req.user);
        });
      });
    });

app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.json(req.user);
});

app.get('/logout', function (req, res) {
  console.log("hitting logout end point");
  req.logout();
  res.json({"yeah":"logged out"});
});

app.post('/api/greeting', controllers.greeting.create);
app.post('/api/greeting/question', controllers.greetingquestion.create);
app.post('/api/search', controllers.search.search);

app.post('/api/places', controllers.places.places);
app.post('/api/directions', controllers.places.directions);
app.post('/api/weather', controllers.weather.forecast);





app.get('/*', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || 8000, function() {
  console.log('Express server is running on http://localhost:8000/');
});
