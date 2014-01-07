AWS SDK Playground
=================


Just playing around with AWS SDK for PHP. The installation in performed using [composer](http://getcomposer.org/download/).

 * Install locally: `composer install` (assuming composer has been installed globally, run php composer.phar install otherwise)
  * In case of changes to composer.json do: `composer update`
 * Run example: `./vendor/bin/pake run`
 * Run unit tests: `./vendor/bin/phpunit tests`
 * Run code sniffer: `./vendor/bin/phpcs --standard=Zend src/**/*.php tests/*.php`
 * Generate documentation `php ./vendor/bin/sami.php update --force sami-config.php`

