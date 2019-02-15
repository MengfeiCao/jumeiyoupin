// 引入区
const gulp = require("gulp");
const connect = require('gulp-connect');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const uglify = require('gulp-uglify');
const pump = require('pump');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const proxy = require('http-proxy-middleware')

// 地址配置区
const paths = {
    src : {
        html : "./src/html/*.html",
        sass : "./src/sass/*.scss",
        js : "./src/javascripts/*.js",
        img : "./src/images/*",
    },
    dest : {
        html : "./dist",
        sass : "./dist/stylesheets",
        js : "./dist/javascripts",
        img : "./dist/images",
    }
}


// 链接服务器：
gulp.task("connect", function() {
        connect.server({
            port: 8080,
            root: "./dist",
            livereload: true,
            middleware: function(connect, opt) {
                return proxyList
            }});
});

// 服务器代理
const proxyList = 
    [
        proxy('/sign',  {
            target: 'http://www.baidu.com',
            pathRewrite: {'/sign' : '/'}, // 重写路径
            changeOrigin:true
        })
    ]



// 实时更新区
gulp.task("html",()=>{
    return gulp.src(paths.src.html)
                .pipe(gulp.dest(paths.dest.html))
                .pipe(connect.reload());
});

gulp.task("sass",()=>{
    return gulp.src(paths.src.sass)
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest(paths.dest.sass))
                .pipe(connect.reload());
});

gulp.task("js",()=>{
    return gulp.src(paths.src.js)
                .pipe(babel({
                    presets: ['@babel/env']
                }))
                .pipe(gulp.dest(paths.dest.js))
                .pipe(connect.reload());
});

gulp.task("img",()=>{
    return gulp.src(paths.src.img)
                .pipe(gulp.dest(paths.dest.img))
                .pipe(connect.reload());
});


gulp.task("watch",()=>{
    gulp.watch([paths.src.html],["html"]);
    gulp.watch([paths.src.sass],["sass"]);
    gulp.watch([paths.src.js],["js"]);
    gulp.watch([paths.src.img],["img"]);
})


gulp.task('default', ['connect', 'watch']);


// 何时上线何时更新

// css压缩
gulp.task('minify-css', () => {
    return gulp.src(paths.src.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest(paths.dest.sass));
});

// js压缩
gulp.task('compress', function (cb) {
    pump([
          gulp.src(paths.src.js),
          babel({
            presets: ['@babel/env']
          }),
          uglify(),
          gulp.dest(paths.dest.js)
      ],
      cb
    );
});

// img压缩
gulp.task('imgCompress', () =>
    gulp.src(paths.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dest.img))
);

gulp.task("build",["minify-css","compress","imgCompress"])