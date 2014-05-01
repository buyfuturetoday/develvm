[[Main_Page]]


* http://www.chromefans.org/chrome-os/google-chrome-os-download-iso.htm
* http://www.docstechnotes.com/2009/05/create-bootable-usb-drive-using-os-x.html


USB Drive

Skapa partition i Skivverktyg

<pre>
diskutil list
sudo umount /dev/disk2s1 
sudo dd if=Chrome_OS_Linux.i686-1.9.1077.raw of=/dev/disk2s1 
</pre>
