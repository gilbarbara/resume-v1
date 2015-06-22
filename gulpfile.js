var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    browserify  = require('browserify'),
    bowerFiles  = require('main-bower-files')(),
    buffer      = require('vinyl-buffer'),
    browserSync = require('browser-sync'),
    del         = require('del'),
    historyApiFallback    = require('connect-history-api-fallback'),
    merge       = require('merge-stream'),
    path        = require('path'),
    runSequence = require('run-sequence'),
    source      = require('vinyl-source-stream'),
    watchify    = require('watchify');

var isProduction = function () {
        return process.env.NODE_ENV === 'production';
    },
    target       = function () {
        return (isProduction() ? 'dist' : '.tmp');
    },
    middleware   = historyApiFallback({});

function watchifyTask (options) {
    var bundler, rebundle, iteration = 0;
    bundler = browserify({
        entries: path.join(__dirname, '/app/scripts/main.js'),
        insertGlobals: true,
        cache: {},
        //debug: options.watch,
        packageCache: {},
        fullPaths: options.watch, //options.watch
        extensions: ['.jsx'],
        transform: [
            ['babelify', { ignore: /bower_components/ }]
        ]
    });

    if (options.watch) {
        bundler = watchify(bundler);
    }

    rebundle = function () {
        var stream = bundler.bundle();

        if (options.watch) {
            stream.on('error', function (err) {
                console.log(err);
            });
        }

        stream
            .pipe(source($.if(options.watch, 'main.js', 'main.min.js')))
            .pipe(buffer())
            .pipe($.if(!options.watch, $.uglify()))
            .pipe(gulp.dest(target() + '/scripts'))
            .pipe($.tap(function () {
                if (iteration === 0 && options.cb) {
                    options.cb();
                }
                iteration++;
            }));
    };

    bundler.on('update', rebundle);
    return rebundle();
}

gulp.task('styles', function () {
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
        .pipe($.size({
            title: 'Styles'
        }));
});

// Scripts
gulp.task('scripts', function (cb) {
    return watchifyTask({
        watch: !isProduction(),
        cb: cb
    });
});

gulp.task('lint', function () {
    return gulp.src('app/scripts/**/*')
        .pipe($.eslint({
            useEslintrc: true
        }))
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError());
});

gulp.task('media', function () {
    return gulp.src(['**/*.{jpg,gif,png}'], { cwd: 'app/media/' })
        .pipe($.imagemin({
            verbose: true
        }, {
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/media'))
        .pipe($.size({
            title: 'Media'
        }));
});

gulp.task('fonts', function () {
    return gulp.src(bowerFiles)
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(target() + '/styles/fonts'))
        .pipe($.size({
            title: 'Fonts'
        }));
});

gulp.task('bundle', function () {
    var html,
        vendor,
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

    vendor = gulp.src('bower_components/modernizr/modernizr.js')
        .pipe($.uglify())
        .pipe($.rename('modernizr.min.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.size({
            title: 'Vendor'
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

    return merge(html, vendor, extras, svg);
});

gulp.task('sizer', function () {
    return gulp.src(target() + '/**/*')
        .pipe($.size({
            title: 'Build',
            gzip: true
        }));
});

gulp.task('assets', function (cb) {
    runSequence('styles', 'scripts', cb); //, 'fonts'
});

gulp.task('clean', function (cb) {
	del([target() + '/*'], cb);
});

gulp.task('gh-pages', function () {
    return gulp.src(['dist/**/*'], {
        dot: true
    })
        .pipe($.ghPages({
            remoteUrl: 'https://github.com/gilbarbara/gilbarbara.github.io',
            branch: 'master',
            force: true
        }));
});

gulp.task('serve', ['assets'], function () {
    browserSync({
        notify: true,
        logPrefix: 'resume',
        files: ['app/*.html', '.tmp/styles/**/*.css', '.tmp/scripts/*.js', 'app/media/**/*'],
        server: {
            baseDir: [target(), 'app'],
            middleware: [middleware],
            routes: {
                '/bower_components': './bower_components'
            }
        }
    });

    gulp.watch('app/styles/**/*.scss', function (e) {
        if (e.type === 'changed') {
            gulp.start('styles');
        }
    });
    //gulp.watch('bower.json', ['bundle', browserSync.reload]);
});

gulp.task('build', ['clean'], function (cb) {
    process.env.NODE_ENV = 'production';
    runSequence('lint', 'assets', ['media', 'bundle'], 'sizer', cb);
});

gulp.task('deploy', function (cb) {
    runSequence('build', ['gh-pages'], cb);
});

gulp.task('default', ['serve']);
