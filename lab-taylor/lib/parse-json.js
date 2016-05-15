'use strict';

module.exports = function(req){
  return new Promise(function (resolve, reject) {
    req.body = '';
    if (req.method === 'POST') {
      req.on('data', function (chunk) {
        req.body += chunk.toString();
      });

      req.on('end', function () {
        try {
          req.body = JSON.parse(req.body);
          resolve();
        } catch (err) {
          reject (err);
        }
      });
    } else {
      console.log('req.url.query.text, ', req.url.query.text);
      if (req.url.query.text){
        req.body = req.url.query;
        resolve();
      } else {
        reject(new Error('not text query found'));
        reject();
      }
    }
  });
};
