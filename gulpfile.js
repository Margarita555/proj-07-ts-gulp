var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var fancy_log = require("fancy-log");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
const sass = require("gulp-sass")(require("sass"));
const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
var handlebars = require("gulp-handlebars");
var wrap = require("gulp-wrap");
var declare = require("gulp-declare");
var concat = require("gulp-concat");
const del = require("del");

var paths = {
  html: ["src/html/*.html"],
  css: ["src/css/**/*.css"],
  scss: ["src/scss/**/*.scss"],
};
var watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/js/main.ts"],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .transform("babelify", {
      presets: ["es2015"],
      extensions: [".ts", ".hbs"],
    })
);

function clear() {
  return del("./dist");
}

function html() {
  return gulp
    .src(paths.html)
    .pipe(fileInclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function css() {
  return gulp
    .src(paths.css, { sourcemaps: true })
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/css", { sourcemaps: true }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(gulp.dest("dist/css"), { sourcemaps: true });
}

function scss() {
  return gulp
    .src(paths.scss, { sourcemaps: true })
    .pipe(sass())
    .pipe(gulp.dest("dist/css", { sourcemaps: true }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(gulp.dest("dist/css"), { sourcemaps: true });
}

function bundle() {
  return watchedBrowserify
    .bundle()
    .on("error", fancy_log)
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist"));
}

function templates() {
  return gulp
    .src("src/templates/**/*.hbs")
    .pipe(handlebars({ handlebars: require("handlebars") }))
    .pipe(wrap("Handlebars.template(<%= contents %>)"))
    .pipe(
      declare({
        root: "exports",
        noRedeclare: true,
        processName: function (filePath) {
          return declare.processNameByPath(
            filePath.replace("src/templates/", "")
          );
        },
      })
    )
    .pipe(concat("index.js"))
    .pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
    .pipe(gulp.dest("dist/templates/"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch(paths.html, html).on("all", browserSync.reload);
  gulp.watch(paths.scss, scss).on("all", browserSync.reload);
  gulp.watch("src/templates/**/*.hbs", templates).on("all", browserSync.reload);
  // gulp.watch("src/templates/**/*.hbs", "views").on("all", browserSync.reload);
  // gulp.watch(paths.scripts.src, scripts);
  // gulp.watch(paths.images.src, img);
}

exports.default = gulp.series(
  clear,
  html,
  gulp.parallel(scss, bundle, templates),
  watch
);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);
