
---
layout: post
title: Mainframe
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[Main_Page]]


== Hercules ==

* http://linuxvm.org/penguinvm/hercules/l390.cnf
* http://www.hercules-390.org/hercconf.html
* http://www.hercules-390.org/hercinst.html#commands

<pre>
apt-get install hercules
hercules -f hercules.cnf
</pre>

Sample configuration file:
<pre>
#
# Sample configuration file for Hercules ESA/390 emulator
#

CPUSERIAL 000069        # CPU serial number
CPUMODEL  9672          # CPU model number
MAINSIZE  64            # Main storage size in megabytes
XPNDSIZE  0             # Expanded storage size in megabytes
CNSLPORT  3270          # TCP port number to which consoles connect
NUMCPU    1             # Number of CPUs
LOADPARM  0120....      # IPL parameter
OSTAILOR  LINUX         # OS tailoring
PANRATE   FAST          # Panel refresh rate

# .-----------------------Device number
# |     .-----------------Device type
# |     |       .---------File name and parameters
# |     |       |
# V     V       V
#---    ----    --------------------
0009	3215
000C    3505    /usr/local/lib/hercules/l390/card.rdr ebcdic
000D    3525    /usr/local/lib/hercules/l390/punch00d.txt ascii
000E    1403    /usr/local/lib/hercules/l390/print00e.txt crlf
001F    3270
0120	3390	/usr/local/lib/hercules/l390/linux.120
0121	3390	/usr/local/lib/hercules/l390/linux.121
0400	3088	0401 192.168.0.2 /usr/local/bin/vmnet
0401	3088	0400 192.168.0.2 /usr/local/bin/vmnet
0581	3420	./tapes/lintap.tdf

</pre>


== MVS ==


* http://www.jaymoseley.com/hercules/installmvs/instmvs1.htm
* http://hansen-family.com/mvs/MVS%20Commands.htm

<pre>
mkdir dwnl && cd dwnl

wget http://www.jaymoseley.com/hercules/download/zips/mvsstarter.tgz
wget http://www.jaymoseley.com/hercules/download/zips/mvsdist.tgz
wget http://www.jaymoseley.com/hercules/download/zips/installmvs.tgz

cd ..

mkdir mvs && mkdir mvs/alc && mkdir mvs/cobol && mkdir mvs/dasd && mkdir mvs/fortran && mkdir mvs/jcl && mkdir mvs/pli && mkdir mvs/rpg && mkdir mvs/tape
tar -xvf dwnl/installmvs.tgz -C mvs

cd mvs
sudo ./mvsdasd 

sudo hercules -f ibcdasdi.cnf

# in another terminal windows
telnet localhost 3270

# hercules
ipl 0280

#telnet
<enter>
input=1442,00c

                    DASDI  7.80
SMP001 JOB 'INITIALIZE SMP001 3350 VOLUME'
       MSG TODEV=1052,TOADDR=009
       DADEF TODEV=3350,TOADDR=148,IPL=NO,VOLID=SMP001,BYPASS=YES
       VLD NEWVOLID=SMP001,OWNERID=HERCULES
       VTOCD STRTADR=1,EXTENT=15
       END
IBC163A  END OF JOB.
                    DASDI  7.80
WORK02 JOB 'INITIALIZE WORK02 3350 VOLUME'
       MSG TODEV=1052,TOADDR=009
       DADEF TODEV=3350,TOADDR=149,IPL=NO,VOLID=WORK02,BYPASS=YES
       VLD NEWVOLID=WORK02,OWNERID=HERCULES
       VTOCD STRTADR=1,EXTENT=15
       END
IBC163A  END OF JOB.
                    DASDI  7.80
MVSRES JOB 'INITIALIZE MVSRES 3350 VOLUME'
       MSG TODEV=1052,TOADDR=009
       DADEF TODEV=3350,TOADDR=14A,IPL=NO,VOLID=MVSRES,BYPASS=YES
       VLD NEWVOLID=MVSRES,OWNERID=HERCULES
       VTOCD STRTADR=1,EXTENT=15
       END
