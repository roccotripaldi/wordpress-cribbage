<?php

/*
Plugin Name: WordPress Cribbage
Description: Play cribbage on your WordPress blog.
Author: Rocco Tripaldi
Version: 1.0
Author URI: http://www.roccotripaldi.com/
*/
define( 'WP_CRIBBAGE_VERSION', '1.0' );
define( 'WP_CRIBBAGE_DIR', dirname( __FILE__ ) );
define( 'WP_CRIBBAGE_PATH', plugins_url() . '/wp-cribbage/' );

// register a route for our app
require( 'class.wp-cribbage.php' );
