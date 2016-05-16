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
  }

  if(pathname == '/cowsay') {
    if(req.method == 'GET'){
      res.writeHead(200,{'Content-Type' : 'text/plain'});
      res.write(cowsay.say({text:query.text + ' GET'}));
    }
    else if(req.method == 'POST'){
      res.writeHead(200,{'Content-Type' : 'text/plain'});
      res.write(cowsay.say({text:query.text + ' POST'}));
    }
    res.end();
  }
  // else if(/(PUT|POST|DELETE)/.test(req.method)){
  //   parseBody(req).then(function(){
  //     console.log("test");
  //     console.log(req);
  //     // res.writeHead(200, {'Content-Type' : 'text/plain'});
  //     // res.write(cowsay.say({text: query}));
  //     // // cowsay.say({text: <querystring text>}
  //     // // res.write(JSON.stringify(req.body));
  //     // res.end();
  //   })
  //   .catch(function(){
  //     res.writeHead(400,{'content-Type':'text/plain'});
  //     res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
  //   });
  // }

});

server.listen(port, function(){
  console.log('server is running on port', port);
});
