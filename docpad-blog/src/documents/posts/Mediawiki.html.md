
---
layout: post
title: Mediawiki
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]] > [[Gizur IT services]]


# Setup 

# Authentication and Access control 

* http://www.mediawiki.org/wiki/Extension:Group_Based_Access_Control

* http://www.mediawiki.org/wiki/Extension:LDAP_Authentication


# Themes 

* Cavendish theme
** http://mediawiki2u.com/2008/04/mediawiki-theme-cavendish/#more-62
** Never version - http://sourceforge.net/apps/trac/wecowi/wiki/Cavendish_Skin

* http://www.mediawiki.org/wiki/Manual:Skin_configuration



# Routines 

#= Add user =

A login is needed for all pages but this page (Main_Page). Login can be disabled for more pages by editing the LocalSettings.php configuration file. 

* Go to [[Special:Userlogin]], when logged in as a WikiSysop.
* Click on "Create an account" link to get to the account creation form.
* Enter a username and an email address, and click the "by email" button. Note you need $wgEnableEmail=true or else the sysop must pick a password and send it to the user.
* The account will be created with a random password which is then emailed to the given address (as with the "forgot password" feature). The user will be requested to change password at first login; when he does this, his e-mail address will also be marked as confirmed.
When you click the "create account" button instead, you have to manually send the user his password. If you've set $wgMinimalPasswordLength=0 (default configuration up to version 1.15) and you've left the password field blank, the user will be emailed an e-mail address confirmation request but will be unable to access Special:Confirmemail to perform the confirmation. Instead, he'll get an error (unless you've added it to $wgWhitelistRead); he'll be able to login with a blank password and then confirm email, but his password will not have been reset (he'll have to reset it manually).
It may be appropriate to edit the text displayed when a non-user attempts to log in. This can be done at [[MediaWiki:Nosuchuser]], when logged in as a sysop. Use plain text without any special formatting, as the formatting is ignored and the text is literally rendered.
