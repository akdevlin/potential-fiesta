// ad tools and tips for wp
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

#Create a Maintenance Page
//create a file name maintenance.php and style it according to your site standards
//>>>> Do more research before implementation
//This site will display when wordpress is upgrading and is not availiable to users
//to test the maintenance page add a .maintenance file (to the wordpress root?) and add the following code to it 

<?php $upgrading = time(); ?>


#-----------------------------#
#--------- Debugging ---------#
#-----------------------------#
 
# WordPress Query Debugging
//-- set this constants in php.config to enable the functions
//This will allow you to debug the current page by saving each query that wordpress runs. Probably not a great idea for a production environment

define('SAVEQUERIES', true);

//call this function on any template file to view the queries that wordpress is running
//>>>>doublecheck that this function is set up correctly in php and it doesn't need to explicitly return a value like in js'
function ad_query_debug(){
    if(current_user_can('manage_options')){ //only shows this debugging feature if the user has the baility to manage options
        global $wpdb;
        return print_r($wpdb->queries);
    }
}

#View all WordPress created constants
//put it into a function because ...
function ad_all_constants(){
    return print_r( @get_defined_constants() );
}

#Create a php-errors.log file to log errors when in production environment
//Create a file named php-errors.log and put it in the WordPress root directory
//>>> Do more research if you plan to implement this
//add this code to your wp.config file

@ini_set('log_errors', 'On');
@ini_set('display_errors', 'Off');
@ini_set('error_log', '/public_html/wordpress/php_error.log');//note that the root directory is not the WP root directory? 

//or add this code to your .htaccess file

php_flag display_startup_errors off
php_flag display_errors off
php_flag html_errors off
php_flag log errors on 
php_value error/log /public_html/php-errors.log

#

#----------------------------#
#--------- Security ---------#
#----------------------------#

#Move WP Config
//move wp-config.php out of the (wordpress?) root directory and into the parent directory. This adds an extra layer of security by preventing the config file from being accessed in the browser.


#Change the DB prefix (if suspected sql injection)


#Force SSL to login to the site
//this will force traffic to be encrypted when accessing the login. 

define('FORCE_SSL_LOGIN', true);//forces ssl for login
define('FORCE_SSL_ADMIN', true); //forces ssl for all admin pages

#Whitelist specific IP addresses to access your site's admin (or entire site)
//create a new .htaccess file in the wp-admin directory with this code in the new .htaccess file

AuthUserFile /dev/null
AuthGroupFile /dev/null
AuthName "Access Control"
AuthTYpe Basic
order deny,allow
deny from all 
#IP address to whitelist
allow from xxx.xxx.xxx.xxx
