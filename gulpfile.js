var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('babel', function () {
  gulp.src('app/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('app/build/'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html', './app/js/*.js'], ['babel', 'html']);
});

gulp.task('default', ['babel', 'connect', 'watch']);
