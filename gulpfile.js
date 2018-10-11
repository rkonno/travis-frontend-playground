const gulp = require('gulp');

gulp.task('css', () => {
    const postcss       = require('gulp-postcss');
    const sourcemaps    = require('gulp-sourcemaps');

    return gulp.src('css/*.css')
        .pipe( sourcemaps.init() )
        .pipe( postcss([
            require('postcss-preset-env'),
            require('cssnano')
        ]) )
        .pipe( sourcemaps.write('maps/') )
        .pipe( gulp.dest('builds/') )
});