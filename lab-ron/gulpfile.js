'use strict';

const gulp = require ('gulp');
const eslint = require('gulp-eslint');
// const watch = require ('gulp-watch');

gulp.task('eslint', function (){
  return gulp.src(['index.js', 'lib/*.js', 'test/greet-test.js']).pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('default', ['eslint']);
