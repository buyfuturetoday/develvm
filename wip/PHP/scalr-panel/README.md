scalr-panel
===========

A highly configurable control panel for Scalr. Rename config-template.inc.php to config.inc.php
and update the Scalr credentials (found in 'mylogin@mydomain'->API Access).

Add as many $pages['name_of_page'] as you like. 

Then add the follwoing in your PHP code where you want the page rendered:
<blockquote><p>
$scalr_panel = new scalrPanel();
$scalr_panel->renderHTML('name_of_page');
</p></blockquote>

This is work in progress, feel free to send suggestions and comments to admin@gizur.com.
