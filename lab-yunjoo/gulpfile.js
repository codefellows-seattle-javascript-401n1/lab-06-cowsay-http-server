const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('lint', function(){
  return gulp.src(['*.js'])
  .pipe(eslint().pipe(eslint.format()))
  .pipe(eslint.failAfterError());
});

gulp.task('mocha', function(){
  return gulp.src(['*.js'])
  .pipe(mocha());
});

gulp.task('checking', function(){
  gulp.watch(['*.js'],['lint','mocha']);
});

gulp.task('default',['lint','mocha','checking']);
