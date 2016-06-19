'use strict';

const gulp = require ('gulp');
const eslint = require('gulp-eslint');
const mocha = require('mocha');
// const watch = require ('gulp-watch');

gulp.task('lint', function (){
  return gulp.src(['index.js', 'lib/*.js', 'test/greet-test.js']).pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});
gulp.task('mocha', function(){
  return gulp.src(['*.js']).pipe(mocha());
});
gulp.task('watch', function(){
  gulp.watch(['*.js'], ['lint', 'mocha']);
});
gulp.task('default', ['lint', 'mocha', 'watch']);
