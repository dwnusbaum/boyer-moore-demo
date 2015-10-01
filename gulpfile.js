'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var browserify = require('browserify');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('connect', ['javascript'], function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('html', ['javascript'], function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('javascript', ['babel'], function() {
  var b = browserify('./app/build/translated/demo.js');
  var w = watchify(b);
  return w
    .bundle()
      .on('error', gutil.log)
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
