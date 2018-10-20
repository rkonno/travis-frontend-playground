const gulp = require('gulp');

gulp.task('styles', () => {
    const postcss       = require('gulp-postcss');
    const sourcemaps    = require('gulp-sourcemaps');

    return gulp.src('./src/styles/*.css')
        .pipe( sourcemaps.init() )
        .pipe( postcss([
            require('postcss-preset-env'),
            require('cssnano')
        ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('./dist/assets/styles') )
});

gulp.task('clean', () => {
    const del = require('del');
    return del(['./dist', './*.zip'], { force:true });
});

gulp.task('zip', () => {
    const zip = require('gulp-zip');
    return gulp.src('./dist')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('build',
    gulp.series(
        'clean',
        'styles',
        'zip'
    )
);