# Ava

## Synopsis

Ava is a voice recognition personal assistant. You can ask her for the weather, directions, nearby places, to Google search something, or just say hi.

## Motivation

This was my final project while at General Assembly. The motivation was to build an out of the box project where the user interaction is focused on voice input and voice response, making it an easy to use personal assistant.

## Set Up

Fork and clone this repository. From the main directory install package.json.
```
$ npm install
```
You will then need several API keys for the app to work out of the box.

### Wit.ai

First off you will need to start a project on Wit.ai [here](https://wit.ai/). You will need the "Client Access Token" from the "Settings" tab of your Wit app.

### Google Developer console

You will need to create an app from the Google Developer Console [here](https://console.developers.google.com/). You will need to add the following API's to the app and save your key.

* Google Places API Web Service
* Google Maps Geocoding API
* Google Maps JavaScript API

### Weather Underground

You will need a Weather Underground API key from [here](https://www.wunderground.com/weather/api/d/docs?MR=1).

### Storing Your Keys

Finally you will need to store your Google and Weather Underground keys in a secrets.js file.
From the command line
```
touch screts.js
```
Inside the secrets.js file save folloing with your secret keys replaced as strings.
```
process.env['GOOGLE_SECRET_KEY'] = "YOUR_GOOGLE_KEY"

process.env['WEATHER_SECRET_KEY'] = "YOUR_WEATHER_UNDERGROUND_KEY"
```
You will also need to replace the current Wit client key with your key in
```
~/public/scripts/controllers/witController.js
```
```
// CHANGE CLIENT KEY HERE //

var wit_client = "YOUR_WIT_CLIENT_KEY";

////////////////////////////
```
Only a client key is needed for this repository, so you will also need to change the accessible domain in the "Settings" of your Wit.ai app account.

## Built With

* [Wit.ai](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Google Maps](https://developers.google.com/maps/) - Display map and query for routes.
* [Google Places](https://developers.google.com/places/) - Query for local information
* [Weather Underground](https://www.wunderground.com/weather/api/d/docs) - Query for weather information
* [AngularJS](https://docs.angularjs.org/api) - Front-end framework
* [ExpressJS](https://expressjs.com/en/api.html) - Server side framework
* [WebRTC](https://webrtc.org/native-code/native-apis/) - Audio stream for microphone input

## Contributing

New and existing issues can be viewed [here](https://github.com/altonelli/ava_voice_recognition/issues).

## Authors

* *Arthur Tonelli* - GitHub can be viewed [here](https://github.com/altonelli).
