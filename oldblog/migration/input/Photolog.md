[[Main_Page]]


= Pixelpost =

* http://www.pixelpost.org/



== Installation ==

* http://www.pixelpost.org/docs/GettingStarted/Install

<pre>
mkdir photolog
cd photolog
wget http://www.pixelpost.org/releases/latest.zip
unzip pixelpost_v1.7.3.zip
cd ..
mv photolog /var/www/html/

cd /var/www/html/
chown -R apache.apache photolog
chmod ug+w images thumbnails


sX.gizur.com/phpMyAdmin
# create user and database

sX.gizur.com/photolog/admin/install.php


</pre>



=== Templates ===


<pre>
cd /var/www/html/photolog/templates
wget http://www.pixelpost.org/extend/templates/switchy/download/

</pre>


=== Addons===

* http://www.pixelpost.org/extend/addons/adobe-photoshop-lightroom-export-plugin/
* http://www.mediafire.com/?mz7c47b20sv0bkh

<pre>

# Change post key
vi pp_upload.php
cp pp_upload.php /var/www/html/photolog/admin/
cd ../addons
cp admin_pp_upload.php /var/www/html/photolog/addons/
chown -R apache.apache /var/www/html/photolog

	4. Copy the folder 'pixelpost.lrdevplugin' to the proper location:

		MAC: ~/Library/Application Support/Adobe/Lightroom/Modules/
		WINDOWS XP: C:\Documents and Settings\{your_username}\Application Data\Adobe\Lightroom\Modules\
		WINDOWS VISTA: C:\Users\{your_username}\AppData\Roaming\Adobe\Lightroom\Modules\
	
		If the 'Modules' folder doesn't exist, you will need to create it manually.

	5. Login to your Pixelpost Admin, and go to the 'Addons' Page.

	6. Turn the Addon 'External App Upload' ON.
	
	7. Copy the listed Upload URL & Post Key from the Addons page
	
	8. Open up Lightroom, go to File > Export
	
	9. Choose 'Export to Pixelpost' from the list on the left
	
	10. Copy/paste the Post Key & Upload URL from the Addons page into the appropriate box.

</pre>
