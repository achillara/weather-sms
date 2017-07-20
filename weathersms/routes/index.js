var express = require('express');
var router = express.Router();
var request = require('request');
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
  var min = Math.round(body.daily.data[0].temperatureMin);
  var max = Math.round(body.daily.data[0].temperatureMax);
  console.log(min);
  console.log(max);
  client.messages.create({
    to: "+15103586200",
    from: "+12162087560",
    body: "The weather today ranges from " + min + "F to " + max + "F!",
  }, function (err, message) {
    console.log(message.sid)
});
 });


 router.get('/', function(req, res, next) {
   res.render('index', { title: 'WeatherSMS' });
});



module.exports = router;
