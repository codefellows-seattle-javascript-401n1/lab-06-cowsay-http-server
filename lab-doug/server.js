const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const parseSearch = require('url').search;
const cowsay = require('cowsay');

const port = process.argv[2] || 3000;

const server = http.createServer(function(req, res){
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);

  if(req.url.pathname == '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API Endpoints:/api/cowsay');
    res.end();
  }
  if(req.url.pathname == '/cowsay') {
    if (req.method == 'GET' && req.url.query['text'] === 'saywat'){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text : req.url.query['text']}));
      res.end();

    } else if (req.method == 'GET') {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: ''}));
      res.end();
    }
    if(req.url.pathname == '/cowsay') {
      if (req.method == 'POST' && req.url.query['text'] === 'userdata'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text : req.url.query['text']}));
        res.end();

  }
//   POST REQUEST
//
// the query string should have the key value text=<message>
// the response header should include Content-Type: text/plain
// if the json {text: messsage} is set, respond with:
// a status code of 200
// a body including the value returned from cowsay.say({text: <querystring text>})
// if the json{text: messsage}is not set, respond with:
// status code = 400
// a body including the value returned from cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})

});

server.listen(port, function(){
  console.log('server running on port: ' + port);
});
