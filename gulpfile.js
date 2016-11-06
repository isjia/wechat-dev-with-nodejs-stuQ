var gulp = require('gulp');
var markdown = require('gulp-markdown');
var wrap = require('gulp-wrap');
var browserSync = require('browser-sync').create();

gulp.task('markdown', function () {
    return gulp.src('./note/*.md')
        .pipe(markdown())
        .pipe(wrap({src:"./src/layout/note.html"}))
        .pipe(gulp.dest('./dist/note'));
});

gulp.task('copy-assets', function(){
  gulp.src(['src/style/*.css'], {base: './src'})
      .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['markdown', 'copy-assets'], function(){
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch(['./note/*.md', './src/layout/*.html'], ['markdown']);
  gulp.watch('./src/style/*.css', ['copy-assets']);
  gulp.watch(['./dist/**/*.html']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
