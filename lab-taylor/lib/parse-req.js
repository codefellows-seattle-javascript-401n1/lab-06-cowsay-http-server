'use strict';

exports.handlePost = function (req) {
  return new Promise(function (resolve, reject) {
    req.body = '';
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
  });
};

exports.handleGet = function (req) {
  return new Promise(function (resolve, reject) {
    if (req.url.query.text){
      console.log('req.url.query', req.url.query);
      console.log('req.url', req.url);
      req.body = req.url.query;
      resolve();
    } else {
      reject(new Error('no text query found'));
    }
  });
};
