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
  }
  if(req.url.pathname == '/cowsay'){
    if (req.method == 'GET'){
      console.log('cowsay pathname: ' + req.url.pathname);
      console.log('cowsay method is GET');
    } if (req.url.query){
      console.log('query string does exist');
    }

// the query string should have the key value text=<message>
// the response header should include Content-Type: text/plain
// if the query text=messsage is set, respond with:
// a status code of 200
// a body including the value returned from cowsay.say({text: <querystring text>})
// if the query text=message is not set, respond with:
// status code = 400
// a body including the value returned from cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})

  }

});

  server.listen(port, function(){
    console.log('server running on port: ' + port);
  });
