var gulpAutoprefixer = require( 'gulp-autoprefixer' ),
    gulp = require( 'gulp' ),
    gulpBanner = require( 'gulp-banner' ),
    gulpRename = require( 'gulp-rename' ),
    gulpSass = require( 'gulp-sass' ),
    gulpUtil = require( 'gulp-util' ),
    webpack = require( 'webpack' );

function onBuild( done ) {
    return function( err, stats ) {

        // Webpack doesn't populate err in case the build fails
        // @see https://github.com/webpack/webpack/issues/708
        if ( stats.compilation.errors && stats.compilation.errors.length ) {
            if ( done ) {
                done( new gulpUtil.PluginError( 'webpack', stats.compilation.errors[0] ) );
                return; // Otherwise gulp complains about done called twice
            }
        }

        gulpUtil.log( 'Building JS…', stats.toString( {
            colors: true,
            hash: true,
            version: false,
            timings: true,
            assets: true,
            chunks: true,
            chunkModules: false,
            modules: false,
            cached: false,
            reasons: false,
            source: false,
            errorDetails: true,
            children: false
        } ), "\nJS finished at", Date.now() );

        if ( done ) {
            done();
        }
    };
}

function getWebpackConfig() {
    // clone and extend webpackConfig
    var config = Object.create( require( './webpack.config.js' ) );
    config.devtool = 'sourcemap';
    config.debug = true;

    return config;
}

function doSass( done ) {
    if ( arguments.length ) {
        console.log( 'Sass file ' + arguments[0].path + ' changed.' );
    }
    console.log( 'Building Dashboard CSS bundle...' );
    gulp.src( './client/css/app.scss' )
        .pipe( gulpSass( { outputStyle: 'compressed' } ).on( 'error', gulpSass.logError ) )
        .pipe( gulpBanner( '/* Do not modify this file directly.  It is compiled SASS code. */\n' ) )
        .pipe( gulpAutoprefixer( { browsers: [ 'last 2 versions', 'ie >= 8' ] } ) )
        .pipe( gulpRename( { suffix: '.min' } ) )
        .pipe( gulp.dest( './client/css' ) )
        .on( 'end', function() {
            console.log( 'Dashboard CSS finished.' );
            done();
        } );
}

gulp.task( 'react:build', function( done ) {
    process.env.NODE_ENV = 'production';

    var config = getWebpackConfig();
    config.plugins = config.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin( {
            minimize: true,
            compress: {
                warnings: false
            }
        } )
    );

    config.devtool = 'source-map';
    config.debug = false;

    webpack( config ).run( onBuild( done ) );
} );

gulp.task( 'sass:build', function( done ) {
    doSass( done );
} );

gulp.task( 'react:watch', function() {
    var config = getWebpackConfig();

    webpack( config ).watch( 100, onBuild() );
} );

gulp.task( 'sass:watch', function() {
    doSass();
    gulp.watch( [ './**/*.scss' ], doSass );
} );

// Default task
gulp.task( 'default', gulp.series( 'react:build', 'sass:build' ) );
gulp.task( 'watch',  gulp.series( 'react:watch', 'sass:watch' ) );