IBC163A  END OF JOB.
                    DASDI  7.80
PAGE00 JOB 'INITIALIZE PAGE00 3350 VOLUME'
       MSG TODEV=1052,TOADDR=009
       DADEF TODEV=3350,TOADDR=14B,IPL=NO,VOLID=PAGE00,BYPASS=YES
       VLD NEWVOLID=PAGE00,OWNERID=HERCULES
       VTOCD STRTADR=1,EXTENT=15
       END
IBC163A  END OF JOB.
                    DASDI  7.80
SPOOL1 JOB 'INITIALIZE SPOOL1 3350 VOLUME'
       MSG TODEV=1052,TOADDR=009
       DADEF TODEV=3350,TOADDR=14C,IPL=NO,VOLID=SPOOL1,BYPASS=YES
       VLD NEWVOLID=SPOOL1,OWNERID=HERCULES
       VTOCD STRTADR=1,EXTENT=15
       END
IBC163A  END OF JOB.

#hercules
quit


#
# Unpack MVS and some libs
#

cd ..
tar -xvf dwnl/mvsstarter.tgz -C mvs/
tar -xvf dwnl/mvsdist.tgz -C mvs

#
# Some more installation steps
#

sudo hercules -f smp.cnf

# start telnet in another terminal
telnet localhost 3270

# hercules
ipl 0150

# telnet
r 0,clpa
 IEF165I // START JES2
 IEE351I SMF SYS1.MAN RECORDING NOT BEING USED
*00 $HASP426 SPECIFY OPTIONS - HASP-II, VERSION JES2 4.0

r 0,format,noreq
 IEE600I REPLY TO 00 IS;SUPPRESSED
*01 $HASP436 REPLY Y OR N TO CONFIRM CHECKPOINT RECORD CHANGE

r 1,y
 IEE600I REPLY TO 01 IS;SUPPRESSED
 $HASP423 SPOOL0 IS BEING FORMATTED
 IEE041I THE SYSTEM LOG IS NOW ACTIVE
 $HASP160 PRINTER1 INACTIVE - CLASS=AJ
 $HASP160 PUNCH1   INACTIVE - CLASS=BK
 $HASP100 INIT     ON STCINRDR
 $HASP373 INIT     STARTED
 $HASP100 INIT     ON STCINRDR
 $HASP373 INIT     STARTED
 $HASP100 INIT     ON STCINRDR
 $HASP373 INIT     STARTED
 $HASP309    INIT  1 INACTIVE ******** C=A
 $HASP309    INIT  2 INACTIVE ******** C=BA
 $HASP309    INIT  3 INACTIVE ******** C=CBA
 $HASP099 ALL AVAILABLE FUNCTIONS COMPLETE

m 148,vol=(sl,smp001),use=private
 $HASP100 MOUNT    ON STCINRDR
 $HASP099 ALL AVAILABLE FUNCTIONS COMPLETE
 $HASP373 MOUNT    STARTED
 $HASP395 MOUNT    ENDED
 $HASP150 MOUNT    ON PRINTER1
 $HASP160 PRINTER1 INACTIVE - CLASS=AJ
 $HASP250 MOUNT    IS PURGED
 $HASP099 ALL AVAILABLE FUNCTIONS COMPLETE

# in a new terminal window
perl condcode prt00e.txt mount


# hercules
devinit 012 jcl/smp4p44.jcl eof

