'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var webp = require('gulp-webp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify-es').default;
var del = require('del');
var server = require('browser-sync').create();

gulp.task('css', function () {
  return gulp.src('Source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css/'))
    .pipe(server.stream());
});

gulp.task('images', function() {
  return gulp.src('Source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 70, progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('Source/images/'))
});

gulp.task('sprite', function() {
  return gulp.src('Source/images/**/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('Source/images/'))
});

gulp.task(`webp`, function() {
  return gulp.src('Source/images/**/*.{png,jpg}')
    .pipe(webp({quality: 70}))
    .pipe(gulp.dest('Source/images/'))
});

gulp.task('minJS', function() {
  return gulp.src('Source/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'))
});

gulp.task('copyFonts', function() {
  return gulp.src([
      'Source/fonts/**/*.{woff,woff2}',
    ], {
      bace: 'Source'
    })
      .pipe(gulp.dest('build/fonts'))
});

gulp.task('copyIcons', function() {
  return gulp.src([
      'Source/icons/**',
    ], {
      bace: 'Source'
    })
      .pipe(gulp.dest('build/icons'))
});

gulp.task('copyImages', function() {
  return gulp.src([
      'Source/images/**',
    ], {
      bace: 'Source'
    })
      .pipe(gulp.dest('build/images'))
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copyHTML', function() {
  return gulp.src([
      'Source/**/*.html'
    ], {
      bace: 'Source'
    })
      .pipe(gulp.dest('build'))
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.task('refresh', function(done) {
    server.reload();
    done(); 
  });

  gulp.watch('Source/sass/**/*.{sass,scss}', gulp.series('css'));
  gulp.watch('Source/js/**/*.js', gulp.series('minJS', 'refresh'));
  gulp.watch('Source/**/*.html', gulp.series('copyHTML', 'refresh'));
});

gulp.task('build', gulp.series('clean', 'copyHTML', 'copyFonts', 'copyIcons', 'copyImages', 'minJS', 'css'))
gulp.task('start', gulp.series('css', 'server'));
