'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const eslint = require('gulp-eslint');


gulp.task('default', function(){
  return gulp.src('*.js', '[default]');
});

gulp.task('watch', function (){
  gulp.watch('*.js', ['default']);
});

gulp.task('eslint', function(){
  return gulp.src(['**/*.js','!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});



gulp.task('default', ['watch', 'eslint']);
