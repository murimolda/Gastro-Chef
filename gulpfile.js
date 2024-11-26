import gulp from 'gulp';
import pug from 'gulp-pug';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

const sass = gulpSass(dartSass);

// Pug task
gulp.task('pug', function () {
  return gulp.src('src/templates/*.pug')
    .pipe(pug({
      pretty: true,
      basedir: 'src/templates'
    }))
    .pipe(gulp.dest('dist'));
});

// Sass task
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

// Task for copying assets
gulp.task('copy-assets', function () {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});

// Watch task
gulp.task('watch', function () {
  gulp.watch('src/templates/**/*.pug', gulp.series('pug'));
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/assets/**/*', gulp.series('copy-assets'));
});

// Default task
gulp.task('default', gulp.series('pug', 'sass', 'copy-assets', 'watch'));