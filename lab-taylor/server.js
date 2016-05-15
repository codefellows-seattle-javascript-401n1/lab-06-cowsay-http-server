'use strict';

const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const cowsay = require('cowsay');

const port = process.argv[2] || 3000;

const server = http.createServer(function (req,res) {
  req.url = parseUrl(req.url);
  req.query = parseQuery(req.query);

  console.log('req', req.url);

  if (req.url.path === '/') {
    res.writeHead(200);
    res.write('API ENDPOINTS:\n/cowsay');
    res.end();
  }


  // 1. detect path
  // 2. if `/` then respond with endpoints
  // 3. if `/cowsay` then detect method
  // 4. process depending on method.
});

server.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
