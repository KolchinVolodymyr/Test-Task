const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const atekla_file_include = require('gulp-file-include');
const atekla_htmlmin = require('gulp-htmlmin');
const atekla_sass = require('gulp-sass');
const atekla_autoprefixer = require('gulp-autoprefixer');
const atekla_clone = require('gulp-clone');
const atekla_clonesink = atekla_clone.sink();
const atekla_webp = require('gulp-webp');
const atekla_uglify = require('gulp-uglify');

const app = 'app/',
      dist = 'dist/';

const config = {
    app: {
        html : app + 'index.html',
        style : app + 'scss/**/*.scss',
        js : app + 'js/**/*.*',
        fonts : app + 'fonts/**/*.*',
        img : app + 'img/**/*.*'
    },
    dist : {
        html : dist,
        style : dist + 'css/',
        js : dist + 'js/',
        fonts : dist + 'fonts/',
        img : dist + 'img/'
    },
    watch : {
        html : app + 'index.html',
        //html : app + 'pug/index.pug',
        style : app + 'scss/**/*.*',
        js : app + 'js/**/*.*',
        fonts : app + 'fonts/**/*.*',
        img : app + 'img/**/*.*'
    }
}
/** Webserver task - creates local hosting for layout  */
const webServer = () => {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 9000,
        host: 'localhost',
        notify: false
    })
}

/** Build task html*/
const pugTask = () => {
    return gulp.src(config.app.html)
        .pipe(atekla_file_include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(atekla_htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(config.dist.html))
        .pipe(browserSync.reload({stream: true}))
}

/** Build task CSS */
const scssTask = () => {
    return gulp.src(config.app.style)
        .pipe(sass().on('error', sass.logError))
        .pipe(atekla_sass({outputStyle: 'compressed'}))
        .pipe(atekla_autoprefixer())
        .pipe(gulp.dest(config.dist.style))
        .pipe(browserSync.reload({stream: true}))
}

/** Build task JS */
const jsTask = () => {
    return gulp.src(config.app.js)
        .pipe(atekla_file_include())
        .pipe(atekla_uglify())
        .pipe(gulp.dest(config.dist.js))
        .pipe(browserSync.reload({stream: true}))
}

/** Build task images */
const imgTask = () => {
    return gulp.src(config.app.img)
        .pipe(atekla_clonesink)
        .pipe(atekla_webp({
            quality: 70
        }))
        .pipe(atekla_clonesink.tap())
        .pipe(gulp.dest(config.dist.img))
        .pipe(browserSync.reload({stream: true}))
}

/** Build task fonts */
const fontsTask = () => {
    return gulp.src(config.app.fonts)
        .pipe(gulp.dest(config.dist.fonts))
        .pipe(browserSync.reload({stream: true}))
}

/** Task for tracking file changes */
const watchFiles = () => {
    gulp.watch([config.watch.html], gulp.series(pugTask));
    gulp.watch([config.watch.style], gulp.series(scssTask));
    gulp.watch([config.watch.js], gulp.series(jsTask));
    gulp.watch([config.watch.img], gulp.series(imgTask));
    gulp.watch([config.watch.fonts], gulp.series(fontsTask));
}

const start = gulp.series(pugTask, scssTask, jsTask, imgTask, fontsTask)

exports.default = gulp.parallel(start, watchFiles, webServer)