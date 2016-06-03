var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/avaApp_test");
mongoose.connect( process.env.MONGODB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/avaApp_test" );



module.exports.User = require("./user.js");
