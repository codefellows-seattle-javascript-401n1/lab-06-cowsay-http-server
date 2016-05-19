'use strict';

module.exports = function(req){
  return new Promise(function(resolve, reject){
    req.body = '';
    req.on('data', function(chunk){
      req.body += chunk.toString();
    });
    req.on('end', function(){
      try {
        //complete req.body JSON object
        req.body = JSON.parse(req.body);
        console.log('req body shoudl be an object: ', req.body);
        resolve();
      } catch(err){
        reject(err);
      }
    });
  });
};
