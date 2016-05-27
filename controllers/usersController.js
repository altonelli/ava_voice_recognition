var db = require('../models');

function create(req,res){
  db.User.create(req.body, function(err, user){
    if (err) {console.log("Error: " + err);}
    res.json(user);
  });
}
