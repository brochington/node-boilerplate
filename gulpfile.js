var gulp = require('gulp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var cache = require('gulp-cached');
var nodemon = require('gulp-nodemon');
var del = require('del');
var mkdirp = require('mkdirp');
var runSequence = require('run-sequence');

gulp.task('clean-dist', function() {
	return del(['dist/**']);
});

gulp.task('make-dist', function(cb) {
  mkdirp('./dist', cb)
})

gulp.task('build', function() {
  return gulp.src('./src/**/*.js')
          .pipe(plumber())
          .pipe(cache('babel'))
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
  runSequence('clean-dist', 'make-dist', 'build', 'demon', cb);
});
