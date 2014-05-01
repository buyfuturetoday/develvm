## Installation

I'm using Ubuntu 12.04. 

NOTE: Make sure you don't miss the `sudo` command. The command will run as user ubuntu otherwise and use input files from the .cfagent folder in the home directory

<pre>
sudo apt-get install cfengine3

sudo ls /etc/cfengine3/
ls /var/lib/cfengine3/

sudo nano /var/lib/cfengine3/inputs/hello.cf
body common control  
{
bundlesequence => { "test" };
}

bundle agent test
{
reports:
  cfengine_3::
      "Hello world!";
}

# Fix permission
sudo chmod og-rwx /var/lib/cfengine3/inputs/hello.cf 

# Should not show anything
sudo cf-promises -f /var/lib/cfengine3/inputs/hello.cf

# Should print Hello world
sudo cf-agent -f /var/lib/cfengine3/inputs/hello.cf 
</pre>



## Start daemons

I'm going to setup a minimalistic configuration with:

 1. cf-execd - scheduler, means that cron does not need to be scheduled. Keeps the promises made in common and monitor bundles, and is affected by common and monitor control bodies. cf-agent is executed which keeps the promises made in common and agent bundles, and is affected by common and agent control bodies.
 1. cf-monitord - keeps the promises made in common bundles, and is affected by common and executor control bodies

I'm not running cf-serverd since I'm using git to distribute configuration files.

Example files are shipped with the installation:

```

more /usr/share/doc/cfengine3/README.Debian 

ls /usr/share/doc/cfengine3/examples/

sudo cp /usr/share/doc/cfengine3/examples/* /etc/cfengine3/

sudo nano /etc/cfengine3/site.cf

sudo vi /etc/default/cfengine3
...
RUN_CFMONITORD=1
RUN_CFSERVERD=0
RUN_CFEXECD=1

sudo /etc/init.d/cfengine3 start

ps -ef | grep cf

sudo cf-agent --verbose 
```

### Troubleshooting

```
sudo cf-agent --verbose 
...
cf3> SERIOUS SECURITY ALERT: path race exploited in recursion to/from /var/lib/cfengine3/inputs. Not safe for agent to continue - aborting
```

Found this: https://bugs.launchpad.net/ubuntu/+source/cfengine3/+bug/646777

```
ls -al /var/lib/cfengine3/inputs

# Update the config file and replace /var/lib/cfengine3/inputs with /etc/cfengine3
sudo nano /etc/cfengine3/update.cf

sudo cf-agent --verbose
...
cf3> Outcome of version (not specified) (agent-0): Promises observed to be kept 56%, Promises repaired 44%, Promises not repaired 0%
```

Now it seams to work better. I have no clue with the exmample files we copied actually do though...

