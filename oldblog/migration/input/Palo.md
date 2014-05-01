
[[File:Setup_guide.pdf]]


<pre>
root@ec2-46-137-54-126:~/dwnl/palo# sudo ./install.sh 

This script will install the Palo Suite on your system

During the installation you will be asked several questions about your system. If you don't know the answer to a question you can abort the installation at any time by pressing CTRL+C. Pressing CTRL+Z will stop the installation temporarily. You can restart the session by entering 'fg' on the command prompt. The installation program offers you some default values which are safe to accept on most systems, just press enter when you want to accept such an offer.

Please enter the path to where you want the Palo Suite to be installed
Default [/opt/jedox/ps]: 
The server will now be installed. This might take a while ... Ok.

The directory /opt/jedox/ps/storage exist. Shall I overwrite it? [Y|n]: 
The directory /opt/jedox/ps/Data exist. Shall I overwrite it? [Y|n]: 
There seems to run an http server on port 80.
Should I configure the server to use this port anyway ? [y/N]: N
On what port should the server run then ? [85]: 
Would you like to access Palo Web over SSL ? [Y/n] 
I will configure the Palo Web to use SSL. To obtain real security however you will have to create/obtain your own site certificate!
What is this servers IP-Address ? [10.224.119.102]: 46.137.54.126
dnsdomainname: Name or service not known
What is the servers name ? (If  no DNS-Server is running take the IP) [46.137.54.126]: 
Who should get administrative e-mails regarding this server ? [webmaster@46.137.54.126]: admin@gizur.com
Palo Suite is now configured! The Palo OLAP Server is accessible via Port 7777. Start Palo Suite by running the startserver.sh script in the installation directory (/opt/jedox/ps)


</pre>
