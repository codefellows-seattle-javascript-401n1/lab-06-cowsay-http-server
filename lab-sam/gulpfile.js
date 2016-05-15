var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('default', ['lint'],  function() {
});

gulp.task('lint', function(){
  return gulp.src(['**/*.js','!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

var watcher = gulp.watch([__dirname + '**/*.js', '!node_modules/**', '!package.json'], ['lint']);
watcher.on('change', function(event){
  console.log(event.path + ' was ' + event.type + ', running tasks...');
});
