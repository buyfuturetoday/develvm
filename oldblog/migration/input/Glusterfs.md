[[Main_Page]]


== New ==

* http://download.gluster.com/pub/gluster/glusterfs/3.2/Documentation/IG/html/sect-Installation_Guide-Installing-Debian.html

<pre>
cd dwnl
wget http://download.gluster.com/pub/gluster/glusterfs/LATEST/Ubuntu/11.10/glusterfs_3.2.5-1_amd64.deb
sudo apt-get install openssh-server wget nfs-common
sudo dpkg -i glusterfs_3.2.5-1_amd64.deb

service glusterd start
gluster peer status

# start at boot
update-rc.d glusterd defaults
</pre>

Ensure that TCP ports 111, 24007, 24008, 24009-(24009 + number of bricks across all volumes) are open on all Gluster servers. If you will be using NFS, open additional ports 38465 to 38467


Start a second server (here using Scalr MySQL Master/Slave setup)
<pre>
gluster peer probe int-mysql-slave.fs.gizurcloud.com
</pre>


Create a volume:
<pre>
gluster volume create vol1 replica 2 transport tcp int-mysql-master.fs.gizurcloud.com:/mnt/dbstorage/exp1 int-mysql-slave.fs.gizurcloud.com:/mnt/dbstorage/exp2

gluster volume start vol1
</pre>


== Old ==

* http://community.gluster.org/a/howto-mount-glusterfs-volumes-on-servers-at-boot-time-ubuntu/

Server:

<pre>
apt-get install glusterfs-server
service glusterfs-server status
gluster


</pre>




Client

<pre>



</pre>
