

function search(req,res){
  console.log(req.body);
  var response = {};
  response.text = "Here you are.";
  response.url = "https://www.google.com/webhp?hl=en#hl=en&q=" + req.body.searchTerm;
  response.action = 'window.open(a, "_blank")';

  console.log(response);
  res.json(response);
}




module.exports = {
  search: search
}
