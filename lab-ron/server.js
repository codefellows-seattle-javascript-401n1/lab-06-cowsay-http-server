'use strict';

const http = require('http');
const cowsay = require('cowsay');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const parseBody = require('./lib/parse-json');
const port = process.argv[2]||3000;

var server = http.createServer(function(req,res){
  req.url = parseUrl(req.url);
  var pathname = req.url.pathname;
  var query = req.url.query = parseQuery(req.url.query);

  if(pathname === '/'){
    res.writeHead(200,{'Content-Type' : 'text/plain'});
    res.write(cowsay.say({f: 'dragon', text:'Welcome to our Dragon world'}));
    return res.end();

  } else if(pathname === '/cowsay') {
    if(req.method === 'GET'){
      try{
        parseBody(req);
        res.writeHead(200,{'Content-Type' : 'text/plain'});
        res.write(cowsay.say({f:'dragon-and-cow', text:query.text}));
      } catch(error){
        res.writeHead(400, {'Content-Type':'text/plain'});
        res.write(cowsay.say({text: 'bad request Entry: localhost:3000/cowsay?text=howdy'}));
      }
    } else if(req.method === 'POST'){
      res.writeHead(200,{'Content-Type' : 'text/plain'});
      res.write(cowsay.say({f:'stegosaurus', text:query.text}));
    }
    res.end();
    return;
  } else {
    res.writeHead(400, {'Content-Type':'text/plain'});
    res.write(cowsay.say({text: 'bad request Entry: localhost:3000/cowsay?text=howdy'}));
  }
});

server.listen(port, function() {
  console.log('the server has started', port);
});
