'use strict';

const http = require('http');
const port = process.argv[2] || 3000;
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const bodyParser = require('./lib/bodyParser');
const cowsay = require('cowsay');

const server = http.createServer(function(req, res){
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  console.log('req.method', req.method);

  if (req.url === '/'){
    // bodyParser(req).then(function(){
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.write('API Endpoints:\n','/api/cowsay');
    return res.end();
    // });
  }

  if(req.method === 'GET' && req.url ==='/cowsay'){
    bodyParser(req).then(function(){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({
        text: 'mooo~',
        e:'o*',
        T:'U'
      }));
      return res.end();
    }).catch(function(err){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text:'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      console.log('ERROR!', err);
      return res.end();
    });
  }

  if(req.method ==='POST' && req.url ==='/cowsay'){
    bodyParser(req).then(function(){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay({
        text: 'meowW~',
        e:'^^',
        T:'J'
      }));
      return res.end();
    }).catch(function(err){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text:'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      console.log('ERROR!', err);
      return res.end();
    });
  }

});
server.listen(port, function(){
  console.log('Server run~nning on port', port);
});
