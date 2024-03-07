# PHP (Single Page Application) + MYSQL + Loggly

This is a demo project that shows a PHP single-page application which interacts with a MYSQL database and is set up to send log events to Loggly.

## Database

This application expects a MYSQL database to be running. You can set the credentials in the `constants.php` file (which should be copied from the `constants.php.example` template).

To seed the database, use the `create_schema.sql` and `create_records.sql` files in the `data` folder.

## Loggly

In your Loggly account, create a new customer token. Insert this in your `constants.php` file as well.

## Serving Up the Application

In the `nginx` subfolder, you'll find a NGINX configuration file that you can use to serve this project locally. Copy it to your `sites-available` folder for NGINX, and modify it to use the absolute path to your project root.

## Dependencies

Originally, this project was built and run on a machine running Ubuntu 20.04.6 LTS, using PHP 8.1, NGINX 1.18.0, and MYSQL 8. Make sure to install the following:

  * `php8.1-fpm`
  * `php8.1-mysql`
  * `php8.1-curl`

Also, the machine had Composer 2.7.1 installed. [Monolog 3.5.0 was installed via Composer](https://documentation.solarwinds.com/en/success_center/loggly/content/admin/php-monolog.htm?cshid=loggly_php-monolog).

