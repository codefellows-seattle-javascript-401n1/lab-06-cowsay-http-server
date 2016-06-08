'use strict';

const http = require('http');
const cowsay = require('cowsay');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const parseBody = require('./lib/parse-json');
const port = process.argv[2]||3000;

//create server
var server = http.createServer(function(req,res){
  req.url = parseUrl(req.url);
  var pathname = req.url.pathname;
// when you connect send welcome message
  if (pathname == '/') {
    res.writeHead(200,{'Content-Type' : 'text/plain'});
    res.write(cowsay.say({text:'Welcome to The cow world'}));
    res.end();
    return;
  }
  //if receive request endpoint '/cowsay' then check request method is GET or Post
  if (pathname === '/cowsay') {
//if it's GET method then sned the text
    if(req.method === 'GET'){
      try {
        var query = parseQuery(req.url.query);
        if(!query.text) throw Error();
        res.writeHead(200,{'Content-Type' : 'text/plain'});
        res.write(cowsay.say({text:query.text + ' GET'}));
        res.end();
      } catch(error) {
        res.writeHead(400,{'content-Type':'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
        res.end();
      }
    //if it's POST method then send post text and if it's not
    } else if(req.method === 'POST'){
      parseBody(req)
        .then(() => {
          // console.log(req);
          res.writeHead(200,{'Content-Type' : 'text/plain'});
          res.write(cowsay.say({text:req.body.text + ' POST'}));
          res.end();
        })
        .catch((error) => {
          console.log(error);
          res.writeHead(400,{'Content-Type':'text/plain'});
          res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
          res.end();
        });
    }
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
