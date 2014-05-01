Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Mac-os-x.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[Main_Page]]


== ODBC / MySQL connection ==

Need ODBC to JDBC link?
* http://uda.openlinksw.com/odbc-jdbc-st/

* http://support.apple.com/kb/DL895




== Encryption ==

GPGTools


== Users ==

* Add user from command line - http://osxdaily.com/2007/10/29/how-to-add-a-user-from-the-os-x-command-line-works-with-leopard/
* http://docstore.mik.ua/orelly/unix3/mac/ch03_08.htm
* http://www.99.se/unix/48128-adduser-i-osx.html


== Macports ==

Make sure that Xcode is installed:
* https://connect.apple.com/cgi-bin/WebObjects/MemberSite.woa/wa/getSoftware?bundleID=20792

Install using the .dmg file:
* http://www.macports.org/install.php


=== TeX ===

<pre>
sudo /opt/local/bin/port install texlive
</pre>


== Time Machine ==

<pre>
defaults write com.apple.systempreferences TMShowUnsupportedNetworkVolumes 1
</pre>

Doesn't work. It seams as though TimeMAchine tries to use a smb drive with the name used + _1.


== Hackintosh ==

* http://www.hackintosh.com/
* http://lifehacker.com/5672051/how-to-build-a-hackintosh-mac-and-install-os-x-in-eight-easy-steps
* http://www.taranfx.com/install-snow-leopard-virtualbox
* http://www.taranfx.com/install-mac-os-in-virtualbox

*http://www.taranfx.com/install-mac-os-x-leopard-osx86-on-pc-dual-boot-windows-7-vista-in-9-easy-steps


== OS X Server ==

Install OSX Server within a Virtualbox machine:
* http://geeknizer.com/install-snow-leopard-virtualbox/

# Create a new disk within a existing OSX machine 
# Mount the retail OSX server media
# Mount the utils.iso file
# Start the old machine and format the new disk
# Open the retail installation media - just double click
# Run the unHide app on the utils disk - http://www.mediafire.com/?mmtm2z0huwk
# Browse to /System/Installation/Packages( inside Retail disc) and run OSInstall.mpkg
# Not sure if a special boot loader, such as Chamelaon, is needed when runing on Mac hardware - http://geeknizer.com/download-install-chameleon-bootloader/

# Did not get Chamelon to work, used Empire EFI instead, make sure that EFI is DISABLED in the setting and mount the cdrom as the primary slave
## also make sure that osx server.dmg is mounted as the secondary slave, the countries in the list box will now shoe otherwise
# Open the Empire CD and goto postinstallation and tun myHack. This should make it possible to boot without the CD mounted - http://prasys.info/tag/empire-efi/

* http://www.tech-recipes.com/rx/2628/install_os_x_from_dmg_file/

* Convert DMG to ISO - http://www.magiciso.com/FAQ/FAQ0011.htm

* http://hints.macworld.com/article.php?story=20040121135301830
