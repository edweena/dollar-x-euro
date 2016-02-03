//Generated on 2016-01-04 using
// generator-rbma-feature 0.0.3


'use strict';

// ------------------------------------------------
// Default to dev workspace
//

global.isProd = false;


// ------------------------------------------------
// Config
//

const config = require('./config');


// ------------------------------------------------
// Basic requires
//

const assign = require('lodash.assign');
const autoprefixer = require('autoprefixer-core');
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const buffer = require('vinyl-buffer');
const changed = require('gulp-changed');
const del = require('del');
const express = require('express');
const fs = require('fs');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const http = require('http');
const imagemin = require('gulp-imagemin');
const jade = require('gulp-jade');
const merge = require('utils-merge');
const morgan = require('morgan');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const reactify = require('reactify');
const rev = require('gulp-rev');
const revNapkin = require('gulp-rev-napkin');
const revReplace = require('gulp-rev-replace');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const size = require('gulp-size');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const watchify = require('watchify');



// -------------------------------------------------
//
// TASKS
// 
// -------------------------------------------------



// ------------------------------------------------
// Apply production environment
//

gulp.task('apply-prod-environment', function(){
    process.env.NODE_ENV = 'production';
});

// ------------------------------------------------
// Apply dev environment
//

gulp.task('apply-dev-environment', function(){
    process.env.NODE_ENV = 'development';
});


// ------------------------------------------------
// Copy libraries (if any)
//

gulp.task('lib', function(){
    return gulp.src(config.lib.src)
        .pipe(uglify())
        .pipe(gulp.dest(config.lib.dest));
});


// ------------------------------------------------
// Clean out build folder
//

gulp.task('clean', function(cb){
    return del([config.dist.root], cb);
});

// -------------------------------------------------
//
// Move audio over
// 
// -------------------------------------------------
gulp.task('audio', function(){
    return gulp.src(config.audio.src)
        .pipe(gulp.dest(config.audio.dest));
});





// ------------------------------------------------
// Copy fonts
//

gulp.task('fonts', function(){
    return gulp.src(config.fonts.src)
        .pipe(changed(config.fonts.dest))
        .pipe(gulp.dest(config.fonts.dest));
});



// ------------------------------------------------
// Copy over data
//
gulp.task('data', function(){
    return gulp.src(config.data.src)
        .pipe(gulp.dest(config.data.dest));
});


// ------------------------------------------------
// Run Image min in production
//
gulp.task('images', function(){

    return gulp.src(config.images.src)
        .pipe(changed(config.images.dest))
        .pipe(gulpif(global.isProd, imagemin()))
        .pipe(gulp.dest(config.images.dest));
});



// -------------------------------------------------
//
// Script bundling
// 
// -------------------------------------------------

// ------------------------------------------------
// Bundle dev scripts
//

function bundleJs(bundler){

    return bundler.bundle()
        .on('error', function(err){
            gutil.log(err.message);
            browserSync.notify('Browserify error!');
            this.emit('end');
        })
        .pipe(plumber())
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(size({showFiles: true}))
        .pipe(browserSync.stream({once: true}));
}



// ------------------------------------------------
// Bundle production scripts
//

function bundleJsProd(bundler, cb){

    bundler.bundle()
        .on('error', function(err){
            gutil.log(err.message);
            browserSync.notify('Browserify error!');
            this.emit('end');
        })
        .pipe(plumber())
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(size({showFiles: true}));

    cb();
}




// ------------------------------------------------
// Dev scipts
//

gulp.task('scripts', function(){
    var args = merge(watchify.args, {debug: true});
    
    var bundler = watchify(browserify(config.scripts.main, args))
        .transform(babelify, {presets: ['es2015', 'react']});

    bundleJs(bundler);

    bundler.on('update', function(){
        bundleJs(bundler);
    });
});


// ------------------------------------------------
// Production scripts
//

gulp.task('scripts-prod', function(cb){

    var args = merge(watchify.args, {debug: true});

    var bundler = watchify(browserify(config.scripts.main, args))
        .transform(babelify, {presets: ['es2015', 'react']});


    bundleJsProd(bundler);

    

});



// ------------------------------------------------
// Dev styles
//

