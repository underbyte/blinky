var dirs,
    gulp    = require('gulp'),
    less    = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    concat  = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    size = require('gulp-size'),
    zip = require('gulp-zip'),
    runSequence = require('run-sequence');

dirs = {
  js: {
    filename: 'blinky.min.js',
    dest: 'assets/js',
    src: [
      'bower_components/fastclick/lib/fastclick.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'js/*.js'
    ]
  },
  less: {
    filename: 'blinky.css',
    dest: 'assets/css',
    src: [
      'less/styles.less'
    ]
  }
};

gulp.task('clean', function () {
  return gulp.src(['dist', dirs.js.dest + '/*', dirs.less.dest + '/*'], {read: false})
    .pipe(clean());
});

gulp.task('setup', function () {
  return gulp.src('less/bootswatch/variables.less')
    .pipe(gulp.dest('bower_components/bootstrap/less'));
});

// compile less files
gulp.task('less', function () {
  return gulp.src(dirs.less.src)
    .pipe(less())
    .pipe(concat(dirs.less.filename))
    .pipe(size({title:'less'}))
    .pipe(gulp.dest(dirs.less.dest));
});

// compile js files
gulp.task('js', function () {
  return gulp.src(dirs.js.src)
    .pipe(concat(dirs.js.filename))
    .pipe(size({title:'js'}))
    .pipe(gulp.dest(dirs.js.dest));
});

// watch less and js files
gulp.task('watch', function () {
  gulp.watch('less/*.less', ['less']);
  gulp.watch('js/*.js', ['js']);
});

gulp.task('zip', function () {
  return gulp.src('dist/blinky/**/')
    .pipe(zip('blinky.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
  return gulp.src(dirs.less.dest + '/*.css')
    .pipe(minifyCSS())
    .pipe(size({title:'css'}))
    .pipe(gulp.dest('dist/blinky/assets/css/'));
});

gulp.task('minify-js', function () {
  return gulp.src(dirs.js.dest + '/*.js')
    .pipe(uglify())
    .pipe(size({title:'js'}))
    .pipe(gulp.dest('dist/blinky/assets/js'));
});

gulp.task('move', function () {
  return gulp.src(['assets/fonts/*', '*.hbs', 'partials/*', 'package.json'], { base: './' })
    .pipe(size({title:'hbs and fonts'}))
    .pipe(gulp.dest('dist/blinky'));
});

// execute while developing
gulp.task('develop', function () {
  runSequence('move', 'less', 'js', 'watch');
});

//build dist folder and zip
gulp.task('build', function () {
  runSequence('clean', 'setup', 'less', 'js', 'minify-css', 'minify-js', 'move', 'zip');
});
