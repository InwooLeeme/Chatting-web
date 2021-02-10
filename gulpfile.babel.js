import gulp from "gulp";
import gulpPug from "gulp-pug";
import del from "del";          // build 파일 청소 모듈
import gulpWebServer from "gulp-webserver"
import sass from "gulp-sass"

sass.compiler = require('node-sass')

const routes = {
    pug:{
        src:"src/**/*.pug",
        dest:"build"
    },
    scss:{
        watch:"src/scss/**/*.scss",
        src:"src/scss/style.scss",
        dest:"build/css"
    }
}

const pug = () => gulp.src(routes.pug.src).pipe(gulpPug()).pipe(gulp.dest(routes.pug.dest))

const clean = () => del(["build"])

const styles = () => gulp.src(routes.scss.src).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(routes.scss.dest))

const webserver = () => gulp.src("build").pipe(gulpWebServer({port:5000, livereload : true}))

const watch = () =>{
    gulp.watch(routes.pug.src, pug);  
    gulp.watch(routes.scss.watch, styles);
} 

const prepare = gulp.series([clean])

const assets = gulp.series([pug, styles])

const postDev = gulp.series([webserver, watch])

export const dev = gulp.series([prepare, assets, postDev])