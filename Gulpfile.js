//Notes
//This setup uses only one typescript file that is then compiled and turned into the main js file. For multiple .ts files or js concatenation, add the 'js-concat' task to the 'default' task


//Make sure these node modules are globally installed on your machine via the command "sudo npm install -g <modulename>"
//Then save these modules as developer dependences with the command 'sudo npm install --save-dev <modulename>'
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyHTML = require('gulp-htmlmin'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    inlineCss = require('gulp-css-inliner'),
    zip = require('gulp-zip'),
    webserver = require('gulp-webserver');

//Date Variables
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){ 
    dd='0'+dd
    //to make the day format uniformly 2 digits
} 
if(mm<10){
    mm='0'+mm
} 
var today = mm+'_'+dd+'_'+yyyy;
//******* Location Variables - edit these locations depending on the file structure of your project *******//
//** Precompiled files
var allSass = './sass/**/*.scss',
    allTS = './typescript/**/*.ts',
    allJS = './js/**/*.js',
    allImages = './images/**/*.{jpg,png,gif,tiff,svg}',
    allHTML = './*.html',
    imagesFolder = 'images/';

var jsSources =['scripts.js', 'output.js'];//these will be concatenated together
//These are the only sass or typescript files that will actually be compiled
var tsMaster = 'typescript/main.ts';
var sassMaster = 'sass/main.scss';
//** Final Locations and Names **
var finalCssFolder = 'css/',
    finalJsFolder = 'js/',
    finalCssFile = 'styles.css',
    finalJsFile = 'scripts.js';
// Compressed Locations
var compressedCSS  = 'compressed/css/',
    compressedJS   = 'compressed/js/',
    compressedHTML = 'compressed/';
//Email Workflow Locations
var HTMLemail = 'index.html',
    emailZipLocation = 'email/',
    emailZipSources = './email/**/*',
    emailZipDestination = 'zips/';




//******* - Tasks -  *******//
    //  edit with care  //

//$$$$$$$ - Sass/CSS - $$$$$$//
//plain old sass compiler function
gulp.task('sass', function () {
    return sass(sassMaster, {
      sourcemap: true,
      style: 'nested'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(finalCssFolder));
});

//minify the css using cleanCSS plugin. Added options to show the size difference after minification
gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log('CleanCSS minification details: \n');
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(compressedCSS));
});

//inline your CSS, possibly for use in an html email
gulp.task('inlineCSS', function() {
    return gulp.src(HTMLemail)
        .pipe(inlineCss({
            	applyStyleTags: true,
            	applyLinkTags: true,
                preserveMediaQueries: false, 
                applyWidthAttributes: false,
            	removeStyleTags: true,
            	removeLinkTags: true
        }))
        .pipe(gulp.dest(emailZipLocation));
        console.log("CSS has been inlined and new file moved to " + emailZipLocation);
});




//sass compression task - not really needed
gulp.task('sass-compressed', function () {
    return sass(sassMaster, {
      style: 'compressed'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(gulp.dest(compressedCSS));
});

//~~~~~~ - Typescript/Javascript - ~~~~~~//
//plain old typescript compiler function
gulp.task('typescript', function () {
    return gulp.src(tsMaster)
        .pipe(typescript({
            noImplicitAny: false,
            removeComments: false,
            pretty: true,
            outFile: 'scripts.js'
        }))
        .pipe(gulp.dest(finalJsFolder));
});

//an optional javascript linter task
gulp.task('js-hint', function() {
  return gulp.src('js/scripts.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

//this is the task that combines your js files- probably not very useful with the current setup that includes local bootstrap and jquery with custom js in the same subdirectory
gulp.task('concat-js', function(){
    // the string you input will become the name of the concatenated file that you will use in the production version
    console.log("This is the src: " + jsSources);
    console.log("this is the dest: " + compressedJS);
    return gulp.src(allJS)
    .pipe(concat('script.js'))
    .pipe(gulp.dest(compressedJS));
});

//+++++ - HTML - +++++//
//minify html
gulp.task('minify-html', function() {
  return gulp.src(__dirname + '/*.html')
    .pipe(minifyHTML({collapseWhitespace: true}))
    .pipe(gulp.dest(compressedHTML));
});




//%%%%% - Other Tasks - %%%%%//
//Set up a webserver
gulp.task('webserver', function() {
    gutil.log("This is the name of the current directory: " + __dirname);
    gulp.src(__dirname)
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

//Copy Images from the images folder and place within the email folder so that it can be zipped and sent to an email client
//copy the directory
gulp.task('copyImageFolder', function() {
   gulp.src(imagesFolder)
   .pipe(gulp.dest(emailZipLocation));
   console.log("Creating a new images folder...");
});
//copy the files
gulp.task('copyImageFiles', function() {
   gulp.src(allImages)
   .pipe(gulp.dest(emailZipLocation + imagesFolder));
   console.log("Populating new folder with image files...");
});
//do both
gulp.task('copyImages', ['copyImageFolder', 'copyImageFiles']);

//zip your files in a compressed form 
//Note:this task uses ES6 features
gulp.task('zipper', () => {
    return gulp.src(emailZipSources)
        .pipe(zip(`zipped${today}.zip`))
        .pipe(gulp.dest(emailZipDestination));
        console.log("Zipping " + emailZipSources + " And moving to " + emailZipDestination);
});






//!@!@!@!@!@!@!@  -  Watcher and Combined Tasks  -  !@!@!@!@!@!@!@!@//
//watches the sass and ts folder for changes. when changes occur, it runs the compiler task for their respective languages
gulp.task('watcher', function() {
    //ts compiler task
  //gulp.watch(allTS, ['typescript']);
  gulp.watch(allSass, ['sass']);
});

//Compress html, js, and css
gulp.task('compress', ['minify-css', 'minify-html']);

//inline css and zip your email up
gulp.task('email', ['copyImages', 'inlineCSS', 'zipper']);



//The 'default' task runs everytime you just run 'gulp' on the command line. It's good for having tasks execute when you are working on a project.
gulp.task('default', ['watcher', 'sass', 'webserver']);



//@@@ - Resources - @@@//
//  http://gulpjs.com/plugins/
//  http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
//  https://www.npmjs.com/package/gulp-typescript/
//  https://www.typescriptlang.org/docs/handbook/compiler-options.html
//  https://www.npmjs.com/package/gulp-inline-css/#optionspreservemediaqueries
//  https://www.npmjs.com/package/gulp-zip/