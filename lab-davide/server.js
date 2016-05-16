
'use strict';

const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const cowsay = require('cowsay');

const port = process.argv[2] || 3000;


const server = http.createServer(function(req, res){
  req.url =  parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);



  console.log(req.url.query);
  console.log(req.url.path);
  console.log(req.url);
  console.log(req.url.query.text);
  if(req.url.pathname == '/cowsay' && req.method === 'GET' && req.url.query.text) {
    console.log('hello');
    var message = cowsay.say({text: req.url.query.text});
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(message);
    res.end();
    return;
  }

  if(req.url.pathname === '/cowsay' && req.method === 'POST') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(message);
    res.end();
    return;

  } else {
    var error = cowsay.say({text: ' bad request\ntry: localhost:3000' + req.url.href});
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.write(error);
    res.end();
  }
});



server.listen(port, function(){
  console.log('server is running on port', port);
});
