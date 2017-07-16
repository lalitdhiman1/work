var gulp = require("gulp");
var sass = require("gulp-sass");
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var connect = require('gulp-connect');


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "site/prod/"
        }
    });

});


 

 gulp.task('minify', function() {
	return gulp.src('site/dev/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('site/prod/'))
		.pipe(connect.reload());

});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});


gulp.task("sass", function() {
	return gulp.src('site/dev/_rawFiles/scss/**/*.scss')
		.pipe(sass())
		.pipe(concatCss("main.css"))
		.pipe(gulp.dest('site/dev/css/'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('site/prod/css/'))
		.pipe(connect.reload());

})
gulp.task('scripts', function() {
	return gulp.src('site/dev/_rawFiles/js/**/*.js')
		//.pipe(concat('main.js'))
		.pipe(gulp.dest('site/dev/js'))
		.pipe(gulp.dest('site/prod/js'))
		.pipe(connect.reload());

});
gulp.task('watch', function() {
	gulp.watch('site/dev/_rawFiles/scss/**/*.scss', ['sass']);
	gulp.watch('site/dev/_rawFiles/js/**/*.js', ['scripts']);
	gulp.watch('site/dev/**/*.html', ['minify']);

});

gulp.task("default", ['sass', 'scripts', 'watch','minify','browser-sync','connect']);