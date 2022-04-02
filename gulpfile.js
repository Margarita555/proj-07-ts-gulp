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
var defineModule = require("gulp-define-module");
const hb = require("gulp-hb");
const hbLayouts = require("handlebars-layouts");

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
  return (
    gulp
      .src(paths.scss, { sourcemaps: true })
      .pipe(sass())
      // .pipe(autoprefixer())
      .pipe(gulp.dest("dist/css", { sourcemaps: true }))
      .pipe(rename({ suffix: ".min" }))
      .pipe(csso())
      .pipe(gulp.dest("dist/css"), { sourcemaps: true })
  );
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
// gulp.task("views", function () {
//   let hbStream = hb({
//     //debug: true
//   })
//     .partials(".src/templates/**/*.{hbs,html}")

//     // Data
//     .data(".src/js/**/*.{js,json}")
//     // .data(config.metadata)

//     // Helpers
//     .helpers(hbLayouts)
//     .helpers(".src/js/*.js");

//   return gulp
//     .src("src/templates/**/*.hbs")
//     .pipe(hbStream)
//     .pipe(gulp.dest("dist/templates/"))
//     .on("end", browserSync.reload);
// });

// gulp.task("templates", function () {
//   gulp
//     .src(["src/templates/*.hbs"])
//     .pipe(handlebars())
//     .pipe(defineModule("node"))
//     .pipe(gulp.dest("dist/templates/"));
// });

function templates() {
  // return gulp
  //   .src("src/templates/**/*.hbs")
  //   .pipe(handlebars())
  //   .pipe(wrap("Handlebars.template(<%= contents %>)"))
  //   .pipe(
  //     declare({
  //       namespace: "src.templates",
  //       noRedeclare: true,
  //     })
  //   )
  //   .pipe(defineModule("node"))
  //   .pipe(gulp.dest("dist/templates/"))
  //   .pipe(browserSync.stream());
  return (
    gulp
      .src("src/templates/**/*.hbs")
      .pipe(handlebars({ handlebars: require("handlebars") }))
      .pipe(wrap("Handlebars.template(<%= contents %>)"))
      // Declare template functions as properties and sub-properties of exports
      .pipe(
        declare({
          root: "exports",
          noRedeclare: true, // Avoid duplicate declarations
          processName: function (filePath) {
            // Allow nesting based on path using gulp-declare's processNameByPath()
            // You can remove this option completely if you aren't using nested folders
            // Drop the templates/ folder from the namespace path by removing it from the filePath
            return declare.processNameByPath(
              filePath.replace("src/templates/", "")
            );
          },
        })
      )
      // Concatenate down to a single file
      .pipe(concat("index.js"))
      // Add the Handlebars module in the final output
      .pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
      // Write the output into the templates folder
      .pipe(gulp.dest("dist/templates/"))
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  // gulp.watch("dist/").on("all", browsersync.reload);
  gulp.watch(paths.html, html).on("all", browserSync.reload);
  gulp.watch(paths.scss, scss).on("all", browserSync.reload);
  // gulp.watch("src/templates/**/*.hbs", "views").on("all", browserSync.reload);
  // gulp.watch(paths.scripts.src, scripts);
  // gulp.watch(paths.images.src, img);
}

exports.default = gulp.series(
  //   clean,
  html,
  gulp.parallel(scss, bundle, templates),
  watch
);
// gulp.task("default", gulp.series(gulp.parallel("copy-html", "scss"), bundle));
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);

// var gulp = require("gulp");
// var browserify = require("browserify");
// var source = require("vinyl-source-stream");
// var watchify = require("watchify");
// var tsify = require("tsify");
// var fancy_log = require("fancy-log");
// var uglify = require("gulp-uglify");
// var sourcemaps = require("gulp-sourcemaps");
// var buffer = require("vinyl-buffer");
// const sass = require("gulp-sass")(require("sass"));

// var paths = {
//   pages: ["src/html/*.html"],
// };
// var watchedBrowserify = watchify(
//   browserify({
//     basedir: ".",
//     debug: true,
//     entries: ["src/js/main.ts"],
//     cache: {},
//     packageCache: {},
//   })
//     .plugin(tsify)
//     .transform("babelify", {
//       presets: ["es2015"],
//       extensions: [".ts"],
//     })
// );
// gulp.task("copy-html", function () {
//   return gulp.src(paths.pages).pipe(gulp.dest("dist"));
// });

// gulp.task("scss", function () {
//   return gulp
//     .src("src/scss/**/*.scss")
//     .pipe(sourcemaps.init())
//     .pipe(sass().on("error", sass.logError))
//     .pipe(sourcemaps.write("."))
//     .pipe(gulp.dest("dist/css"));
// });

// // function scss() {
// //   return gulp
// //     .src("src/scss/**/*.scss")
// //     .pipe(sass().on("error", sass.logError))
// //     .pipe(gulp.dest("dist"));
// // }

// function bundle() {
//   return watchedBrowserify
//     .bundle()
//     .on("error", fancy_log)
//     .pipe(source("bundle.js"))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({ loadMaps: true }))
//     .pipe(uglify())
//     .pipe(sourcemaps.write("./"))
//     .pipe(gulp.dest("dist"));
// }
// gulp.task("default", gulp.series(gulp.parallel("copy-html", "scss"), bundle));
// watchedBrowserify.on("update", bundle);
// watchedBrowserify.on("log", fancy_log);
