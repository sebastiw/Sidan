
// grab our gulp packages
var gulp  = require('gulp');
var gutil = require('gulp-util');

var exec = require('child_process').exec;

var useref = require('gulp-useref');

var watch = require('gulp-watch');

var gulpCopy = require('gulp-copy');

var clean = require('gulp-clean');

var es = require('event-stream');

var _ = require('underscore');

// VARIABLES
var PACKAGE_JSON = './package.json';

var SRC_FOLDER = './src/';
var SRC_WEBAPP = [
	SRC_FOLDER + 'www/index.html',
	SRC_FOLDER + 'www/app/*.js'
	//,SRC_FOLDER + 'www/css/homer.css'
];
var SRC_FILES = [
	SRC_FOLDER + '**/*'
];
SRC_FILES = SRC_FILES.concat(_.map(SRC_WEBAPP, function(f){
	return '!' + f;
}));
var BUILD_FOLDER = './build/';
var BUILD_FILES = BUILD_FOLDER + '**/*';

// create a default task and just log a message
gulp.task('default', ['watch']);

gulp.task('clean', function(){
	return gulp.src(BUILD_FOLDER)
	.pipe(clean());
});

gulp.task('webapp', function () {
	return gulp.src(SRC_FOLDER+'www/index.html')
	.pipe(useref())
	.pipe(gulp.dest(BUILD_FOLDER+'www'));
});

gulp.task('build', ['clean', 'logo', 'webapp'], function(cb){
	return es.merge(
		gulp.src(PACKAGE_JSON),
		gulp.src(SRC_FILES)
	).pipe(gulp.dest(BUILD_FOLDER));
});

gulp.task('watch', ['build'], function(){
	watch(SRC_WEBAPP, function(){
		gulp.start('webapp');
	});

	watch(SRC_FILES)
	.pipe(gulp.dest(BUILD_FOLDER))
	
	watch(BUILD_FILES)
	.pipe(piSftp);
});

gulp.task('deploy', ['build'], function(){
	return gulp.src(BUILD_FILES)
	.pipe(piSftp);
});

gulp.task('dev', function(cb){
	gutil.log(gutil.colors.blue("Starting dev server..."));
	var p = exec('node server.js', {
		cwd: SRC_FOLDER,
		env: {
			DEBUG: true
		}
	}, function (err, stdout, stderr) {
		cb(err);
	});

	p.stdout.on('data', function (data) {
		var d = data.toString();
		d = d.replace(/\n$/, '');
		gutil.log(d);
	});

	p.stderr.on('data', function (data) {
		var d = data.toString();
		d = d.replace(/\n$/, '');
		gutil.log(gutil.colors.red(d));
	});

});
