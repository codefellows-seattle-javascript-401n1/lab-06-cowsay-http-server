'use stict';

const cowsay = require('cowsay');
const http = require('http');
const urlParse = require('url').parse;
const queryParse = require('querystring').parse;

const bodyParse = require('./lib/bodyParse');
const PORT = process.argv[2] || 3000;

const server = http.createServer(function(req, res) {
  req.url = urlParse(req.url); //parses the URL
  req.url.query = queryParse(req.url.query); //parses the query from url

  console.log('req.method', req.method);

  if(/(PUT|POST|DELETE)/.test(req.method)){
    bodyParse(req).then(function() { //handles promise success
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say(JSON.stringify(req.body)));
      res.end();
    }).catch(function(err) { //handles promise failure
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.write(cowsay.say({'text': 'bad request ' + err + '\ntry localhost:3000/cowsay?text=yourmessagehere'}));
      res.end();
    });
  }

  if(req.url.pathname === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API endpoint:\n /cowsay');
    res.end();
  }

  if(req.url.pathname === '/cowsay') {
    var query = req.url.query.text;
    console.log(query);
    if(query == undefined) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'write me a query!'}));
      res.end();
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({text: query}));
    res.end();
  }
});

server.listen(PORT, function() {
  console.log('cowsay server running on port', PORT);
});
