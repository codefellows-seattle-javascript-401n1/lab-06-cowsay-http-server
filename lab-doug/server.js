const http = require('http');
const parseurl = require('url').parse;
const parsequery = require('queryString').parse;
const cowsay = require('cowsay');

const port = process.argv[2] || 3000;

const server = http.createServer(function(req, res){

  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);

  res.writeHead(200);
  res.write('hello from basic http server');
  res.end();

  console.log('req url ', req.url);
});

server.listen(port, function(){
  console.log('soemthing');
});
