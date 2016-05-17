'use strict';

const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const parseBody = require('./lib/parseJson');
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
  if(/(POST|PUT|DELETE)/.test(req.method)) {
    parseBody(req).then(function() {
      console.log('did i make it?');
      console.log('req.body: ', req.body);
      res.writeHead(200);
      res.write(cowsay.say(req.body));
      res.end();
    }).catch(function(err) {
      res.writeHead(400);
      res.write(cowsay.say(err));
      res.end();
    });
  }

});

server.listen(port, function(){
  console.log('server running on port: ' + port);
});
