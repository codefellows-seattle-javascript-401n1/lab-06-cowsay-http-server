'use strict';

const http = require('http');
const urlParser = require('url').parse;
const queryParser = require('querystring').parse;
const cowsay = require('cowsay');
const bodyParser = require('./lib/parse-json.js');


const PORT = process.argv[2] || 3000;

const server = http.createServer(function(req, res) {
  req.url = urlParser(req.url);
  req.url.query = queryParser(req.url.query);

  if(req.method === 'POST') {
    bodyParser(req).then(function() {
      res.writeHead(200);
      res.write(cowsay.say(req.body));
      res.end();
    }).catch(function(err) {
      res.writeHead(400);
      res.write(cowsay.say(err));
      res.end();
    });
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    var newQuery = '' + req.url.query.text;
    if (newQuery === 'undefined') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'Write a query to make me say something!'}));
      res.end();
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({text: newQuery}));
    res.end();
  }

  if (req.method === 'GET' &&req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API Endpoints:\n /cowsay');
    res.end();
  }
});

server.listen(PORT, function() {
  console.log('Server started on port ', PORT);
});
