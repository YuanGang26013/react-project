const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require("./webpack.config.js");

const PATH = {
    src: {
        html: 'src/**/*.html',
        css: 'src/**/*.css',
        sass: 'src/**/*.sass',
        tsx: ['src/**/*.tsx'],
        mock: 'src/**/*.json'
    },
    build: {
        tsx: 'build',
        sass: 'build'
    },
    release: {
        html: 'release',
        css: 'release',
        mock: 'release'
    }

};

gulp.task('mock', function (done) {
    gulp.src(PATH.src.mock)
        .pipe(gulp.dest(PATH.release.mock))
        .on('end', function () {
            done();
        });

});

gulp.task('html', function (done) {
    gulp.src(PATH.src.html)
        .pipe(gulp.dest(PATH.release.html))
        .on('end', function () {
            done();
        });

});


gulp.task('webpack', function (done) {
    var myConfig = Object.create(webpackConfig);

    webpack(myConfig, function () {
        done();
    });
});



gulp.task('default', gulp.series('mock', 'html', function (done) {
    done();
}));