# Telnet
$HASP100 SMP4P44  ON READER1     SMP 4.44 from MVS38J
 $HASP104 SMP4P44  ************************************************************
 $HASP104 SMP4P44  * An IPL is required after this job has completed!!!       *
 $HASP104 SMP4P44  ************************************************************
 $HASP373 SMP4P44  STARTED - INIT  1 - CLASS A - SYS H158
 IEF244I SMP4P44 S1 - UNABLE TO ALLOCATE 1 UNIT(S)
         AT LEAST 1 OFFLINE UNIT(S) NEEDED.
 IEF489I SMP4P44 - 1 UNIT(S) NEEDED FOR I1
 IEF247I SMP4P44 - 182,183,184,170,171 OFFLINE
 IEF247I SMP4P44 - 282,283,284,382,383,384,482,483,484,582 NOT ACCESSIBLE
 IEF247I SMP4P44 - 583,584,682,683,684,270,271,370,371,470 NOT ACCESSIBLE
 IEF247I SMP4P44 - 471,570,571,670,671 NOT ACCESSIBLE
*02 IEF238D SMP4P44 - REPLY DEVICE NAME OR 'CANCEL'.


# hercules
devinit 170 tape/zdlib1.het

# telnet
r 2,170
 IEE600I REPLY TO 02 IS;170
 IEC502E K 170,MVS38J,SL,SMP4P44,S2
*IEC501A M 170,T74172,SL,6250 BPI,
 IEC501A SMP4P44,S2

# hercules
devinit 170 tape/smp4.het


# In another terminal
perl condcode prt00e.txt smp4p44
Searching prt00e.txt for MVS Job Name smp4p44

Step Name     Proc Step Name  Completion Code
---------     --------------  ---------------
S1                            0000
S2                            0000
S3            LK              0000


# telnet
$p jes2
 $HASP395 INIT     ENDED
 $HASP395 INIT     ENDED
 $HASP395 INIT     ENDED
 IEE043I A SYSTEM LOG DATA SET HAS BEEN QUEUED TO SYSOUT CLASS A
 IEE037I LOG NOT ACTIVE
2000 18.33.54 CONSOLE   IEE142I  01F NOW RECEIVING HARDCOPY
4000 18.33.54           IEE043I A SYSTEM LOG DATA SET HAS BEEN QUEUED TO SYSOUT CLASS A
4000 18.33.54           IEE037I LOG NOT ACTIVE
0000 18.33.54           IEF196I IEF142I JES2 JES2 - STEP WAS EXECUTED - COND CODE 0000
0000 18.33.54           IEF196I IEF285I   SYS1.PROCLIB                                 KEPT
0000 18.33.54           IEF196I IEF285I   VOL SER NOS= START1.
0000 18.33.54           IEF196I IEF285I   SYS1.HASPCKPT                                KEPT
0000 18.33.54           IEF196I IEF285I   VOL SER NOS= SPOOL0.
0000 18.33.54           IEF196I IEF285I   SYS1.HASPACE                                 KEPT
0000 18.33.54           IEF196I IEF285I   VOL SER NOS= SPOOL0.


# telnet
z eod
4000 18.35.11           IEE334I HALT     EOD SUCCESSFUL

#telnet
quiesce

# hercules
quit
</pre>



=== Using SMP4 to Build the Distribution Libraries ===

<pre>
sudo hercules -f smp.cnf

# new terminal windows
telnet localhost 3270

# hercules
ipl 0150

# telnet
<enter>

r 0,noreq

m 148,vol=(sl,smp001),use=private

# separate window
perl condcode prt00e.txt mount

# hercules
devinit 012 jcl/smpjob00.jcl eof

# separate window
perl condcode prt00e.txt smpjob00
Searching prt00e.txt for MVS Job Name smpjob00

Step Name     Proc Step Name  Completion Code
---------     --------------  ---------------
IEHPROGM                      0008 <-- 


# hercules
devinit 012 jcl/smpjob01.jcl eof


# separate window
perl condcode prt00e.txt smpjob01
Searching prt00e.txt for MVS Job Name smpjob01

Step Name     Proc Step Name  Completion Code
---------     --------------  ---------------
DLBALLOC      DLBALLOC        0000


