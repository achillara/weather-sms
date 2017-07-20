var express = require('express');
var router = express.Router();
var request = require('request');
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
/* GET weather  and send text message*/
getJSON('https://api.darksky.net/forecast/cc3552681f56541ce1119025296e547a/37.8267,-122.4233?exclude=currently,flags,currently,minutely,hourly', function (body) {
  var min = body.daily.data[0].temperatureMin;
  var max = body.daily.data[0].temperatureMax;
  console.log(min);
  console.log(max);
  client.messages.create({
    to: "+15103586200",
    from: "+12162087560",
    body: "test",
  }, function (err, message) {
    console.log(message.sid)

});
});


 router.get('/', function(req, res, next) {
   res.render('index', { title: 'WeatherSMS' });
});



module.exports = router;
