console.log("in user ctrl");

var db = require('../models');

function create(req,res){
  db.User.register(
    new db.User({ firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email}),
                req.body.password,
    function(err, newUser){
      if (err) {console.log("Error: " + err);}
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
  });
}



/////NOT FINDING THIS FUNCTION FOR CALLBACK
