var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/avaApp_test");



module.exports.User = require("./user.js");
