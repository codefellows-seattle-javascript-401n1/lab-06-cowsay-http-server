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
  if(pathname == '/'){
    res.writeHead(200,{'Content-Type' : 'text/plain'});
    res.write(cowsay.say({text:'Welcome to The cow world'}));
    res.end();
    return;
  } else if(pathname == '/cowsay') {
    if(req.method == 'GET'){
      try {
        parseBody(req);
        console.log(parseBody(req));
        res.writeHead(200,{'Content-Type' : 'text/plain'});
        res.write(cowsay.say({text:query.text + ' GET'}));
      } catch(error) {
        res.writeHead(400,{'content-Type':'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      }
    } else if(req.method == 'POST'){
      res.writeHead(200,{'Content-Type' : 'text/plain'});
      res.write(cowsay.say({text:query.text + ' POST'}));
    }
    res.end();
    return;
  } else {
    res.writeHead(400,{'content-Type':'text/plain'});
    res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
    res.end();
    return;    
  }
});



server.listen(port, function(){
  console.log('server is running on port', port);
});
