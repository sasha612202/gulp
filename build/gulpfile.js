var gulp = require('gulp');
var minifyCss = require('gulp-minify-css'); // Минификация css
var sass = require('gulp-sass'); // поддерка sass
var notify = require('gulp-notify'); // Уведомления
var browserSync = require('browser-sync'); // Live reload
var connectPHP = require('gulp-connect-php'); // php server

var paths = {
  html:['index.html'],
  css:['main.css'],
  script:['script.js']
};



// Сервер для livereload / php
gulp.task('connect-sync', function() {
  connectPHP.server({}, function (){
    browserSync({
      proxy: '127.0.0.1:8000'
    });
  });

  gulp.watch('**/*.php').on('change', function () {
    browserSync.reload();
  });
});


// Минификация sass
gulp.task('mincss', function(){
  return gulp.src(paths.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest('main'))
        .pipe(reload({stream:true}))
        .pipe(notify('Done! sass is compiled!.'));
});

// livereload
gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}))
  .pipe(notify('Перезагружено!'));
});

// Слежение за файлами
gulp.task('watcher', function(){
    gulp.watch(paths.css, ['mincss']);
    gulp.watch(paths.html, ['html']); 
});

gulp.task('default', ['watcher', 'connect-sync']);