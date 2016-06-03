'use strict';

const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const bodyParser = require('./lib/parse-req');
const cowsay = require('cowsay');

const port = process.argv[2] || 3000;
const error400 = {text: 'bad request\ntry: localhost:3000/api/cowsay?text=howdy&face=ghostbusters', face:'ghostbusters'};
const error404 = {text: 'route not found\ntry: localhost:3000/api/cowsay?text=howdy&face=ghostbusters', face:'ghostbusters'};

function buildCowRes(options, status, res) {
  res.writeHead(status, {
    'Content-Type': 'text/plain'
  });

  const face = options.face || 'default';
  res.write(cowsay.say({
    text: options.text.toString(),
    f: face
  }));
  res.end();
}

function defaultRes(res){
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write('API ENDPOINTS:\n/api/cowsay');
  res.end();
}

const server = http.createServer(function (req,res) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);

  if (req.url.path === '/') {
    defaultRes(res);
    return;
  }

  if (req.url.pathname === '/api/cowsay') {
    if (req.method === 'POST') {
      bodyParser.handlePost(req).then(function () {
        buildCowRes(req.body, 200, res);
      }).catch(function (err) {
        console.error('err', err);
        buildCowRes(error400, 400, res);
      });
    } else if (req.method === 'GET'){
      bodyParser.handleGet(req).then(function() {
        buildCowRes(req.body, 200, res);
      }).catch(function(err){
        console.error('err', err);
        buildCowRes(error400, 400, res);
      });
    }
  } else {
    buildCowRes(error404, 404, res);
  }

});

server.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
