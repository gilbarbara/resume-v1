var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    bowerFiles  = require('main-bower-files')(),
    browserSync = require('browser-sync'),
    del         = require('del'),
    merge       = require('merge-stream'),
    runSequence = require('run-sequence');

var isProduction = function () {
        return process.env.NODE_ENV === 'production';
    },
    target       = function () {
        return (isProduction() ? 'dist' : '.tmp');
    };

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

gulp.task('lint', function () {
    return gulp.src('app/scripts/**/*')
        .pipe($.eslint({
            useEslintrc: true
        }))
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError());
});

gulp.task('media', function () {
    return gulp.src(['app/media/**/*.{jpg,gif,png}', '!app/media/thumbnails/**'])
        .pipe($.cache($.imagemin({
            verbose: true
        }, {
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(target() + '/media'))
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

    vendor = gulp.src('bower_components/modernizr/modernizr.js')
        .pipe($.uglify())
        .pipe($.rename('modernizr.min.js'))
        .pipe(gulp.dest(target() + '/scripts'))
        .pipe($.size({
            title: 'Vendor'
        }));

    html = gulp.src('app/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssmin()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(target()))
        .pipe($.size({
            title: 'HTML'
        }));

    extras = gulp.src([
        'app/*.*',
        '!app/*.html',
        'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    })
        .pipe(gulp.dest(target()))
        .pipe($.size({
            title: 'Extras'
        }));

    svg = gulp.src([
        'app/media/**/*.svg'
    ])
        .pipe(gulp.dest(target() + '/media'))
        .pipe($.size({
            title: 'SVG'
        }));

    return merge(html, vendor, extras, svg);
});

gulp.task('clean', del.bind(null, [target() + '/*']));

gulp.task('sizer', function () {
    return gulp.src(target() + '/**/*')
        .pipe($.size({
            title: 'Build',
            gzip: true
        }));
});

gulp.task('assets', function (cb) {
    runSequence('styles', cb); //, 'fonts'
});

gulp.task('clean', del.bind(null, [target() + '/*']));

gulp.task('serve', ['assets'], function () {
    browserSync({
        notify: true,
        logPrefix: 'resume',
        files: ['app/*.html', '.tmp/styles/**/*.css', 'app/scripts/*.js', 'app/media/**/*'],
        server: {
            baseDir: [target(), 'app'],
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

gulp.task('gh-pages', function () {
    return gulp.src('dist/**/*')
        .pipe($.ghPages({
            force: true
        }));
});

gulp.task('deploy', function (cb) {
    runSequence('build', ['gh-pages'], cb);
});

gulp.task('build', ['clean'], function (cb) {
    process.env.NODE_ENV = 'production';
    runSequence('lint', ['assets', 'bundle'], 'sizer', cb);
});

gulp.task('default', ['serve']);
