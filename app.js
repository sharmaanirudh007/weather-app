var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended:false});

var app = express();
app.use(express.static('./public'));

app.post('/weather-custom',urlencodedParser,function(req,res){
  var encoded = encodeURIComponent(req.body.place)
request({

        url:`https://maps.googleapis.com/maps/api/geocode/json?&address=${encoded}`,
        json:true
      },function (error,response,body){
        console.log(JSON.stringify(body.results[0].geometry.location.lat,undefined,2));
        console.log(JSON.stringify(body.results[0].geometry.location.lng,undefined,2));
        request({
          url:`https://api.darksky.net/forecast/ae0b150bf1e5159eae41727eb62d230b/${body.results[0].geometry.location.lat},${body.results[0].geometry.location.lng}`,
          json:true
        },function (error,response,body){
          var data = {temp:body.currently};
          //console.log(JSON.stringify(body.timezone,undefined,2));
          console.log(JSON.stringify(body.currently.temperature,undefined,2));
          console.log(JSON.stringify(body.currently.humidity,undefined,2));

            //var data2 = {city:body.results[6].formatted_address};

          res.json(data);
        });

});
});
app.post('/weather',urlencodedParser, function(req,res){

console.log(req.body.latitude);
console.log(req.body.longitude);
          request({
            url:`https://api.darksky.net/forecast/ae0b150bf1e5159eae41727eb62d230b/${req.body.latitude},${req.body.longitude}`,
            json:true
          },function (error,response,body){
            var data1 = {temp:body.currently};
            //console.log(JSON.stringify(body.timezone,undefined,2));
            console.log(JSON.stringify(body.currently.temperature,undefined,2));
            request({
              url:`https://maps.googleapis.com/maps/api/geocode/json?&address=${req.body.latitude},${req.body.longitude}`,
              json:true
            },function (error,response,body){
              var data2 = {city:body.results[6].formatted_address};
              console.log(JSON.stringify(body.results[6].formatted_address,undefined,2));

              var data ={data1:data1,data2:data2};
              res.json(data);
            });

          });

});
app.listen(3000);
