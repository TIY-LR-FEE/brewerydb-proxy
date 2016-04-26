var http = require('http');
var httpProxy = require('http-proxy');
var url = require('url');

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function(req, res) {

    var parsedUrl = url.parse(req.url, true);

    parsedUrl.query.key = process.env.BREWERYDB_KEY;
    parsedUrl.search = null;
    req.url = url.format(parsedUrl);

    proxy.web(req, res, {
        target: 'http://api.brewerydb.com/v2/'
    });

});

server.listen(process.env.PORT || 8000);
