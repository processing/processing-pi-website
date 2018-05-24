const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const minify = require('gulp-clean-css');
const babel = require('gulp-babel');

gulp.task('sass', function() {
    return gulp.src('sass/processing-theme.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('processing-theme.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('../static/css'));
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

gulp.task('scripts', () =>
  gulp.src('js/processing-theme.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('processing-theme.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../static/js'))
);

gulp.task('watch', function() {
    gulp.watch(scripts, ['scripts']);
    gulp.watch(['src/sass/*.scss', 'src/sass/components/*.scss', 'src/sass/mixins/*.scss'], ['sass', 'combine']);

});

//gulp.task('default', ['sass', 'scripts',  'watch']);
gulp.task('default', ['sass', 'combine', 'scripts',  'watch']);