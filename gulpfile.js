const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ejs = require('gulp-ejs');
const del = require('del');
const rename = require('gulp-rename');
// エラー時に停止させない
const plumber = require('gulp-plumber');
// 複数のimportをまとめて行う
const sassGlob = require('gulp-sass-glob');
// 複数のファイルを1つにまとめる
const concat = require('gulp-concat');
// jsの依存関係を解消
const browserify = require('gulp-browserify');
// ファイルのインクルードを行う
const fileInclude = require('gulp-file-include');
// コメント消す
const uglify = require('gulp-uglify');
const open    = require('open');
//
const jimport = require('gulp-js-import');

// ソースディレクトリの指定
const dir = './src';
//const libdir = './lib';
const diroutput = './dest';
const dirtempoutput = './temp';


// 最後にブラウザ開くやつ
var connect = require('gulp-connect');

/*
 * sassタスク(cssは埋め込むため一時ファイルに保存
 */
gulp.task( 'sass', function(){
  // del([dirtempoutput + '/css/**/*'],{force: true});
  return gulp.src([dir + ('/sass/style.scss')])
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(dirtempoutput));
});

/*
 * jsタスク
 */
gulp.task( 'js', function(){
  //del([diroutput + '/js/**/*'],{force: true});
  return gulp.src([dir + '/js/*.js'])
  .pipe(jimport())
  .pipe(plumber())
  .pipe(concat('script.js'))
  .pipe(browserify())
  .pipe(uglify({
          output:{
            comments: /^!/ //正規表現でLicenseコメントの頭によくある/*!を検出
          }
        }))
  .pipe(gulp.dest(diroutput + '/'));
});

/*
 * ejsタスク（一時ファイルに移動
 */
gulp.task( 'ejs', function(){
  // console.log('ejsタスクを実行');
  //del([dirtempoutput + '/**/*.html'],{force: true});
  return gulp.src( [ dir + '/ejs/**/*.ejs', '!' + dir + '/ejs/**/_*' ] )
    .pipe(plumber())
    .pipe(ejs({},{},{"ext": ".html"}))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(dirtempoutput));
});

/*
 * includeタスク
 */
gulp.task('include', function() {
    return gulp.src( dirtempoutput + '/**/*.html')
    .pipe(fileInclude())
    .pipe(gulp.dest(diroutput));
});

// 雑にコピー
// https://chaika.hatenablog.com/entry/2018/12/21/083000
const webroot = 'dest';
const server = (cb) => {
  //const openFlg = process.env.NODE_SERVER? !!(process.env.NODE_SERVER - 0) : false;
  const openFlg = true;
  const webserver = connect.server({
    root: webroot,
    livereload: true,
    port: 3000
  });
  open("http" + (webserver.https? 's':'') + "://" + webserver.host + ":" + webserver.port);
};


/*
 * ビルドをまとめて行うタスク
 */
//gulp.task( 'build', gulp.series('sass', 'ejs', 'js', function(done){done();}));
//gulp.task( 'build', gulp.series('sass', 'ejs', 'include', 'js', function(done){done();}));
// ブラウザでの確認を含む
gulp.task( 'test', gulp.series('sass', 'ejs', 'include', "js", function(done){done();}, server));
// ビルド
gulp.task( 'build', gulp.series('sass', 'ejs', 'include', "js", function(done){done();}));



