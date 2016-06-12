const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const cowsay = require('cowsay');
const getContent = require(__dirname + '/lib/getContent');

const port = process.argv[2] || 3000;

const server = http.createServer(function(req, res){
  //convert from string to object
  req.url = parseUrl(req.url);
  /*convert a query string to an object within the req.url object*/
  req.url.query = parseQuery(req.url.query);

  if(req.url.pathname === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API Endpoints:/api/cowsay');
    res.end();
  }
  if(req.url.pathname === '/cowsay' && req.method == 'GET' ) {
    //http localhost:3000/cowsay 'text==addanytext'
    if (req.url.query['text']){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text : req.url.query['text']}));
      res.end();
    } else {
      //http localhost:3000/cowsay 'text==say'
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=saywat'}));
      res.end();
    }
  }

  if(req.url.pathname == '/cowsay' && req.method == 'POST') {
    //http POST localhost:3000/cowsay  text==test < junk.json
    if (req.url.query['text'] && req.headers['content-type'] === 'application/json') {
      getContent(req)
      .then(function(){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(req.body));
        res.write(cowsay.say({text : 'test'}));
        res.end();
      }).catch(function(err){
        res.writeHead(400, {'Content-Type': 'application/json' });
        res.write(JSON.stringify(err));
        res.end();
      });
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=saywat'}));
      res.end();
    }
  }
});

server.listen(port, function(){
  console.log('server running on port: ' + port);
});
