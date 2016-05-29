'use strict';

const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const cowsay = require('cowsay');

const parseBody = require('./lib/parse-json');

const port = process.argv[2] || 5000;

const server = http.createServer(function(req, res){
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  if(req.url.pathname === '/'){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('API Endpoints:\n ' + '/cowsay\n');
    res.end();
    return;
  }

  if(req.method === 'POST' || 'PUT' || 'DELETE'){
    parseBody(req).then(function(){
      if(req.url.pathname === '/api/cowsay'){
        res.write(cowsay.say({text: JSON.stringify(req.body.user) || 'Sup Blood'}));
        res.end();
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('URL NOT FOUND');
        res.end();
      }

    }).catch(function(err){
      console.log('this is the error: ' + err);
    });

  }
  if (req.method === 'GET'){
    if(req.url.pathname === '/api/cowsay'){
      res.write(cowsay.say({text: JSON.stringify(req.url.query.text) || 'Sup Blood'}));
      res.end();

    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('URL NOT FOUND');
      res.end();
    }

  }

});


server.listen(port, function(){
  console.log('Server is running ' + port);
});
