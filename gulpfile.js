var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sasslint = require('gulp-sass-lint');
var htmllint = require('gulp-html-lint');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var config = require('./gulp.config')();
var embedTemplates = require('gulp-angular-embed-templates');
var embedSass = require('gulp-angular2-embed-sass');
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var revAll = require('gulp-rev-all');
var revdel = require('gulp-rev-delete-original');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var cleanCss = require('gulp-clean-css');
var inject = require('gulp-inject-string');

var autoprefixerBrowsersList = ['last 2 versions'];

/**
 * Remove dist directory.
 */
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('serve', ['build'], function () {
    browserSync.init(config.browserSync.dev);
    gulp.watch(['src/app/**/*'], ['compile']).on('change', reload);
    gulp.watch(['src/index.html'], ['copy:index']).on('change', reload);
});

gulp.task('serve:prod', ['build:prod'], function () {
    browserSync.init(config.browserSync.prod);
});

gulp.task('fonts', function() {
    return gulp
        .src(config.fonts.in)
        .pipe(gulp.dest(config.fonts.out));
});

gulp.task('sass', ['fonts'], function() {
    return gulp
        .src('src/assets/styles/default.scss')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: autoprefixerBrowsersList
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass:prod', ['fonts'], function () {
    return gulp
        .src('src/assets/styles/default.scss')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: autoprefixerBrowsersList
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function() {
    return gulp.src(['src/assets/fonts/**/*', 'src/assets/images/**/*'], {base: 'src/'})
        .pipe(gulp.dest('dist'))
});

// copy index file
gulp.task('copy:index', function() {
    return gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist'))
});

/**
 * Copy all required libraries into dist directory.
 */
gulp.task('copy:libs', function() {
    return gulp.src([
        'node_modules/rxjs/**',
        'node_modules/@angular/**',
        'node_modules/ng2-translate/**',
        'node_modules/advchartlib/dist/**/acl-standalone.min.css'
    ], {base: './node_modules'})
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('bundle:vendors', function() {
    gulp.src([
        'node_modules/babel-polyfill/dist/polyfill.min.js',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/advchartlib/dist/js/acl-standalone.min.js'
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('bundle:vendors:prod', function() {
    gulp.src([
        'node_modules/babel-polyfill/dist/polyfill.min.js',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/advchartlib/dist/js/acl-standalone.min.js'
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

/**
 * Compile TypeScript sources and create sourcemaps in dist directory.
 */
 gulp.task('compile', function () {
     var tsProject = ts.createProject('tsconfig.json', {
         outFile: '../app.min.js'
     });

     var tsResult = gulp.src('src/app/**/*.ts')
         .pipe(sourcemaps.init())
         .pipe(embedTemplates({sourceType:'ts'}))
         .pipe(embedSass({
             autoprefixer: {
                 browsers: autoprefixerBrowsersList
             }
         }))
         .pipe(ts(tsProject));
     return tsResult.js
         .pipe(addsrc.append('src/systemjs.config.js'))
         .pipe(concat('app.min.js'))
         .pipe(babel({
             'presets': ['es2015'],
             'compact': true
         }))
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest('dist'));
 });

gulp.task('compile:prod', function () {
    var tsProject = ts.createProject('tsconfig.json', {
        outFile: '../app.min.js'
    });

    gulp.src('src/app/main.ts')
        .pipe(gulp.dest('dist'));
    gulp.src('src/app/main.ts')
        .pipe(inject.after('import { AppModule } from \'./app.module\';', '\nimport { enableProdMode } from \'@angular/core\';\nenableProdMode();'))
        .pipe(gulp.dest('src/app'));

    var tsResult = gulp.src('src/app/**/*.ts')
        .pipe(embedTemplates({sourceType:'ts'}))
        .pipe(embedSass({
            autoprefixer: {
                browsers: autoprefixerBrowsersList
            }
        }))
        .pipe(ts(tsProject));
    return tsResult.js
        .pipe(addsrc.append('src/systemjs.config.js'))
        .pipe(concat('app.min.js'))
        .pipe(babel({
            'presets': ['es2015'],
            'compact': true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('reset-main', function() {
    gulp.src('dist/main.ts')
        .pipe(gulp.dest('src/app'));
    del('dist/main.ts');
});

// TypeScript compile exit on error for pre-commit
gulp.task('compile-exit-on-error', function() {
    var tsProject = ts.createProject('tsconfig.json');

    return gulp.src('src/app/**/*.ts')
        .pipe(ts(tsProject));
});

// TypeScript tslint
gulp.task('tslint', function() {
    gulp.src('src/app/**/*.ts')
        .pipe(tslint({
            configuration: 'node_modules/adv-linter/angular2/tslint.json',
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }))
});

// sass lint
gulp.task('sasslint', function() {
    return gulp.src(['src/**/*.scss'])
        .pipe(sasslint({
            configFile: 'node_modules/adv-linter/angular2/sass-lint.yml'
        }))
        .pipe(sasslint.format())
        .pipe(sasslint.failOnError());
});

// html lint
gulp.task('htmllint', function() {
    return gulp.src('src/**/*.html')
        .pipe(htmllint({
            htmllintrc: 'node_modules/adv-linter/angular2/html-lint.json'
        }))
        .pipe(htmllint.format())
        .pipe(htmllint.failOnError());
});

gulp.task('hash', function() {
    return gulp.src(['dist/**', '!dist/urls.properties', '!dist/lib/**'])
        .pipe(revAll.revision({
            dontRenameFile: [/\.html$/]
        }))
        .pipe(revdel())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function(cb) {
    runSequence('clean', ['compile', 'bundle:vendors', 'sass', 'copy:libs', 'copy:assets', 'copy:index'], cb);
});

gulp.task('build:prod', function(cb) {
    runSequence('clean', 'compile:prod', 'reset-main', 'bundle:vendors:prod', 'sass:prod', 'copy:libs', 'copy:assets', 'copy:index', 'hash', cb);
});

gulp.task('lint', function(cb) {
    runSequence('tslint', 'sasslint', 'htmllint', cb);
});

gulp.task('default', ['build']);
