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
    var slash = cowsay.say({f: 'dragon' , text: 'API Endpoints:/cowsay'});
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.write(slash);
    res.end();
  } else if (req.method === 'GET' && req.url.pathname === '/api/cowsay' && req.url.query.text) {
    var words = cowsay.say({f:'dragon', text: req.url.query.text});
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.write(words);
    res.end();
  } else if(/(POST|PUT|DELETE)/.test(req.method) && req.url.pathname === '/api/cowsay') {
    parseBody(req).then(function() {
      console.log('did i make it?');
      console.log('req.body: ', req.body);
      res.writeHead(200);
      res.write(cowsay.say({text: req.body.text}));
      res.end();
    }).catch(function(err) {
      res.writeHead(400);
      console.error(err);
      res.write(cowsay.say({text: 'bad request yo'}));
      res.end();
    });
  } else {
    var badRequest = cowsay.say({f:'dragon', text: 'bad request'});
    res.writeHead(400, {'Content-type': 'text/plain'});
    res.write(badRequest);
    res.end();
  }




});

server.listen(port, function(){
  console.log('server running on port: ' + port);
});
