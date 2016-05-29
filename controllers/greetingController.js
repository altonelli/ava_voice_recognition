console.log("hit greeting ctrl");

// var name = "";
//
// if (req.user) {
//   name = req.user.firstName;
// } else {
// }

var greetings = [
  "Hello, how can I help you",
  "Hello",
  "Hello, how are you doing today"
];


function create(req,res){
  console.log("hit create ctrl");
  console.log("req:", req.body);
  console.log(req.user);

  var response = {};



  if (req.body.name === "ava" || req.body.name === ""){
    var index = Math.floor(Math.random() * greetings.length);
    var name = "";
    if (req.user){
      name = req.user.firstName;
    }
    response.text = greetings[index] + ", " + name;
  } else {
    response.text = "I'm sorry, my name is Ava.";
  }

  res.json(response);
}

module.exports = {
  create: create,
};
