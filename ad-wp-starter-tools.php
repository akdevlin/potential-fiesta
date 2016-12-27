<?php

#--------------------------------------#
#--------- WP Config Settings ---------#
#--------------------------------------#
#Redefine WP Content or Plugins Directory or URL
//set the constants to a custom file path

    define('WP_CONTENT_DIR', $_SERVER_DIR['DOCUMENT_ROOT'] . '/fun-zone/wp-content'); //redefine wp-content directory's file path here
    define('WP_CONTENT_URL', 'https://www.myfun-site.com/fun-zone/wp-content'); //redefine wp-content's URL here

    define('WP_PLUGIN_DIR', $_SERVER_DIR['DOCUMENT_ROOT'] . '/fun-zone/wp-content/plugins'); //redefine plugin directory's file path here
    define('WP_PLUGIN_URL', 'https://www.myfun-site.com/fun-zone/wp-/content/plugins'); //redefine plugins's URL here
#WP Post Revisions
//Limit the number of post revisions that will be saved by wordpress

    define('WP_POST_REVISIONS', false);
    define('WP_POST_REVISIONS', 5);

#Wordpress Autosave Interval
//set the AJAX autosave interval for wordpress. default is 60(s)

    define('AUTOSAVE_INTERVAL', 300); //sets it to 5 minutes
#Set Trash Pickup Interval
//change the length of time deleted items will be saved by wordpress

    define('EMPTY_TRASH_DAYS', 7);

#Enable Wordpress MultiSite options
//I don't know anything about this
    define('WP_ALLOW_MULTISITE', true);

#-----------------------------#
#--------- Debugging ---------#
#-----------------------------#
# WordPress Query Debugging
//-- set this constants in php.config to enable the functions
//This will allow you to debug the current page by saving each query that wordpress runs. Probably not a great idea for a production environment

    define('SAVEQUERIES', true);

//call this function on any template file to view the queries that wordpress is running
//>>>>doublecheck that this function is set up correctly in php and it doesn't need to explicitly return a value like in js'
    function ad_query_debug() {
        if (current_user_can('manage_options')) { //only shows this debugging feature if the user has the baility to manage options
            global $wpdb;
            return print_r($wpdb->queries);
        }
    }

#Environmental Data
//use WordPress global variables created for browser detection
//
//
//This function prints some environmental data for the current user?
//>> Needs some more polishing but could be cool 
    function ad_print_environment($theUser = '')

    if (empty($theUser)) {
        global $current_user;
        $theName = $current_user->display_name;
        $theId = $current_user->user_id;
    } else {
        $theName = $theUser->display_name;
        $theId = $current_user->user_id;
    }


    $responseToTheEnvironment = 'Hi, ' . $theName . ' ';

//Browser Environment
    global $is_lynx, $is_IE, $is_chrome, $is_edge, $is_gecko, $is_safari, $is_NS4, $is_iphone;
    if ($is_IE) {
        $responseToTheEnvironment += 'you are using ' . 'Internet Explorer...';
    } elseif ($is_lynx) {
        $responseToTheEnvironment += 'you are using ' . 'Lynx. ';
    } elseif ($is_chrome) {
        $responseToTheEnvironment += 'you are using ' . 'Chrome! ';
    } elseif ($is_edge) {
        $responseToTheEnvironment += 'you are using ' . 'Edge... ';
    } elseif ($is_opera) {
        $responseToTheEnvironment += 'you are using ' . 'Opera! ';
    } elseif ($is_NS4) {
        $responseToTheEnvironment += 'you are using ' . 'Netscape? ';
    } elseif ($is_iphone) {
        $responseToTheEnvironment += 'you are using ' . 'an iPhone. ';
    } elseif (wp_is_mobile()) {
        $responseToTheEnvironment += 'you are using ' . 'a mobile device. ';
    }

//Server Environment
    global $is_apache, $is_IIS;
    if (current_user_can('edit_posts', $user_ID) && $is_apache) { //include the user's id if not within the loop
        $responseToTheEnvironment += 'you are using ' . 'a mobile device. ';
    }

    return print_r($responseToTheEnvironment);


