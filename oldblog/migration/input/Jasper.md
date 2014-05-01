[[Main_Page]]

* http://kent.dl.sourceforge.net/project/jasperserver/JasperServer/JasperServer%204.5.0/JasperReports-Server-CP-Install-Guide.pdf
* http://jasperforge.org/plugins/mwiki/index.php/Jasperserver/Documentation
* http://jasperforge.org/projects/jasperserver/downloads

<pre>
# For x86
wget http://downloads.sourceforge.net/project/jasperserver/JasperServer/JasperServer%204.5.0/jasperreports-server-cp-4.5.0-linux-x86-installer.run?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fjasperserver%2Ffiles%2FJasperServer%2FJasperServer%25204.5.0%2F&ts=1327350507&use_mirror=switch
# or for x64
wget http://downloads.sourceforge.net/project/jasperserver/JasperServer/JasperServer%204.5.0/jasperreports-server-cp-4.5.0-linux-x64-installer.run?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fjasperserver%2Ffiles%2FJasperServer%2FJasperServer%25204.5.0%2F&ts=1327350555&use_mirror=kent
</pre>


Apache is installed on port 8080.

The installer sets the PostgreSQL 
administrator password to postgres and also creates a PostgreSQL database user with administrator privileges and credentials 
of jasperdb/password.

Open http://IP:8080/jasperserver
jasperadmin/jasperadmin
