'use strict';

module.exports = function(req){
  return new Promise(function(resolve, reject){
    req.body = '';
    req.on('data', function(data){
      req.body +=data.toString();
    });

    req.on('end', function(){
      try {
        // throw new err('whaa~?')
        req.body = JSON.parse(req.body);
        resolve();
        // next();
      } catch (err){
        reject(err);
      }
    });
  });
};
