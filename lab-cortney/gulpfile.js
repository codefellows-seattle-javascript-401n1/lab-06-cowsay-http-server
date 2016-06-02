'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('default', function(){
  return gulp.src(__dirname + '/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch(__dirname + '/*.js', !'mode_modules/', ['default'], function(event){
    console.log('File ' + event.path + ' was changed, running tasks...');
  });
});