# hercules
devinit 012 jcl/smpjob02.jcl eof


# separate window
perl condcode prt00e.txt smpjob02
Searching prt00e.txt for MVS Job Name smpjob02

Step Name     Proc Step Name  Completion Code
---------     --------------  ---------------
DLBUCL        SMP             0008 <--


# hercules
devinit 012 jcl/smpjob03.jcl eof

devinit 170 tape/zdlib1.het

# telnet
r 1,170

# separate window, will take 10 minutes or so before the job above returns...
perl condcode prt00e.txt smpjob03
Searching prt00e.txt for MVS Job Name smpjob03

Step Name     Proc Step Name  Completion Code
---------     --------------  ---------------
DLBUCL        SMP             0000


grep -n  'RECEIVE  SUMMARY  REPORT' prt00e.txt 

vi prt00e.txt 
:<line num above>

# hercules
devinit 170 tape/mvs38jptfs.het

devinit 012 jcl/smpjob04.jcl eof

# separate windw
perl condcode prt00e.txt smpjob04

# hercules
devinit 012 jcl/smpjob05.jcl eof

# separate window
perl condcode prt00e.txt smpjob05

# hercules
devinit 012 jcl/smpjob06.jcl eof

devinit 012 jcl/ickdsfg.jcl eof


# telnet
$p jes2

z eod

quiesce

# hercules
quit
</pre>



=== Performing a System Generation ===


<pre>
sudo hercules -f sysgen.cnf
ipl 0150

# separate window
telnet localhost 3270

# telnet
<enter>

r 0,noreq

m 14a,vol=(sl,mvsres),use=private
m 14b,vol=(sl,page00),use=private 

# hercules
devinit 012 jcl/writeipl.jcl eof

devinit 012 jcl/sysgen00.jcl eof

devinit 012 jcl/sysgen01.jcl eof

devinit 012 jcl/sysgen02.jcl eof

# separate window
cp pch013.txt jcl/stage2.jcl

# separate window
cd jcl
wget http://www.jaymoseley.com/hercules/download/misc/stage2.awk
gawk -f stage2.awk stage2.jcl > stage2a.jcl


# hercules
devinit 012 jcl/stage2a.jcl eof

# telnet
$a'sysgen1'


</pre>

Ended at http://www.jaymoseley.com/hercules/installmvs/instmvs4.htm
* Got an error 

<pre>
 $HASP100 SYSGEN1  ON READER1     SYSTEM GENERATION
 $HASP100 SYSGEN2  ON READER1     SYSTEM GENERATION
 $HASP100 SYSGEN5  ON READER1     SYSTEM GENERATION
 $HASP100 SYSGEN6  ON READER1     SYSTEM GENERATION
 IEF452I SYSGEN1  JOB NOT RUN - JCL ERROR
 $HASP101 SYSGEN1  HELD
 $HASP150 SYSGEN1  ON PRINTER1
 $HASP160 PRINTER1 INACTIVE - CLASS=AJ
 $HASP250 SYSGEN1  IS PURGED
 IEF452I SYSGEN2  JOB NOT RUN - JCL ERROR
 $HASP101 SYSGEN2  HELD
 $HASP150 SYSGEN2  ON PRINTER1
 $HASP160 PRINTER1 INACTIVE - CLASS=AJ
 $HASP250 SYSGEN2  IS PURGED
 $HASP101 SYSGEN5  HELD
 $HASP101 SYSGEN6  HELD
 $HASP099 ALL AVAILABLE FUNCTIONS COMPLETE
</pre>





Ubuntu:
<pre>
ls /usr/share/hercules
</pre>

== TurnKey MVS ==

* http://www.bsp-gmbh.com/turnkey/cookbook/opmvs.html#MVSIPL



== Tapes ==

* http://www.cbttape.org/



== Linux/390 ==

* http://linuxvm.org/
