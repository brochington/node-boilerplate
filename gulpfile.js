var gulp = require('gulp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var Cache = require('gulp-file-cache');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack-stream');
var del = require('del');

var cache = new Cache();

gulp.task('clean-dist', function(cb) {
	del(['dist/**']).then(function() {
    cb();
  });
});

gulp.task('build', function() {
  var stream = gulp.src('./src/**/*.js')
          .pipe(plumber())
          .pipe(cache.filter())
          .pipe(babel({
            presets: ["es2015-node6", "es2017"]
          }))
          .pipe(cache.cache())
          .pipe(gulp.dest('./dist'));

  return stream;
});

gulp.task('demon', function() {
  var stream = nodemon({
		script: 'dist/',
    watch: 'src',
		ext: 'js',
		env: {'NODE_ENV': 'development'},
		tasks: ['build']
	});

  return stream;
});

gulp.task('dev', ['build', 'demon']);
