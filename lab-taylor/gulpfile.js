'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

gulp.task('runLint', () => {
  return gulp.src(['**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch(['**/*.js', '!node_modules/**'], ['runLint']);
  nodemon({
    script: 'server.js',
    ext: 'html js'
  })
  .on('restart', () => {
    console.log('restarting server');
  });
});

gulp.task('default', ['runLint', 'watch'], () => {
});
