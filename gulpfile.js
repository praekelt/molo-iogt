'use strict';

var gulp              =   require('gulp'), 
    sass              =   require('gulp-sass'), 
    watch             =   require('gulp-watch'), 
    minifycss         =   require('gulp-minify-css'),
    cleanCSSMinify    =   require('gulp-clean-css'),
    rename            =   require('gulp-rename'),
    gzip              =   require('gulp-gzip'),
    notify            =   require('gulp-notify'),
    sourcemaps        =   require('gulp-sourcemaps'),
    sassdoc           =   require('sassdoc'),
    livereload        =   require('gulp-livereload');

var sassPaths = [
    'iogt/styles/opera-mini_single-view.scss',
    'iogt/styles/style-rtl.scss',
    'iogt/styles/style.scss',
    'iogt/styles/state_320/state_320.scss',
];

var sassDest = {
     prd: 'iogt/static/css/prd',
     dev: 'iogt/static/css/dev'
};


function styles(env) {
  var s = gulp.src(sassPaths);
  var isDev = env === 'dev';

  if (isDev) s = s
    .pipe(sourcemaps.init());

    s = s
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSSMinify())
    if (isDev) s = s
        .pipe(sourcemaps.write('/maps'));
        return s
        .pipe(gulp.dest(sassDest[env]))
        .pipe(notify({ message: `Styles task complete: ${env}` }));
}

gulp.task('styles:prd', function() {
  return styles('prd');
});

gulp.task('styles:dev', function() {
  return styles('dev');
});

gulp.task('sassdoc', function() {
    return  gulp.src('iogt/static/css/styles.scss')
        .pipe(sassdoc('iogt/static/documentation'))
        .resume();
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('iogt/styles/*.scss', ['styles']);
});

gulp.task('styles', ['styles:dev', 'styles:prd']);
gulp.task('default', ['styles']);