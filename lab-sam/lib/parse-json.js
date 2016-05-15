'use strict';

module.exports = function(req){
  return new Promise(function(reslove, reject){
    req.body = '';
    req.on('data', function(data){
      req.body += data.toString();
    });

    req.on('end', function(){
      try {
        reslove();
      } catch (err){
        reject(err);
      }
    });
  });
};
