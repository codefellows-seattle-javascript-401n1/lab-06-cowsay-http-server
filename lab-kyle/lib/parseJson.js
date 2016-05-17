'use strict';

module.exports = function(req) {
  return new Promise(function(resolve, reject) {
    req.body = '';
    console.log('got it');
    req.on('data', function(data) {
      req.body += data.toString();
    });
    req.on('end', function() {
      try {
        req.body = JSON.parse(req.body);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
};

/*
var body = [];
request.on('data', function(chunk) {
  body.push(chunk);
}).on('end', function() {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});*/
