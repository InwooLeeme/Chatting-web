import gulp from "gulp";
import gulpPug from "gulp-pug";
import del from "del";          // build 파일 청소 모듈
import gulpWebServer from "gulp-webserver";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";       // 낮은 버젼도 호환 가능하게 바꿔주는 모듈
import miniCss from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";

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
    },
    js:{
        watch:"src/js/**/*.js",
        src:"src/js/main.js",
        dest:"build/js"
    }
}

const pug = () => gulp.src(routes.pug.src).pipe(gulpPug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);

const styles = () => gulp.src(routes.scss.src).pipe(sass().on('error', sass.logError)).pipe(autoprefixer({
    browsers:["last 2 versions"]
}))
.pipe(miniCss())
.pipe(gulp.dest(routes.scss.dest));

const webserver = () => gulp.src("build").pipe(gulpWebServer({port:5000, livereload : true}));

const js = () => gulp.src(routes.js.src).pipe(bro({
    transform: [
        babelify.configure({ presets: ["@babel/preset-env"] }),
        [ 'uglifyify', { global: true } ]
    ]})).pipe(gulp.dest(routes.js.dest));

const watch = () =>{
    gulp.watch(routes.pug.src, pug);  
    gulp.watch(routes.scss.watch, styles);
    gulp.watch(routes.js.watch, js);
} 

const prepare = gulp.series([clean])

const assets = gulp.series([pug, styles, js])

const postDev = gulp.series([webserver, watch])

export const dev = gulp.series([prepare, assets, postDev])