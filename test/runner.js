#!/usr/bin/env node
require( 'babel-register' )();

const program = require( 'commander' ),
    glob = require( 'glob' ),
    Mocha = require( 'mocha' ),
    path = require( 'path' );

program
    .usage( '[options] [files]' )
    .option( '-R, --reporter <name>', 'specify the reporter to use', 'spec' )
    .option( '-g, --grep <pattern>', 'only run tests matching <pattern>' );

program.name = 'runner';

program.parse( process.argv );

const mocha = new Mocha( {
    ui: 'bdd',
    reporter: program.reporter
} );

if ( program.grep ) {
    mocha.grep( new RegExp( program.grep ) );
}

if ( program.args.length ) {
    program.args.forEach( function( file ) {
        mocha.addFile( file );
    } );
} else {
    glob.sync( 'client/lib/**/test/**.js' ).forEach( file => {
        mocha.addFile( file );
    });
    glob.sync( 'client/state/**/test/**.js' ).forEach( file => {
        mocha.addFile( file );
    } );
}

mocha.run( function( failures ) {
    process.on( 'exit', function() {
        process.exit( failures ); //eslint-disable-line no-process-exit
    } );
} );
