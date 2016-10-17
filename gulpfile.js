var gulp = require('gulp');
var gutil = require('gulp-util');
var pug = require('gulp-pug');
var browserify = require('browserify');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('views', function() {
	return gulp.src('client/views/**/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('client/public/views/'));
});

gulp.task('js', function() {
	return browserify('client/js/app.js',{debug:true})
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('client/public/js/'));
});

gulp.task('style', function() {
	return gulp.src('client/style/*.css')
	.pipe(sourcemaps.init())
	.pipe(cleanCSS())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('client/public/style/'))
});

gulp.task('watch', function() {
	gulp.watch('client/views/**/*.pug', ['views']);
	gulp.watch('client/js/**/*.js', ['js']);
	gulp.watch('client/style/**/*.css', ['style']);
});

gulp.task('default', ['views','js','style','watch']);