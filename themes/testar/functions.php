<?php

function tripshare_theme_support() {
    // Adds dynamic title tag support
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
}

add_action('after_theme_setup', 'tripshare_theme_support');

function config_custom_logo() {
        
    add_theme_support( 'custom-logo' );

}

add_action( 'after_setup_theme' , 'config_custom_logo' );

function tripshare_menus() {
    $locations = array(
      'primary' => "Navbar Menu",
      'footer' => "Footer Menu"
    );

    register_nav_menus($locations);
}

add_action('init', 'tripshare_menus');

function wpb_add_google_fonts() {
 
    wp_enqueue_style( 'wpb-google-fonts', '<link href="https://fonts.googleapis.com/css?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">', false ); 
    }
     
    add_action( 'wp_enqueue_scripts', 'wpb_add_google_fonts' );

function tripshare_register_styles() {

    $version = wp_get_theme()->get('Version');
    wp_enqueue_style('tripshare-style', get_template_directory_uri() . "/style.css", array('tripshare-font'), $version, 'all');
    wp_enqueue_style('tripshare-font', "https://fonts.googleapis.com/css?family=Inter", array(), '1.0', 'all');
    wp_enqueue_style('tripshare-fontawesome', "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css", array(), '4.7.0', 'all');

}

add_action('wp_enqueue_scripts', 'tripshare_register_styles');

function tripshare_register_scripts() {

wp_enqueue_script('tripshare-findatrip', get_template_directory_uri()."/assets/js/index.js", array(), '1.0', false);

if( is_page( 16 ) ) {
wp_enqueue_script('tripshare-newtrip', get_template_directory_uri()."/assets/js/newtrip.js", array(), '1.0', false);
}

if( is_page( 14 ) ) {
wp_enqueue_script('tripshare-updatetrip', get_template_directory_uri()."/assets/js/updatetrip.js", array(), '1.0', false);
}

}

add_action('wp_enqueue_scripts', 'tripshare_register_scripts');

?>