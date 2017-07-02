<?php

class WP_Cribbage {

	function __construct() {
		add_action( 'init', array( $this, 'create_main_route' ) );
		add_action( 'init', array( $this, 'maybe_flush_rewrites' ), 999 );
		add_action( 'template_include', array( $this, 'maybe_serve_template' ), 99 );
	}

	/**
	 * Creates rewrites based on our app's url base - yoursite.com/play-cribbage
	 */
	function create_main_route() {

		add_rewrite_rule( '^app-route/?$','index.php?cribbage=/','top' );
		add_rewrite_rule( '^app-route(.*)?','index.php?cribbage=$matches[1]','top' );

		global $wp;
		$wp->add_query_var( 'cribbage' );
	}

	/**
	 * Flush rewrites when plugin is first loaded, and whenever the version changes
	 * Note: `flush_rewrite_rules()` should be used sparingly
	 */
	function maybe_flush_rewrites() {
		$version = get_option( 'wp-cribbage_version', null );

		if ( empty( $version ) ||  $version !== WP_CRIBBAGE_VERSION ) {
			flush_rewrite_rules();
			update_option( 'wp_react_plugin_version', WP_CRIBBAGE_VERSION );
		}
	}

	/**
	 * If we are within our app route, register any js and css, and serve our main template
	 */
	function maybe_serve_template( $template ) {
		if ( empty( $GLOBALS['wp']->query_vars['cribbage'] ) )
			return $template;

		wp_register_script( 'wp_cribbage', WP_CRIBBAGE_PATH . 'client/build/bundle.min.js' );
		wp_register_style( 'wp_cribbage', WP_CRIBBAGE_PATH . 'client/css/app.min.css' );

		$wp_cribbage_template = WP_CRIBBAGE_DIR . '/app.php';
		return $wp_cribbage_template;
	}
}
new WP_Cribbage();