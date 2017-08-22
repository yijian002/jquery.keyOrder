var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    header = require('gulp-header');

// Clean dist folder
gulp.task('clean', function() {
    return gulp.src('dist').pipe(clean());
});

// Copy
gulp.task('copy', function() {
    return gulp.src('jquery.keyOrder.js')
        .pipe(gulp.dest('dist'));
});

// Uglify / Compress
gulp.task('uglify', function() {
    return gulp.src('jquery.keyOrder.js')
        .pipe(uglify())
        .pipe(concat('jquery.keyOrder.min.js'))
        .pipe(header('/* jquery.keyOrder.js - @author Vic - https://github.com/yijian002/jquery.keyOrder */'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'copy', 'uglify']);
