console.log("hit greeting Q ctrl");

var greetings = [
  "I am well, how can I help you",
  "I am doing very well, thank you for asking",
  "Very good, what can I do for you today?"
];


function create(req,res){
  console.log("hit create Q ctrl");
  console.log("req:", req.body);
  console.log(req.user);

  var response = {};
  var index = Math.floor(Math.random() * greetings.length);
  var name = "";
  if (req.user){
    name = req.user.firstName;
  }
  response.text = greetings[index] + ", " + name;

  res.json(response);
}

module.exports = {
  create: create,
};
