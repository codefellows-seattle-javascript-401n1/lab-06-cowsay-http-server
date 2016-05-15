const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
//const cowsay = require('cowsay');

const port = process.argv[2] || 3000;

const server = http.createServer(function(req, res){
    req.url = parseUrl(req.url);
    req.url.query = parseQuery(req.url.query);

  if(req.url.pathname == '/'){
    console.log('log pathname: ' + req.url.pathname);
  }
  if(req.url.pathname == '/cowsay'){
    console.log('log pathname: ' + req.url.pathname);
  }
  //if GET and pathname is /cowsay then response is =
});

  server.listen(port, function(){
    console.log('server running on port: ' + port);
  });
