var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    fileinclude  = require('gulp-file-include'),
    reload = browserSync.reload;

// Gulp Sass Task
gulp.task('sass', function() {
  return gulp.src('app/scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceComments: true,
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({ stream:true }));
});

// Gulp Fileinclude Task 
gulp.task('fileinclude', function() {
    gulp.src(['app/templates/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream:true }));
});

// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/templates/**/*.html', ['fileinclude']);
});