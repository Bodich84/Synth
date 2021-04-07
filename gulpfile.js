import gulp from 'gulp';
import browserSync from 'browser-sync'
import babel from 'gulp-babel';
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import del from 'del'



export function html() {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
}

export function styles() {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    //.pipe(gulp.dest('./app/css/'))
    .pipe(autoprefixer())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
}

export function js() {
  return gulp.src('app/js/main.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
}

export function watch() {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('styles'))
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/main.js', gulp.parallel('js'))
}

export function sync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
}

export async function clean() {
  del.sync('dist')
}

export async function _export() {
  await gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))

  await gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'))

  await gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'))

  await gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))

  await gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'))
}

export function build() {
  gulp.series(clean, _export)
}



export default gulp.series(
  gulp.parallel(
    styles,
    html,
    js
  ),
  gulp.parallel(
    sync,
    watch
  )
)