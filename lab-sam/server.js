'use strict';
const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-json');

const port = process.argv[2] || 3000;

const server = http.createServer( (req, res) => {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);

  console.log('req:url', req.url);

  if(req.url.path === '/'){
    var word = cowsay.say({text: 'API Endpoints: /cowsay'});
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(word);
    res.end();
    return;
  }
  if(req.url.pathname === '/cowsay' && req.method === 'GET') {
    parseBody(req).then(function(){
      var words = cowsay.say({text: req.url.query.text});
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(words);
      res.end();
    }).catch(function(err){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      console.log('error', err);
      res.end();
    });
  }
  if(req.url.pathname === '/cowsay' && req.method === 'POST') {
    parseBody(req).then(function(){
      var data = req.body;
      var words = cowsay.say({text: data});
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(words);
      res.end();
    }).catch(function(err){
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      console.log('error', err);
      res.end();
    });
  }
});
server.listen(port, function(){
  console.log('server is running on port', port);
});