gulp.task('styles', function(){

    return gulp.src(config.styles.src)
        .pipe(plumber())
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths,
            sourceComments: 'map',
            sourceMap: 'sass',
            outputStyle: 'nested'
        }))
        .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
        .on('error', gutil.log)
        .pipe(gulp.dest(config.styles.dest))
        .pipe(size({showFiles: true}))
        .pipe(browserSync.stream());
});


// ------------------------------------------------
// Production styles
//

gulp.task('styles-prod', function(){

    return gulp.src(config.styles.src)
        .pipe(plumber())
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths,
            sourceComments: 'none',
            sourceMap: 'sass',
            outputStyle: 'compressed'
        }))

        .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
        .on('error', gutil.log)
        .pipe(gulp.dest(config.styles.dest))
        .pipe(size({showFiles: true}))
        .pipe(browserSync.stream());
});



// ------------------------------------------------
// Jade views
//


gulp.task('views', function(){

    
        return gulp.src(config.views.src)
            .pipe(plumber())
            .pipe(jade())
            .on('error', gutil.log)
            .pipe(gulp.dest(config.views.dest));
    

});




// ------------------------------------------------
// Extras (favicon, robots, etc)
//
gulp.task('extras', function(){
    return gulp.src(config.extras, {base: config.src})
        .pipe(gulp.dest('build'));
});



// ------------------------------------------------
// Rev (sometimes needs to be called manually after prod build)
//
gulp.task('rev', function(){

    gulp.src(['build/**/*.css', 'build/**/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('build/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/'));

    console.log('Rev finished');
});


// ------------------------------------------------
// Replace revisions in html
//
gulp.task('rev-replace', ['rev'], function(){

    console.log('Replace started');

    let manifest = gulp.src('./build/rev-manifest.json');

    

    gulp.src('./build/index.html')
        .pipe(revReplace({
            manifest: manifest
        }))
        .on('error', gutil.log)
        .pipe(plumber())
        .pipe(gulp.dest(config.dist.root));



        

});



// ------------------------------------------------
// Server
//
gulp.task('serve', function(){

    var server = express();

    //log all requests to console
    server.use(morgan('dev'));
    server.use(express.static(config.dist.root));

    //give index.html for all routes, leaving routing to Angular
    server.all('/*', function(req, res){

        res.sendFile('index.html', {root: 'build'});

    });

    //start server
    var s = http.createServer(server);

    s.on('error', function(err){

        if (err.code === 'EADDRINUSE'){
            gutil.log('Dev server already started on port');
        }
        else{
            throw(err);
        }

    });

    s.listen(config.serverPort);

});


// ------------------------------------------------
// Browser Sync
//
gulp.task('browser-sync', function(){

    browserSync({
        port: config.browserPort,
        ui: {
            port: config.UIPort
        },
        proxy: 'localhost:' + config.serverPort
    });

});





// ------------------------------------------------
// Reloads + Streams
//

gulp.task('reload-js', ['scripts'], function(){
    browserSync.reload();
});

gulp.task('reload-views', ['views'], function(){
    browserSync.reload();
});

gulp.task('reload-images', ['images'], function(){
    browserSync.reload();
});

gulp.task('reload-data', ['data'], function(){
    browserSync.reload();
});


// ------------------------------------------------
// Main Tasks
//

gulp.task('dev', ['clean'], function(){

    global.isProd = false;



    runSequence([
        'apply-dev-environment',
        'data',
        'extras',
        'audio',
        'lib',
        'views',
        'fonts',
        'styles',
        'scripts',
        'images'
        ], ['browser-sync', 'serve']);


    gulp.watch(config.styles.src, ['styles']);
    gulp.watch(config.views.src, ['reload-views']);
    gulp.watch(config.images.src, ['reload-images']);
    gulp.watch(config.data.src, ['reload-data']);

});



gulp.task('prod', ['clean'], function(){

    global.isProd = true;

    runSequence([
        'apply-prod-environment',
        'data',
        'extras',
        'audio',
        'scripts-prod',
        'lib',
        'views',
        'fonts',
        'styles-prod',
        'images'
        ], ['rev-replace']);
});



gulp.task('default', ['dev']);





