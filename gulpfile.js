var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var browserify = require('browserify');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');

gulp.task('connect', ['browserify'], function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('html', ['browserify'], function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('browserify', ['babel'], function() {
  return browserify('./app/build/translated/demo.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/build/'));
});

gulp.task('babel', function () {
  return gulp.src('./app/js/*.js')
    .pipe(babel())
      .on('error', gutil.log)
    .pipe(gulp.dest('./app/build/translated'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html', './app/styles/*.css', './app/js/*.js'], ['html']);
});

gulp.task('default', ['connect', 'watch']);
