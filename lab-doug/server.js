const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
//const cowsay = require('cowsay');

const port = process.argv[2] || 3000;

const server = http.createServer(function(req, res){
    req.url = parseUrl(req.url);
    req.url.query = parseQuery(req.url.query);

  if(req.url.pathname == '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API Endpoints:/api/cowsay');
    res.end();
    console.log('log pathname: ' + req.url.pathname);
// res: Content-Type: text/plain
// status code of 200
// res.write('API Endpoints:/api/cowsay'))
  }
  if(req.url.pathname == '/cowsay'){
    console.log('log pathname: ' + req.url.pathname);
  }

});

  server.listen(port, function(){
    console.log('server running on port: ' + port);
  });
