'use strict';

module.exports = function(req){
  return new Promise(function(resolve, reject){
    console.log('promised called');
    req.body = '';
    console.log('empty string req body: ', req.body);
    req.on('data', function(chunk){
      req.body += chunk.toString();
    });
    req.on('end', function(){
      try {
        console.log('try called');
        req.body = JSON.parse(req.body);
        console.log('the parsed body: ', req.body);
        resolve();
      } catch(err){
        reject(err);
      }
    });
  });
};
