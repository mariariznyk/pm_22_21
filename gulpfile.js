const {series, src, dest, parallel, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const imagemin = require ('gulp-imagemin');

const html_task = () => src('app/*.html')
    .pipe(dest('dist'));
const scss_task = () => src('app/scss/*.scss')
    .pipe(concat('index.scss'))
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename ({suffix: '.min'}))
    .pipe(dest('dist/css'));

const scripts_task = () => src('app/js/*.js')
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename ({suffix: '.min'}))
    .pipe(dest('dist/js'));

const watch_task = () => {
    watch('app/*.html', parallel(html_task));
    watch('app/scss/*.scss', parallel(scss_task));
    watch('app/js/*.js', parallel(scripts_task));
}
const img_task = () => src('src / images /*.+ (jpg | jpeg | png | gif)')
    .pipe (imagemin ({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true
    }))
    .pipe(dest('dist/img'));
exports.default = series(html_task, scss_task, scripts_task, img_task, watch_task);