'use strict';

const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const parseBody = require('./lib/parseJson');

const cowsay = require('cowsay');

const port = process.argv[2] || 3000;


const server = http.createServer(function(req, res){
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);

// handling requests to localhost:3000 without any endpoint
  if (req.url.pathname === '/' && !/(PUT|POST|DELETE)/.test(req.method)) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({f: 'moofasa', text: 'Welcome, and moorawr! Let\'s type a query! Like this:'+
    '\n'+'localhost:3000/cowsay?text=yeahletsgo'}));
    res.end();
    return;
  }

// handling a query with an endpoint and...text!
  if (req.url.pathname === '/cowsay?text=', req.url.query.text) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({text: req.url.query.text}));
    res.end();
    return;
  }

// handling POST, PUT, DELETE requests
  if(req.url.pathname === '/' && /(PUT|POST|DELETE)/.test(req.method)) {
    parseBody(req).then(function(){
      var newText = req.url.query.text;
      console.log(newText);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(req.body));
      res.write(cowsay.say({text: req.body.text}));
      res.end();
      return;
    });
  }
// if the POST, PUT or DELETE request isn't done correctly
  else {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({f: 'turtle', text: 'Hey you! Try typing a query! Like this:'+
    '\n'+'localhost:3000/cowsay?text=awesomepossum'}));
    res.end();
  }
});

server.listen(port, function(){
  console.log('server started on port:', port);
});
