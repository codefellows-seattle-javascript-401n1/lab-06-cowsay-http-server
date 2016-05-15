'use strict';
const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-json');

const port = process.argv[2] || 3000

const server = http.createServer( (req, res) => {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);

  console.log('req:url', req.url);

  if(req.url.path === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({text: 'API Endpoints: /cowsay'});
    res.end();
    return;
  };
  if(req.url.pathname === '/cowsay' && req.method === 'GET') {
    var words = cowsay.say({text: req.url.query.text})
    console.log('req.method', req.method);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(words);
    res.end();
  };
  if(req.url.pathname === '/cowsay' && req.method === 'POST') {
    var words = cowsay.say({text: req.url.query.text})
    console.log('req.method', req.method);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('POST' + req.url.query.text);
    res.end();
  };
});
server.listen(port, function(){
  console.log('server is running on port', port);
});
