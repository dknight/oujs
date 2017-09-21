let gulp = require('gulp');
let minify = require('gulp-minify');
let fs = require('fs');
var injectVersion = require('gulp-inject-version');

gulp.task('default', [], () => {
  console.log(VERSION);
});

gulp.task('compress', () => {
  gulp.src('src/*.js')
      .pipe(injectVersion())
      .pipe(minify({
        ext:{
            //src: VERSION + '.js',
            min: '.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: [],
        preserveComments: 'some',
        noSource: false
    }))
  .pipe(gulp.dest(''));
});