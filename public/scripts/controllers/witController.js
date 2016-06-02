console.log("in wit ctrl");

angular
  .module('avaApp')
  .controller("WitController", WitController);

  WitController.$inject = ['$http', '$state','WitService'];

  function WitController( $http, $state, WitService ){


    var mic = new Wit.Microphone(document.getElementById("microphone"));
  var info = function (msg) {
    document.getElementById("info").innerHTML = msg;
  };
  mic.onready = function () {
    info("Microphone is ready to record");
  };
  mic.onaudiostart = function () {
    info("Recording started");
  };
  mic.onaudioend = function () {
    info("Recording stopped, processing started");
  };
  mic.onerror = function (err) {
    info("Error: " + err);
  };
  mic.onresult = function (intent, entities, res) {
    console.log(intent, entities, res);
    WitService.intent = intent;
    WitService.entities = entities;
    WitService.res = res;

    if (entities.intent.value === "greeting"){
      $http({
        method: 'POST',
        url: '/api/greeting',
        data: {
          name: "ava"
        }
      }).then(function success(res){
        console.log(res.data.text);
        speak(res.data.text);
      }, function error(res){
        speak("My apologies, an error ocurred. Could you please repeat your request?");
        console.log("error:", res);
      });
    } else if ( entities.intent.value === "greeting:question"){
      $http({
        method: 'POST',
        url: '/api/greeting/question'
      }).then(function success(res){
        console.log(res.data.text);
        speak(res.data.text);
      }, function error(res){
        speak("My apologies, an error ocurred. Could you please repeat your request?");
        console.log("error:", res);
      });
    } else if ( entities.intent.value === "search" && entities.search_query){
      $http({
        method: 'POST',
        url: '/api/search',
        data: {
          searchTerm: entities.search_query.value
        }
      }).then(function success(res){
        console.log(res.data);
        var func = new Function('a',res.data.action);
        func(res.data.url);
        speak(res.data.text);
      }, function error(res){
        speak("My apologies, an error ocurred. Could you please repeat your request?");
        console.log('Error:',res);
      });
    } else if (entities.intent.value === "weather") {
      $state.go('main.weather');
    } else if(entities.intent.value === "places" && entities.local_search_query){

      $state.go('main.places');

    } else if(entities.intent.value === "directions" && entities.start && entities.end){

      $state.go('main.directions');


      console.log("Directions!");
      // $http({
      //   method: "POST",
      //   url: "/api/directions",
      //   data: {
      //     locationStart: entities.start.value,
      //     locationEnd: entities.end.value
      //   }
      // }).then(function success(res){
      //   console.log(res.data);
      //   speak(res.data.text)
      // }, function error(res){
      //   speak("My apologies, an error ocurred. Could you please repeat your request?");
      //   console.log(res);
      // });
    } else {
      speak("I'm sorry I did not understand that.");
    }


    var result = concatKeyValue("intent", intent);

    for (var k in entities) {
      var e = entities[k];

      if (!(e instanceof Array)) {
        result += concatKeyValue(k, e.value);
      } else {
        for (var i = 0; i < e.length; i++) {
          result += concatKeyValue(k, e[i].value);
        }
      }

      document.getElementById("result").innerHTML = result;
    }
  };

  mic.connect("JVSLWMBPAXC2MELTSRHSARVEXWM35CIZ");

  function concatKeyValue (k, v) {
    if (typeof v !== "string") {
      v = JSON.stringify(v);
    }
    return k + "=" + v + "\n";
  }


  }

  var myVoice;
  window.speechSynthesis.onvoiceschanged = function() {
    var test = window.speechSynthesis.getVoices();
    // var test = speech.voice
    myVoice = test[66];
    console.log(myVoice);
  };

function speak(msg){
    var speech = new SpeechSynthesisUtterance();
    speech.text = msg;
    speech.voice = myVoice;

    window.speechSynthesis.speak(speech);
}
