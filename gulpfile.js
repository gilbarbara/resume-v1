/*eslint-disable no-var, one-var, func-names, indent, prefer-arrow-callback, object-shorthand, no-console, newline-per-chained-call, one-var-declaration-per-line, vars-on-top  */
var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    browserify  = require('browserify'),
    buffer      = require('vinyl-buffer'),
    browserSync = require('browser-sync'),
    del         = require('del'),
    lrload      = require('livereactload'),
    merge       = require('merge-stream'),
    path        = require('path'),
    runSequence = require('run-sequence'),
    source      = require('vinyl-source-stream'),
    watchify    = require('watchify');

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        if (interfaces.hasOwnProperty(devName)) {
            var iface = interfaces[devName];

            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }

    return '0.0.0.0';
}

function watchifyTask(options) {
    var bundler, rebundle, iteration = 0;
    bundler = browserify({
        basedir: '.',
        entries: path.join(__dirname, '/app/scripts/main.js'),
        insertGlobals: false, // options.watch,
        cache: {},
        debug: false, // options.watch,
        packageCache: {},
        fullPaths: false, // options.watch,
        plugin: options.watch ? [[lrload, { host: getIPAddress() }]] : [],
        extensions: ['.jsx']
    });

    if (options.watch) {
        bundler = watchify(bundler);
    }

    rebundle = function() {
        var stream = bundler.bundle();

        if (options.watch) {
            stream.on('error', function(err) {
                console.log(err);
            });
        }

        stream
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(gulp.dest('.tmp/scripts'))
            .pipe($.tap(function() {
                if (iteration === 0 && options.cb) {
                    options.cb();
                }
                iteration++;
            }));
    };

    bundler.on('update', rebundle);
    return rebundle();
}

gulp.task('styles', function() {
    return gulp.src('app/styles/main.scss')
        .pipe($.changed('styles', {
            extension: '.scss'
        }))
        .pipe($.plumber())
        .pipe($.sass.sync({
            includePaths: ['bower_components'],
            precision: 4
        }).on('error', $.sass.logError))
        .pipe($.plumber.stop())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(browserSync.stream())
        .pipe($.size({
            title: 'Styles'
        }));
});

// Scripts
gulp.task('scripts', function(cb) {
    return watchifyTask({
        watch: !isProduction(),
        cb: cb
    });
});

gulp.task('lint', function() {
    return gulp.src('app/scripts/**/*')
        .pipe($.eslint({
            useEslintrc: true
        }))
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError());
});

gulp.task('media', function() {
    return gulp.src(['**/*.{jpg,gif,png}'], { cwd: 'app/media/' })
        .pipe($.imagemin({
            verbose: true,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/media'))
        .pipe($.size({
            title: 'Media'
        }));
});

gulp.task('bundle', function() {
    var html,
        extras,
        svg,
        assets = $.useref.assets();

    html = gulp.src('app/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssmin()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size({
            title: 'HTML'
        }));

    extras = gulp.src([
            'app/*.*',
            '!app/*.html'
        ], {
            dot: true
        })
        .pipe(gulp.dest('dist'))
        .pipe($.size({
            title: 'Extras'
        }));

    svg = gulp.src([
            '**/*.svg'
        ], { base: 'app/media/' })
        .pipe(gulp.dest('dist/media'))
        .pipe($.size({
            title: 'SVG'
        }));

    return merge(html, extras, svg);
});

gulp.task('sizer', function() {
    return gulp.src('dist/**/*')
        .pipe($.size({
            title: 'Build',
            gzip: true
        }));
});

gulp.task('assets', function(cb) {
    runSequence('styles', 'scripts', cb);
});

gulp.task('clean', function(cb) {
    var target = ['.tmp/*'];
    if (isProduction()) {
        target.push('dist/*');
    }

    return del(target, cb);
});

gulp.task('gh-pages', function() {
    return gulp.src(['dist/**/*'], {
            dot: true
        })
        .pipe($.ghPages({
            remoteUrl: 'https://github.com/gilbarbara/gilbarbara.github.io',
            branch: 'master',
            force: true
        }));
});

gulp.task('serve', ['assets'], function() {
    browserSync.init({
        notify: true,
        logPrefix: 'resume',
        server: {
            baseDir: ['app', '.tmp'],
            routes: {
                '/bower_components': './bower_components'
            }
        }
    });

    gulp.watch('app/styles/**/*.scss', function(e) {
        if (e.type === 'changed') {
            gulp.start('styles');
        }
    });
    gulp.watch(['app/*.html', 'app/media/**/*', 'app/texts.json']).on('change', browserSync.reload);
});

gulp.task('build', ['clean'], function(cb) {
    process.env.NODE_ENV = 'production';
    runSequence('lint', 'assets', ['media', 'bundle'], 'sizer', cb);
});

gulp.task('deploy', function(cb) {
    runSequence('build', ['gh-pages'], cb);
});

gulp.task('default', ['serve']);
