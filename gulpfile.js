var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task("compileSass", function() {

    return gulp.src("assets/css/main.sass")
        .pipe(sass())
        .pipe(gulp.dest("public/css"))

})

gulp.task("concatScript", function() {
    return gulp.src([
            "assets/js/jquery-2.1.4.min.js",
            "assets/js/bootstrap.min.js",
            "assets/js/tether.min.js",
            "assets/js/wow.min.js",
            "assets/js/custom.js",
            "assets/js/smoothscroll.js",
        ])
        .pipe(concat("app.js"))
        .pipe(gulp.dest("public/js"))
})

gulp.task("minifyScript", function() {
    return gulp.src("public/js/app.js")
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest("public/js"))

})

gulp.task("watchSass", function() {
    gulp.watch(["assets/**/*.sass", "assets/**/*.scss"], ["compileSass", "concatStyle"])
})

gulp.task("concatStyle", ["compileSass"], function() {
    gulp.src([
            "assets/css/bootstrap.min.css",
            "assets/css/font-awesome.min.css",
            "public/css/main.css"
        ])
        .pipe(concat("main.css"))
        .pipe(gulp.dest("public/css"))
})

gulp.task("build", ["concatStyle", "concatScript", "minifyScript"], function() {})