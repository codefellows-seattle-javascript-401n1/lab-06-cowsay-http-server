'use strict';

const http = require('http');
const port = process.env.PORT || 3000;
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const bodyParser = require('./lib/bodyParser');
const cowsay = require('cowsay');

const server = http.createServer(function(req, res){
  req.url = parseUrl(req.url);
  console.log('req.url', req.url);
  req.url.query = parseQuery(req.url.query);
  console.log('req.method', req.method);

  if (req.url.pathname === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify('API Endpoints: \n /api/cowsay'));
    return res.end();
  }

  if(req.method ==='POST' && req.url.pathname ==='/api/cowsay'){
    bodyParser(req).then(function(){

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say(req.body));
      res.end();
    })
    .catch(function(){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text:'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
    });
  }

  if(req.method === 'GET' && req.url.pathname ==='/api/cowsay'){
    var textQuery = req.url.query.img;//
    console.log(textQuery);//

    if(textQuery){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text:textQuery}));
      res.end();
    }
    if(!textQuery){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text:'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
    }
  }
});

server.listen(port, function(){
  console.log('Server run~nning on port', port);
});
