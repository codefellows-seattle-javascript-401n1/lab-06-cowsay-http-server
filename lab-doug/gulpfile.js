'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

const paths = ['*.js', 'lib/*.js'];

gulp.task('eslint', function() {
  gulp.src(paths)
   .pipe(eslint())
   .pipe(eslint.format())
   .pipe(eslint.failAfterError());
});

gulp.task('nodemon', function(){
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});


gulp.watch(__dirname + '**/*.js', function(event){
  console.log('File ' + event.path + ' was ' + event.type);
});

gulp.task('default', ['eslint'], () => {});
