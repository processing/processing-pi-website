const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const minify = require('gulp-clean-css');

const babelify = require('babelify');
const browserify = require('browserify');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const log = require('gulplog');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return gulp.src('sass/processing-theme.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('processing-theme.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('../static/dist'));
});


gulp.task('combine', function() {
    return gulp.src([
            'sass/_variables.scss',
            'sass/mixins/_breakpoints.scss',
            'sass/mixins/_fonts.scss',
            'sass/mixins/_flex.scss',
            'sass/mixins/_grid.scss',
            'sass/mixins/_utils.scss',
            'sass/mixins/_buttons.scss',
            'sass/mixins/_gradients.scss',
            'sass/mixins/_labels.scss'
        ])
        .pipe(concat('processing-theme.scss'))
        .pipe(gulp.dest('dist/scss'));
});
//
// gulp.task('scripts', function() {
//     return gulp.src(scripts)
//         .pipe(concat('kube.js'))
//         .pipe(gulp.dest('dist/js'))
//         .pipe(rename('kube.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });


const scripts = [
  "js/lib/*",
  "js/*"
];

// gulp.task('scripts', () =>
//   gulp.src('js/processing-theme.js')
//     .pipe(babel())
//     .pipe(gulp.dest('dist/js'))
//     .pipe(rename('processing-theme.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('../static/dist'))
// );

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: 'js/processing-theme.js',
    debug: true,
    //extensions: ['es6'],
    // defining transforms here will avoid crashing your stream
    transform: [babelify.configure({presets : ['env']})]
  });

  return b.bundle()
    .pipe(source('processing-theme.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(buffer())
    .pipe(rename('processing-theme.min.js'))

    //.pipe(source('processing-theme.min.js'))
    .pipe(sourcemaps.init())
    //Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('../static/dist'));
});

gulp.task('fonts', function(){
  return gulp
    .src(['fonts/*/**'])
    .pipe(gulp.dest('../static/fonts'));
});

gulp.task('watch', function() {
    gulp.watch(scripts, ['javascript']);
    gulp.watch(['sass/*.scss', 'sass/components/*.scss', 'sass/mixins/*.scss'], ['sass', 'combine']);

});

gulp.task('default', ['sass', 'combine', 'javascript', 'fonts',  'watch']);