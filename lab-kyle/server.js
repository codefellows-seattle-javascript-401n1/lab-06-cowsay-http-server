'use strict';

const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const parsebody = require('./lib/parseJson');
const cowsay = require('cowsay');

const port = process.argv[2] || 3000;

const server = http.createServer(function(req, res) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  console.log('req.body', req.body);
  //gets
  if (req.method === 'GET' && req.url.pathname === '/'){
    var slash = cowsay.say({text: 'API Endpoints:/cowsay'});
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.write(slash);
    res.end();
  }
  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    var words = cowsay.say({text: req.url.query.text});
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.write(words);
    res.end();
  }
  //posts
  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    parsebody(req).then( function() {
      var words = cowsay.say({text: req.url.query.text});
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(words);
      res.end();
    }).catch(function(err){
      err = cowsay.say({text: '400 BAD REQUEST'});
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(err);
      res.end();
    });
  }

});

server.listen(port, function(){
  console.log('server running on port: ' + port);
});
