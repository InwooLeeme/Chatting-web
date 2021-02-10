import gulp from "gulp";
import gulpPug from "gulp-pug";
import del from "del";          // build 파일 청소 모듈
import gulpWebServer from "gulp-webserver"


const routes = {
    pug:{
        src:"src/**/*.pug",
        dest:"build"
    }
}

const pug = () => gulp.src(routes.pug.src).pipe(gulpPug()).pipe(gulp.dest(routes.pug.dest))

const clean = () => del(["build"])

const webserver = () => gulp.src("build").pipe(gulpWebServer({port:5000, livereload : true}))

const watch = () =>{
    gulp.watch(routes.pug.src, pug);  
} 

const prepare = gulp.series([clean])

const assets = gulp.series([pug])

const postDev = gulp.series([webserver, watch])

export const dev = gulp.series([prepare, assets, postDev])