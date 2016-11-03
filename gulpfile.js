var gulp = require('gulp');
var gutil = require('gulp-util');
var pug = require('gulp-pug');
var browserify = require('browserify');
var cleanCSS = require('gulp-clean-css');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('views', () => {
	return gulp.src('client/views/**/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('client/public-build/views/'));
});

gulp.task('js', () => {
	return browserify('client/js/app.js',{debug:true})
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('client/public-build/js/'));
});

gulp.task('style', function() {
	return gulp.src('client/style/*.css')
	.pipe(sourcemaps.init())
	.pipe(cleanCSS())
	.pipe(replace('../../node_modules/bootstrap/dist/fonts','../fonts'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('client/public-build/style/'));
});

gulp.task('fonts', () => {
	return gulp.src('node_modules/bootstrap/dist/fonts/**/*')
	.pipe(gulp.dest('client/public-build/fonts/'));
});

gulp.task('watch', () => {
	gulp.watch('client/views/**/*.pug', ['views']);
	gulp.watch('client/js/**/*.js', ['js']);
	gulp.watch('client/style/**/*.css', ['style']);
});

gulp.task('default', ['views','js','style','fonts','watch']);