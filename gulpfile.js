const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

const taskOptions = { overwrite: true };
const watchOptions = { events: 'all', ignoreInitial: false };

const htmlTask = cb => {
    src('src/*.html')
    .pipe(dest('build', taskOptions))
    .pipe(browserSync.stream());

    cb();
}

const sassTask = cb => {
    src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(dest('build/assets/css', taskOptions))
    .pipe(browserSync.stream());

    cb();
}

const jsTask = cb => {
    src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'src/*.js'])
    .pipe(dest('build/assets/js', taskOptions))
    .pipe(browserSync.stream());

    cb();
}

const imgTask = cb => {
    src('src/*.{png,jpg,svg}')
    .pipe(dest('build/assets/img', taskOptions))
    .pipe(browserSync.stream());

    cb();
}

const defaultTask = () => {
    browserSync.init({
        server: {
           baseDir: "./build",
           index: "/index.html"
        }
    });
    watch('src/*.html', watchOptions, htmlTask);
    watch('src/*.scss', watchOptions, sassTask).on('change', browserSync.reload);
    watch('src/*.js', watchOptions, jsTask);
    watch('src/*.{png,jpg,svg}', watchOptions, imgTask);
}

exports.default = defaultTask;