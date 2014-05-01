Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Docuwiki-installation.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[Wiki]]


h1. DocuWiki installation

* http://www.dokuwiki.org/Install
* http://www.dokuwiki.org/install:ubuntu
* http://www.dokuwiki.org/auth:ldap
* http://www.dokuwiki.org/auth:ldap_openldap?s[]=ldap

<pre>
wget http://www.splitbrain.org/_media/projects/dokuwiki/dokuwiki-2012-01-25.tgz
tar xvf dokuwiki-2012-01-25.tgz
mv dokuwiki-2012-01-25 dokuwiki
mv dokuwiki /var/www/gom-docuwiki
chown -R www-data:www-data /var/www/gom-docuwiki

sudo service apache2 restart

</pre>


Open http://docuwiki.sbx.gizurcloud.com/install.php

h2. LDAP configuration



<pre>
nano /var/www/gom-dokuwiki/conf/local.php

/**
 * 2012-04-10 Jonas Colsmjö
 * 
 * Authenticate users using LDAP
 */

$conf['superuser'] = 'jonas';

$conf['openregister']= 0;
$conf['authtype']    = 'ldap';

$conf['auth']['ldap']['server']      = 'int-app-svn.lam.gizurcloud.com';
$conf['auth']['ldap']['usertree']    = 'uid=%{user}, ou=people, dc=gizur, dc=com';
$conf['auth']['ldap']['grouptree']   = 'ou=groups, dc=gizur, dc=com';
// $conf['auth']['ldap']['groupfilter'] = '(&(objectClass=posixGroup)(|(memberUid=%{uid})(gidNumber=%{gid})))';
$conf['auth']['ldap']['version']     = 3;
$conf['auth']['ldap']['debug']      = 1;
</pre>
