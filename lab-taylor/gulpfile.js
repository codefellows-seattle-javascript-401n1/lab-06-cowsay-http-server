'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('runLint', () => {
  return gulp.src(['**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch(['**/*.js', '!node_modules/**'], ['runTests', 'runLint']);
});

gulp.task('default', ['runLint', 'watch'], () => {
});
