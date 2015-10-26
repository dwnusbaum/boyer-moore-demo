'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var browserify = require('browserify');
var connect = require('gulp-connect');
var del = require('del');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('connect', ['javascript'], function() {
  connect.server({
    root: 'demo',
    livereload: true
  });
});

gulp.task('html', ['javascript'], function () {
  gulp.src('./demo/*.html')
    .pipe(connect.reload());
});

gulp.task('clean', function(cb) {
  return del(['./demo/build/'], cb);
});

gulp.task('javascript', ['babel'], function() {
  var b = browserify('./demo/build/translated/Demo.js');
  var w = watchify(b);
  return w
    .bundle()
      .on('error', function(err) {
        gutil.log(err);
        this.emit('end');
      })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./demo/build/'));
});

gulp.task('babel', ['clean'], function () {
  return gulp.src('./demo/js/*.js')
    .pipe(babel())
      .on('error', function(err) {
        gutil.log(err);
        this.emit('end');
      })
    .pipe(gulp.dest('./demo/build/translated'));
});

gulp.task('watch', function () {
  gulp.watch(['./demo/*.html', './demo/styles/*.css', './demo/js/*.js'], ['html']);
});

gulp.task('default', ['connect', 'watch']);
