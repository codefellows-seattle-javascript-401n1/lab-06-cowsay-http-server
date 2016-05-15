const http = require('http');
// const parseurl = require('url').parse;
// const parsequery = require('queryString').parse;
// const cowsay = require('cowsay');

const port = process.argv[2] || 3000;

const server = http.createServer(function(req, res){
  console.log(req);
});
server.listen(port, function(){
  console.log('server running on port: ' + port);
});
/*
Create a body parser that uses Promises to parse the json in the body of POST, PUT, or DELETE requests
*/
  // req.url = parseUrl(req.url);
  // req.url.query = parseQuery(req.url.query);
