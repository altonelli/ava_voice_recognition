var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/taco_test");



module.exports.User = require("./user.js");
