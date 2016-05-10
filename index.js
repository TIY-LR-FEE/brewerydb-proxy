var express = require('express');
var request = require('request');
var app = express();
var url = require('url');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('*', function(req, res) {
  var parsedUrl = url.parse(req.url, true);

  parsedUrl.query.key = process.env.BREWERYDB_KEY;
  parsedUrl.search = null;
  req.url = url.format(parsedUrl);

  console.log("Proxying request for " + req.url);

  request('https://api.brewerydb.com' + req.url, function (error, response, body) {
    res.send(body);
   });
});

app.listen(process.env.PORT || 8000);