#View all WordPress created constants
//put it into a function because ...

    function ad_all_constants() {
        return print_r(@get_defined_constants());
    }

#Print all Post array values
//use this within the loop in order to do anything

    function ad_print_post() {
        global $post;
        return print_r($post);
    }

#Print all author data
//

    function ad_print_author($billyShakes) {
        return print_r(get_the_author_meta($field, $user_id)); //if used in the loop, id is not needed
    }

#if you need to reset the query or post data because things aren't acting properly on your page
    wp_reset_postdata(); //used when you create a new WP_Query instance
    wp_reset_query();
    rewind_posts(); //will reset the loop, place after the loop ends and then create another loop
 

#----------------------------#
#--------- Security ---------#
#----------------------------#
#Move WP Config
//move wp-config.php out of the (wordpress?) root directory and into the parent directory. This adds an extra layer of security by preventing the config file from being accessed in the browser.
#Change the DB prefix (if suspected sql injection)
#Force SSL to login to the site
//this will force traffic to be encrypted when accessing the login. 

    define('FORCE_SSL_LOGIN', true); //forces ssl for login
    define('FORCE_SSL_ADMIN', true); //forces ssl for all admin pages
# Nonces - Number used Once
// used to stop unautorized access by generating a secret key
// Form Nonce
    ?>
<form method="post">
        <?php wp_nonce_field('ad_settings_save_form', 'ad_nonce_field'); ?>
    Enter your name: <input type="text" name="text">
    
</form>
<?php
    //>>> Research more on Nonces

# Data Validation and Sanitization
//Important to make sure that the info you are allowing to be input to the site is safe from unsafe data or illegal characters
//The escaping fucntions are creating witht he following naming convention
//esc --prefix for escaping characters
//attr, html, textarea, js, sql, url, url_raw --types of content to be escaped
//__(), _e() -- optional translation suffix
    $frogDog = 'Hi, I am the Frog"Dog /n. & <br> is it cold outside.'
        esc_html_e($frogDog);

// wp_kses($array)
$allowed_tags = array(
                'strong' => array(),
                'a' => array(
                    'href'=> array(),
                    'title' => array()
                )
);
$testing12345 = '<a href=#" class="hax">Click Me</a><br />This is <b>bold</b> and this is <strong> Strong </strong>.';
echo wp_kses($testing12345, $allowed_tags);

#db-error.php
//Consider editing the db-error.php file(located outside your theme) to ensure that no one can use the default error message maliciously against your site

#---------------------------------------#
#------------ Accessability ------------#
#---------------------------------------#
    //Built in WordPRess features that aid in the accessability of your site to those with access your site or plugin from another language or through use of screen reader or other technology
#Translations
// __() and _e() for translations
    $helloFriend = __('Hello Friend!', 'ad1-plugin'); //first parameter is the string to be translated, the second is the text domain
    //>>> Research more on the importance of the text domain
    _e('Hello Friend!', 'ad1-plugin'); // same as before except this function will echo the translated text
    //
    //
#---------------------------------------#
#--------- WordPress APIs --------------#
#---------------------------------------#
//allows you to interact with wordpress without messing with the 'core'
#Plugin API
//used for custom plugin development
//utilizes filters and actions to add functionality
#Widgets API
//widgets will appear under appearance>widgets
//can be used on any defined sidebar
#Shortcode API
//macro code added to a post that executes code to display elements in place of it on the page
//can accept parameters to alter output
#HTTP API
//>> research to learn more
#Settings API
//used for creating page settings
//sanitizes all of the data saved by the user
#Options API
//used for storing option data in the wordpress db
#Dashboard Widgets API
//used to create custom admin dashboard widgets
//all widjgets inherit the jquery features of existing core  admin widgets
#Rewrite API 
//used for creating custom rewrite rules
#---------------------------------------#
#---------------- SQL ------------------#
#---------------------------------------#
#Basic format of an SQL query
// SELECT $fields FROM $table WHERE $conditions
//>>research wp-includes/query.php and wp-includes/taxonomy.php for more information on sql queries and custom JOIN requests
#---------------------------------------#
#------- WordPress Template Tags -------#
#---------------------------------------#
//Template tags are functions that return post data 
//Usually only availiable within the loop
//>> http://codex.wordpress.corg/Template_Tags
#Common Template Tags
    the_permalink(); //displays the url of the post
    the_title(); //displays the post title
    the_ID(); //displays the unique ID of the post
    the_content(); //displays full content of the post
    the_excerpt(); //auto generated snippet from the post content
    the_time(); //displays date/time post was published
    the_tags(); //displays tags attached to post
    the_category(); //displays the categories assigned to the post
    edit_post_link(); //displays an edit link that is shown only if you are logged in ans allowed to edit the psot
    comment_form(); //displays complete commenting form for your post
    paginate_links(); //
