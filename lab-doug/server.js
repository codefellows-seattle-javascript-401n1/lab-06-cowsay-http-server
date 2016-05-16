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
  if(req.url.pathname == '/cowsay' && req.method == 'GET' ) {

    if (req.url.query['text'] === 'saywat'){
      console.log('GET req header: ', req.headers);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text : req.url.query['text']}));
      res.end();

    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=saywat'}));
      res.end();
    }
  }

  if(req.url.pathname == '/cowsay' && req.method == 'POST') {
    console.log('POST req header: ', req.headers);
    if(req.headers['content-type'] == 'application/json'){
      console.log('the POST json header detection worked');
    }
  }
    //   if (req.url.query['text'] === 'userdata'){
    //     if(req.url.query['Content-Type'] == 'application/json {text: userdata}'){
    //     res.writeHead(200, {'Content-Type': 'text/plain'});
    //     res.write(cowsay.say({text : req.url.query['text']}));
    //     res.end();
    //   } else {
    //       res.writeHead(400, {'Content-Type': 'text/plain'});
    //       res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=userdata'}));
    //       res.end();
    //     }
    //   }
    // }
});
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



server.listen(port, function(){
  console.log('server running on port: ' + port);
});
