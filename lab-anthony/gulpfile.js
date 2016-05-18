'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src(['*.js', 'lib/*.js', '!node_modules/*js'])
          .pipe(eslint())
          .pipe(eslint.format());
});

gulp.task('default',['lint']);

gulp.task('watch', function () {
  const watcher = gulp.watch(['*.js', 'test/*.js', 'lib/*.js', '!node_modules/*js'], ['lint']);
  watcher.on('change', function(e){
    console.log('The file '+e.path+' was '+e.type+', running tasks again:');
  });
});