#---------------------------------------#
#--------- WordPress Functions ---------#
#---------------------------------------#
#functions.php
//Used by plugins, themes, and wordpress core
    current_time(); //retrieves the current time based on a specific type

    force_ssl_login();     //requires ssl login to wordpress
    wp_nonce_field();      //adds a nonce field  for verification purposes when submitting and processing daata in Wordpress. 
    absint();              //converts an integer into a nonnegative integer
    wp_die();              //kills the WordPress execution and displays an html error message
#option.php
//contains the Wordpress Options API functions
//options
    add_option();
    update_option();
    get_option();

//transients are options with a time limit
    set_transient();
    get_transient();
    delete_transient();

//site options
    add_site_option();
    update_site_option();
    get_site_option();

#formatting.php
    esc_attr();            //escapes a string for html attributes
    esc_html();            //used to escape a string for html
    esc_url();             //checks and cleans a url
    sanitize_text_field(); //sanitizes a string from user input or the database
    is_email();
    verifies that an email is valid;
    capital_P_dangit();    // forces p in wordpress to be capitalized
#pluggable.php
//lets you override core functions of wordpress
//WordPress loads these as if they have been undefined after all plugins have been loaded. 

    wp_email(); //sends e-mail from WordPress
    get_userdata(); //returns all user data from the specified user ID
    wp_get_current_user(); //returns user data for the currently logged in user
    wp_set_password(); //updates a user's password with a new encrypted one
    wp_rand(); //Generates a random number
    wp_logout(); //logs a user out, destroys the current session
    wp_redirect(); //redirects to another page
    get_avatar(); // returns user's avatar
#plugin.php
//wordpress plugin API functions

    add_filter(); //hooks that the wordpress core launches to filter content before displaying or adding to db
    add_action(); //hooks that the wordpress core launches at specific points of execution
    register_activation_hook(); //hook called when a plugin is activated
    register_deactivation_hook(); //hook called when plugin is deactivated
    plugin_dir_url(); // returns the filesystem directory path for the plugin
    plugin_dir_path(); //returns the url for the plugin
    doing_filter(); //returns the name of the current filter 
    doing_action(); //^ or action being processed
#user.php
//WordPress user api functions

    get_users(); //returns a list of users mathcing criteria provided
    add_user_meta(); //
    get_user_meta();
    delete_user_meta(); //
    username_exists(); //Checks if a username exists
    email_exists(); //Checks if a email exists
    wp_insert_user();
    wp_update_user();

#post.php
//functions used in the post process of wordpress

    wp_insert_post();
    get_post(); //recieves a single post
    add_post_meta(); //creates metadata (custom field data) on a post
    get_post_meta(); //retrieves custom field data
    get_post_custom(); //returns a multidimesional array of custom field entries
    set_post_thumbnail(); //seta  featured image on a post
    register_post_type(); //registers a custom post type in wordpress
#taxonomy.php

    register_taxonomy(); //
    get_taxonomies(); //
    wp_inset_term();
    wp_update_term(); //
