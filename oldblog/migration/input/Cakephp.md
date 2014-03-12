[[Main_Page]]



== Development ==

* http://book.cakephp.org/2.0/en/getting-started/cakephp-conventions.html

<pre>


</pre>


== Install ==

* http://book.cakephp.org/2.0/en/getting-started.html

<pre>
git clone git://github.com/cakephp/cakephp.git ~/projects
mv projects/ /var/www/cakephp
chown -R www-data:www-data /var/www/cakephp

php -i |grep php.ini

nano /etc/php5/apache2/php.ini 
include_path = "/var/www/cakephp/lib"

cd /var/www/cakephp/app/Config
cp database.php.default database.php
nano database.php
chown www-data:www-data database.php

nano /var/www/cakephp/app/Config/core.php
        Configure::write('Security.salt', 'treguP5ehEma2rapHuresWEcREr29A');

        Configure::write('Security.cipherSeed', '217366912509846845557076806195');
</pre>


<pre>
/* First, create our posts table: */
CREATE TABLE posts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    body TEXT,
    created DATETIME DEFAULT NULL,
    modified DATETIME DEFAULT NULL
);

/* Then insert some posts for testing: */
INSERT INTO posts (title,body,created)
    VALUES ('The title', 'This is the post body.', NOW());
INSERT INTO posts (title,body,created)
    VALUES ('A title once again', 'And the post body follows.', NOW());
INSERT INTO posts (title,body,created)
    VALUES ('Title strikes back', 'This is really exciting! Not.', NOW());
</pre>
