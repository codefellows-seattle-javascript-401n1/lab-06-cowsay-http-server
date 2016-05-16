'use strict';

module.exports = function(req) {
  return new Promise (function(resolve, reject){
    req.body = '';
    req.on('data', function(data){
      req.url += data.toString();
    });
    req.on('end', function() {
      try {
        req.path = JSON.parse(req.body);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
};
