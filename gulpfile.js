var gulp = require('gulp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var Cache = require('gulp-file-cache');
var nodemon = require('gulp-nodemon');
var del = require('del');
var mkdirp = require('mkdirp');
var runSequence = require('run-sequence');

var cache = new Cache();

gulp.task('clean-dist', function() {
	return del(['dist/**']);
});

gulp.task('make-dist', function(cb) {
  mkdirp('./dist', cb)
})

gulp.task('build', function() {
  return gulp.src('./src/**/*.js')
          .pipe(plumber())
          .pipe(cache.filter())
          .pipe(babel({
            presets: ["es2015-node6", "es2017"]
          }))
          .pipe(cache.cache())
          .pipe(gulp.dest('./dist'));
});

gulp.task('build-dev', function() {
  return gulp.src('./src/**/*.js')
          .pipe(plumber())
          .pipe(babel({
            presets: ["es2015-node6", "es2017"]
          }))
          .pipe(gulp.dest('./dist'));
});

gulp.task('demon', function() {
  var stream = nodemon({
		script: 'dist/',
    watch: 'src/',
		ext: 'js',
		env: {'NODE_ENV': 'development'},
    legacyWatch: true,
		tasks: ['build']
	});

  return stream;
});

gulp.task('dev', function(cb) {
  runSequence('clean-dist', 'make-dist', 'build-dev', 'demon', cb);
});
