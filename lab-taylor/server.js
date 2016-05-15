'use strict';

const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const bodyParser = require('./lib/parse-json');
const cowsay = require('cowsay');

const port = process.argv[2] || 3000;

function buildRes(data, res) {
  res.write(cowsay.say({text: data.toString()}));
  res.end();
}

function defaultRes(res){
  res.writeHead(200);
  res.write('API ENDPOINTS:\n/cowsay');
  res.end();
}

const server = http.createServer(function (req,res) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);

  if (req.url.path === '/') {
    defaultRes(res);
  }

  if (req.url.pathname === '/cowsay') {
    bodyParser(req).then(function () {

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      buildRes(req.body.text, res);
    }).catch(function (err) {
      console.log('err', err);

      res.writeHead(400, {
        'Content-Type':'text/plain'
      });
      buildRes('bad request\ntry: localhost:3000/cowsay?text=howdy', res);
    });
  }


  // 1. detect path
  // 2. if `/` then respond with endpoints
  // 3. if `/cowsay` then detect method
  // 4. process depending on method.
});

server.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
