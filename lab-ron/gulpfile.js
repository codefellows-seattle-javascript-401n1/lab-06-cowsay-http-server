'use strict';

const gulp = require ('gulp');
const eslint = require('gulp-eslint');

// const watch = require ('gulp-watch');

gulp.task('lint', function (){
  return gulp.src(['index.js', 'lib/*.js']).pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('watch', function(){
  gulp.watch(['server.js'], ['lint']);
});
gulp.task('default', ['lint', 'watch']);
