import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import minify from 'gulp-clean-css';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import log from 'gulplog';
import sourcemaps from 'gulp-sourcemaps';

export function compileSASS() {
  return gulp.src('sass/processing-theme.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(rename('processing-theme.min.css'))
    .pipe(minify())
    .pipe(gulp.dest('../static/dist'));
}


export function combine() {
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
}

export function scripts() {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: 'js/processing-theme.js',
    debug: true,
    //extensions: ['es6'],
    // defining transforms here will avoid crashing your stream
    transform: [babelify.configure({presets : ['@babel/preset-env']})]
  });

  return b.bundle()
    .pipe(source('processing-theme.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(buffer())
    .pipe(rename('processing-theme.min.js'))
    .pipe(sourcemaps.init())
    //Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('../static/dist'));
}

export function fonts() {
  return gulp
    .src(['fonts/*/**'])
    .pipe(gulp.dest('../static/fonts'));
}

export function watch() {
  gulp.watch( ["js/lib/*", "js/*"], scripts);
  gulp.watch( ['sass/*.scss', 'sass/components/*.scss', 'sass/mixins/*.scss'], gulp.series(compileSASS, combine));
}

const build = gulp.series(compileSASS, combine, scripts, fonts);
const dev = gulp.series(compileSASS, combine, scripts, fonts, watch);

exports.default = build;
exports.dev = dev;