
function places(req, res){
  var local = req.body.local;



}



function directions(req, res){
  var start = req.body.locationStart;
  var end = req.body.locationEnd;



}


module.exports = {
  places: places,
  directions: directions
}
