'use strict';

const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const bodyParser = require('./lib/parse-req');
const cowsay = require('cowsay');

const port = process.argv[2] || 3000;
const badReq = 'bad request\ntry: localhost:3000/cowsay?text=howdy';

function buildCowRes(data, status, res) {
  res.writeHead(status, {
    'Content-Type': 'text/plain'
  });
  res.write(cowsay.say({text: data.toString()}));
  res.end();
}

function defaultRes(res){
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write('API ENDPOINTS:\n/cowsay');
  res.end();
}

const server = http.createServer(function (req,res) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);

  if (req.url.path === '/') {
    defaultRes(res);
    return;
  }

  if (req.url.pathname === '/cowsay') {
    if (req.method === 'POST') {
      bodyParser.handlePost(req).then(function () {
        buildCowRes(req.body.text, 200, res);
      }).catch(function (err) {
        console.error('err', err);
        buildCowRes(badReq, 400, res);
      });
    } else if (req.method === 'GET'){
      bodyParser.handleGet(req).then(function() {
        buildCowRes(req.body.text, 200, res);
      }).catch(function(err){
        console.error('err', err);
        buildCowRes(badReq, 400, res);
      });
    }
  } else {
    buildCowRes(badReq, 400, res);
  }

});

server.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
