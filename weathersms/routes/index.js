var express = require('express');
var router = express.Router();
var request = require('request');
var cities = require('cities');
var accountSid = 'AC92b258153e7a934f8d9f04bae71407f3';
var authToken = '960c64b5b1c0134ce6ab4c3e969ca651';
var client = require('twilio')(accountSid, authToken);

function getJSON(url, callback) {
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      callback(body);
    }
  });
}

function createTextMessages(name, number,time,min, max) {
   client.messages.create({
    to: `${number}`,
    from: "+12162087560",
    body: "Hey, " + name +"! The weather today ranges from " + min + "F to " + max + "F!",
  }, function (err, message) {
    console.log(message.sid)
});

}
/* GET weather  and send text message*/
function getString(zipcode) {
  var lat = cities.zip_lookup(zipcode).latitude;
  var long = cities.zip_lookup(zipcode).longitude;
  let string = "https://api.darksky.net/forecast/cc3552681f56541ce1119025296e547a/" + lat + "," + long + "?exclude=currently,flags,currently,minutely,hourly";
  return string;
}


  router.post('/', function (req, res) {
    var name = req.body.name;
    var number = req.body.number;
    var zipcode = req.body.zipcode;
    var time = req.body.time;
    getJSON(getString(zipcode), function (body) {
      var min = Math.round(body.daily.data[0].temperatureMin);
      var max = Math.round(body.daily.data[0].temperatureMax);
      createTextMessages(name, number, time, min, max);
    }),
      res.send("Thanks ," + name + " for entering your information. You will now get a text daily at " + time + " on the weather for the day!");
 });

 router.get('/', function(req, res, next) {
   res.render('index', { title: 'WeatherSMS' });
 });

module.exports = router;
