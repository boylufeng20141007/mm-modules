var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("mm_modules", function () {
    return gulp
               .src(["mm-modules.js","mm-modules/**/*.js"])
               .pipe(concat("mm-modules-build.js"))
               .pipe(gulp.dest("dist/js/"));
});

gulp.task("mm_modules minify", function () {
    return gulp
               .src(["mm-modules.js","mm-modules/**/*.js"])
               .pipe(concat("mm-modules-build.js"))
               .pipe(uglify())
               .pipe(rename("mm-modules-build.min.js"))
               .pipe(gulp.dest("dist/js/"));
});

gulp.task("watch", function(){
    gulp.watch(["mm-modules.js","mm-modules/**/*.js"],["mm_modules"])
});

gulp.task("default", ["mm_modules"]);