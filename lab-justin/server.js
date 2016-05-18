'use strict';

const http = require('http');
const port = process.env.PORT || 3000;
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const bodyParser = require('./lib/bodyParser');
const cowsay = require('cowsay');

const server = http.createServer(function(req, res){
  req.url = parseUrl(req.url);
  // console.log('req.url', req.url);
  req.url.query = parseQuery(req.url.query);
  // console.log('req.url.query', req.url.query);
  console.log('req.method', req.method);

  if (req.url.pathname === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API Endpoints: \n /api/cowsay');
    return res.end();
  }

  if(req.method === 'GET' && req.url.pathname ==='/api/cowsay'){
    bodyParser(req).then(function(){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      // res.write('OK');
      res.write(cowsay.say({
        text: 'mooo~',
        e:'o*',
        T:'U'
      }));
      return res.end();
    })
    .catch(function(err){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text:'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      console.error('ERROR!', err);
      return res.end();
    });
  }

  if(req.method ==='POST' && req.url.pathname ==='/api/cowsay'){
    bodyParser(req).then(function(){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      // res.write('nah');
      res.write(cowsay.say({
        text: 'meowW~',
        e:'^^',
        T:'J'
      }));
      return res.end();
    })
    .catch(function(err){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text:'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      console.error('ERROR!', err);
      return res.end();
    });
  }
});

server.listen(port, function(){
  console.log('Server run~nning on port', port);
});
