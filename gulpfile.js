const gulp = require('gulp');

gulp.task('styles', () => {
    const postcss       = require('gulp-postcss');
    const sourcemaps    = require('gulp-sourcemaps');

    return gulp.src('./src/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('postcss-preset-env'),
            require('cssnano')
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/styles'));
});

gulp.task('manifest', () => {
   return gulp.src('./src/manifest.json')
       .pipe(gulp.dest('./dist'));
});

gulp.task('clean', () => {
    const del = require('del');
    return del(['./dist', './*.zip'], { force:true });
});

gulp.task('zip', () => {
    const zip = require('gulp-zip');
    return gulp.src('./dist/**/*', {base: '.'})
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('build',
    gulp.series(
        'clean',
        'styles',
        'manifest'
    )
);

gulp.task('deploy',
    gulp.series(
        'zip'
    )
);