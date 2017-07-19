var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

request('https://api.darksky.net/forecast/cc3552681f56541ce1119025296e547a/37.8267,-122.4233?exclude=currently,flags,currently,minutely,hourly', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        var info = JSON.parse(body);
        console.log(info.daily.data[0].temperatureMin);
        console.log(info.daily.data[0].temperatureMax);

});

module.exports = router;
