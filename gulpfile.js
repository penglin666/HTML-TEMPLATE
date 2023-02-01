const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const minifyCss = require("gulp-minify-css");
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
gulp.task("scss", ()=>
  gulp
  .src("css/*.scss")
  .pipe(sass())
  // .pipe(gulp.dest("dist/css"))
  .pipe(minifyCss())
  .pipe(rename(path=>{path.basename += ".min"}))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload())
);
gulp.task("scripts", () =>
  gulp
    .src(["js/*.js", "js/*/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
);
gulp.task("html", () =>
  gulp.src("*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("dist"))
  .pipe(connect.reload())
);
gulp.task("copy", () =>
  gulp.src("lib/**").pipe(gulp.dest("dist/lib")).pipe(connect.reload())
);
gulp.task("template", () =>
  gulp.src("template/**").pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest("dist/template")).pipe(connect.reload())
);
gulp.task("images", () =>
  gulp.src("imgs/**/*").pipe(gulp.dest("dist/imgs")).pipe(connect.reload())
);
// 执行多个任务
gulp.task("build", gulp.series("scss", "scripts", "html", "images", "copy","template"));
// 监听多个任务
gulp.task("watch", (done) => {
  gulp.watch("*.html", gulp.series("html"));
  gulp.watch("css/*.scss", gulp.series("scss"));
  gulp.watch(["js/*.js", "js/*/*.js"], gulp.series("scripts"));
  gulp.watch("lib/**", gulp.series("copy"));
  gulp.watch("template/**", gulp.series("template"));
  gulp.watch("imgs/**/*", gulp.series("images"));
  done();
});
// 启动服务器
const connect = require("gulp-connect");
gulp.task("server", () => {
  connect.server({
    root: "dist",
    port: 8888,
    livereload: true,
  });
});
// 启动默认任务
gulp.task("default", gulp.series(["build","watch", "server"]));
