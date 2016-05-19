'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('eslint', () => {
  gulp.src(['**/*.js', '!node_modules/**'])
   .pipe(eslint())
   .pipe(eslint.format())
   .pipe(eslint.failAfterError());
});

gulp.watch(__dirname + '**/*.js', function(event){
  console.log('File ' + event.path + ' was ' + event.type);
});

gulp.task('default', ['eslint', 'watch'], () => {});
