'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

gulp.task('lint', function(){
  return gulp.src(['**/*.js','!node_modules/**'])
  .pipe(eslint()).pipe(eslint.format());
});

gulp.task('watch', () => {
  gulp.watch(['**/*.js', '!node_modules/**'], ['lint']);
  nodemon({
    script: 'server.js',
    ext: 'html js'
  })
   .on('restart', () => {
     console.log('restarting server');
   });
});


gulp.task('default', ['lint', 'watch']);
