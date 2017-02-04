
// dependencies
var path = require('path');

// grab our gulp packages
var gulp = require('gulp');
var gutil = require('gulp-util');

var runSequence = require('run-sequence');

var exec = require('child_process').exec;

var useref = require('gulp-useref');

var watch = require('gulp-watch');

var gulpCopy = require('gulp-copy');

var clean = require('gulp-clean');

var es = require('event-stream');

var _ = require('underscore');

// VARIABLES
var PACKAGE_JSON = './package.json';

var BACKEND_FOLDER = './backend/';
var FRONTEND_FOLDER = './frontend/';

var BUILD_FOLDER = './build/';

// default task and clean
gulp.task('default', ['dev']);

gulp.task('clean', function(){
	return gulp.src(BUILD_FOLDER)
	.pipe(clean());
});

// build
gulp.task('build', function(){
	return runSequence('clean', ['be', 'fe']);
});

// build - backend
gulp.task('be', function(cb){
	var srcFiles = path.join(BACKEND_FOLDER, './**/*');
	return es.merge(
		gulp.src(PACKAGE_JSON),
		gulp.src(srcFiles)
	).pipe(gulp.dest(BUILD_FOLDER));
});

// build - frontend
gulp.task('fe', function(cb){
	var p = exec('ng build --no-progress', {
		cwd: FRONTEND_FOLDER,
		maxBuffer: 1024 * 500
	}, function(err, stdout, stderr){
		cb(err);
	});

	p.stdout.on('data', function(data){
		var d = data.toString();
		d = d.replace(/\n$/, '');
		gutil.log(d);
	});

	p.stderr.on('data', function(data){
		var d = data.toString();
		d = d.replace(/\n$/, '');
		gutil.log(gutil.colors.red(d));
	});
});

gulp.task('fe-watch', function(cb){
	var p = exec('ng build --no-progress --watch', {
		cwd: FRONTEND_FOLDER,
		maxBuffer: 1024 * 500
	}, function(err, stdout, stderr){
		cb(err);
	});

	p.stdout.on('data', function(data){
		var d = data.toString();
		d = d.replace(/\n$/, '');
		gutil.log(d);
	});

	p.stderr.on('data', function(data){
		var d = data.toString();
		d = d.replace(/\n$/, '');
		gutil.log(gutil.colors.red(d));
	});
});

// dev task
gulp.task('dev-be', function(cb){
	console.log("Starting backend...");
	gutil.log(gutil.colors.blue("Starting dev server..."));
	var p = exec('node server.js', {
		cwd: BUILD_FOLDER,
		env: {
			DEBUG: true
		}
	}, function (err, stdout, stderr) {
		cb(err);
	});
	
	p.stdout.on('data', function(data){
		var d = data.toString();
		d = d.replace(/\n$/, '');
		gutil.log(d);
	});

	p.stderr.on('data', function(data){
		var d = data.toString();
		d = d.replace(/\n$/, '');
		gutil.log(gutil.colors.red(d));
	});
});
gulp.task('dev-fe', function(cb){
	console.log("Watching files...");
	var srcFiles = path.join(FRONTEND_FOLDER, './**/*');
	watch(srcFiles, function(){
		gulp.start('fe-watch');
	});
});
gulp.task('dev', ['dev-be', 'dev-fe']);
