var gulp        = require('gulp'),
	$           = require('gulp-load-plugins')(),
	bowerFiles  = require('main-bower-files')(),
	browserSync = require('browser-sync'),
	del         = require('del'),
	merge       = require('merge-stream'),
	runSequence = require('run-sequence');

var env    = process.env.NODE_ENV || 'development',
	config = {
		dest: function () {
			return (env === 'development' ? '.tmp' : 'dist');
		}
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
		.pipe(gulp.dest(config.dest() + '/styles'))
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

gulp.task('html', function () {
	var stream = true,
		assets;

	if (env === 'production') {
		assets = $.useref.assets();

		stream = gulp.src('app/*.html')
			.pipe(assets)
			.pipe($.if('*.js', $.uglify()))
			.pipe($.if('*.css', $.cssmin()))
			.pipe(assets.restore())
			.pipe($.useref())
			.pipe(gulp.dest(config.dest()))
			.pipe($.size({
				title: 'HTML'
			}));
	}
	return stream;
});

gulp.task('media', function () {
	return gulp.src(['app/media/**/*.{jpg,gif,png}', '!app/media/thumbnails/**'])
		.pipe($.cache($.imagemin({
			verbose: true
		}, {
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(config.dest() + '/media'))
		.pipe($.size({
			title: 'Media'
		}));
});

gulp.task('fonts', function () {
	return gulp.src(bowerFiles)
		.pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
		.pipe($.flatten())
		.pipe(gulp.dest(config.dest() + '/styles/fonts'))
		.pipe($.size({
			title: 'Fonts'
		}));
});

gulp.task('extras', function () {
	var vendor, extras, svg, files;

	if (env === 'production') {
		vendor = gulp.src('bower_components/modernizr/modernizr.js')
			.pipe($.uglify())
			.pipe($.rename('modernizr.min.js'))
			.pipe(gulp.dest(config.dest() + '/scripts'))
			.pipe($.size({
				title: 'Vendor'
			}));

		files = gulp.src([
			'app/files/**/*'
		])
			.pipe(gulp.dest(config.dest() + '/files'))
			.pipe($.size({
				title: 'files'
			}));
	}

	extras = gulp.src([
		'app/*.*',
		'!app/*.html',
		'node_modules/apache-server-configs/dist/.htaccess'
	], {
		dot: true
	})
		.pipe(gulp.dest(config.dest()))
		.pipe($.size({
			title: 'Extras'
		}));

	svg = gulp.src([
		'app/media/**/*.svg'
	])
		.pipe(gulp.dest(config.dest() + '/media'))
		.pipe($.size({
			title: 'SVG'
		}));

	return vendor ? merge(vendor, extras, svg, files) : merge(extras, svg);
});

gulp.task('clean', del.bind(null, [config.dest() + '/*']));

gulp.task('sizer', function () {
	return gulp.src(config.dest() + '/**/*')
		.pipe($.size({
			title: 'Build',
			gzip: true
		}));
});

gulp.task('assets', ['clean'], function (cb) {
	runSequence('styles', ['media', 'fonts', 'extras'], cb);
});

gulp.task('clean', function (cb) {
	del([config.dest() + '/*'], cb);
});

gulp.task('serve', ['assets'], function () {
	browserSync({
		notify: true,
		logPrefix: 'kollectiv',
		files: ['app/*.html', '.tmp/styles/**/*.css', 'app/scripts/*.js', 'app/media/**/*'],
		server: {
			baseDir: [config.dest(), 'app'],
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

    gulp.watch('app/styles/**/*.scss', ['']);
	//gulp.watch('bower.json', ['bundle', browserSync.reload]);
});

gulp.task('build', ['clean'], function () {
	env = 'production';
	runSequence(['assets', 'html'], 'sizer');
});

gulp.task('default', ['serve']);
