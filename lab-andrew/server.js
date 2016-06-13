'use strict';

const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-text');

const port = process.argv[2] || 3000;

const server = http.createServer(function(req, res) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);



  if (req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API endpoints: \n/cowsay');
    res.end();
    return this;
  }


  if(req.url.pathname === '/cowsay' && req.method === 'POST') {
    console.log(`Should be POST: ${req.method}`);
    parseBody(req).then(function() {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say(req.body));
      res.end();
    }).catch(function() {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({f: 'ghostbusters', text: '400 bad request\nTry: localhost:3000/cowsay?text="sup Trolls"'}));
      res.end();

    });
  }

  console.log(req.url.pathname);
  if(req.url.pathname ==='/cowsay' && req.method === 'GET') {
    console.log(`Should be: GET ${req.method}`);
    var newQuery = req.url.query.text;
    console.log(req.url.query.text);
    if (!req.url.query.text) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({f: 'ghostbusters', text: '400 bad request\nTry: localhost:3000/cowsay?text="sup Trolls"'}));
      res.end();
      return;
    }
    if (req.url.query.text) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: newQuery}));
      res.end();
      return;
    }
  }


  res.writeHead(400, {'Content-Type': 'application/json'});
  res.write(cowsay.say({f: 'ghostbusters', tesxt: '400 bad request\nTry: localhost:3000/cowsay?text="sup Trolls"'}));
  res.end();
});

server.listen(port, function() {
  console.log(`server is running on port ${port}`);
});