#??Don't use get_posts() function, apparently is breaks all kind of stuff
#??get_posts(); //retrieves a list of the latest posts' matching args
#---------------------------------------#
#--------------- The Loop --------------#
#---------------------------------------#
//alter the main loop with the 'pre_get_posts' hook
//use new WP_Query to create a custom query
//clear out the main query if you intend to custom pagination
#Simple Custom Loop with Pagination
//>>haven't actually tested it yet...

    $originalQuery = $wp_query; //save the main query
    $wp_query = null; //generally don't do this but i think it's the only way for pagination to work if not the main query
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1; //get the paged parameter, else set it to 1 if it isn't there
//fiddle with the arguments for the query
    $args = array(
    'posts_per_page' => 5,
    'paged' = $paged;
    );
    $wp_query = new WP_Query($args);
    while ($wp_query->have_posts()) :
        $wp_query->the_post();
        //set custom field variables and do other post specific php stuff 
        the_title();
        the_excerpt();
    //custom html will probably go here
    endwhile;
    paginate_links(); //put in custom arguments for this function to display your links in a cool way
    $wp_query = null; //clear out the query data you've been setting
    $wp_query = $originalQuery; //put the original query data back in it's place
    #pre_get_posts hook for modifying the main query 
    //set the arguments for the main query of a certain page before the file is even loaded

    function writtenByMe($query) {

        if ($query->is_main_query() && !is_admin()) {
            $query->set('author', 'andy'); // use the set method to set query parameters 
            //other stuff
        }
    }

    add_action('pre_get_posts', 'writtenByMe');


    #if you need to reset the query or post data
    wp_reset_postdata(); //used when you create a new WP_Query instance
    wp_reset_query();

#---------------------------------------#
#----------- WordPress Admin -----------#
#---------------------------------------#
    #Display a welcome message to any user that is logged in
    global $current_user;
    if ($current_user->display_name) {
        echo "Hey " . $current_user->display_name . ' !!!';
    }

    # Add a Custom Post Type
    //use the 'init' action hook to load this as soon as possible in wp?

    add_action('init', 'ad_register_custom_post_type');

    function ad_register_custom_post_type() {
        register_post_type('ad', array(
            'labels' => array('name' => 'AD Posts'),
            'public' => true,
                )
        );
    }

    #Add a Custom Taxonomy
    //
 
 add_action('init', 'ad_define_custom_tax');

    function ad_define_custom_tax() {
        register_taxonomy('type', 'products', array(
            'heirarchical' => true,
            'label' => 'Type',
            'query_var' => true,
            'rewrite' => true,
                )
        );
    }

    //There are a lot more options for creating psot types and taxonomies but I've just been using this plugin to do it for me: https://wordpress.org/plugins/custom-post-type-ui/

#---------------------------------------#
#----------------- Hooks ---------------#
#---------------------------------------#
//a hook is basically just a php function call with various parameters that can be sent
add_action($tag, $function_to_add, $priority, $accepted_args);

//action hooks are triggered by events in WOrdPRess
//filter hooks are used to modify wordpress content before saving it to the database or displaying on the screen
add_filter($tag, $function_to_add, $priority, $accepted_args);

//There are over 2,00 hooks in wordpress?! 
//Here are some of the common filter hooks
//the_content --applied to the content of the page before displaying
//the_content_rss 
//the_title
//comment_text
//wp_title
//the_permalink

//Here are some common action hooks
//publish_post -- triggered when a new post is published
//create_category --triggered when a new category is created
//switch_theme -- triggered when you switch themes
//admin_head --triggered in the <head> section of the admin dashboard
//wp_footer --triggered in the footer section of your theme, usually directly before the closing body tag </body>
//init --triggered after wordpress has finished loading but before any headers have been sent. This ia agood place to intercept $_POST and $_GET requests
//admin_init -- same as init but only runs on admin dashboard pages
//user_register -- triggered when a new user is created
//_comment_post -- triggeered when a new comment is created



#---------------------------------------#
#----------- Useful Plugins ------------#
#---------------------------------------#
//List of useful plugins

# Advanced Custom Fields
//https://www.advancedcustomfields.com/

# Custom Post Type UI
//https://wordpress.org/plugins/custom-post-type-ui/
    