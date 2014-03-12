# A first basic configuration

## Initial setup

Copy the files in https://github.com/colmsjo/wip/tree/master/cfengine to /etc/cfengine3 to get started (for Ubuntu 12.04).

## Hello world

Cfengine allows any user to execute promises for validation purposes. A bit of setup needs to be performed for each user though, see below.

Put his in /home/ubuntu/promises.cf
```
body common control {

    bundlesequence => {
        "recipe",
    };

    inputs => {
        "cfengine_stdlib.cf",
    };
}

bundle agent recipe {

# Recipe promise here
reports:
  cfengine_3::
      "Hello world!";
}
```

Make intial setup for the ubuntu user and execute:
```
# Need a keypair, only needs to be done once per user
cf-key

# Need to copy binaries
cp /var/lib/cfengine3/bin/cf-* ~/.cfagent/bin

# Fix permissions
chmod go-rwx promisis.cf 

# Make include file readble for everyone
sudo -s 'chmod a+r /etc/cfengine3/cfengine_stdlib.cf'

# Copy include file and make it mine
sh -c 'cp /etc/cfengine3/cfengine_stdlib.cf .'
sudo sh -c 'chown ubuntu cfengine_stdlib.cf'

# Validate file
cf-promises -f ~/promisis.cf 

# Hello world!
cf-agent -Kv -f ~/promisis.cf
```

The output looks like this:

```
...
cf3>     .........................................................
cf3>     Promise handle: 
cf3>     Promise made by: Hello world!
cf3>     .........................................................
cf3> 
cf3> Report: Hello world!
cf3> R: Hello world!
cf3> 
cf3>      +  Private classes augmented:
cf3> 
cf3>      -  Private classes diminished:
...
cf3> Outcome of version (not specified) (agent-0): Promises observed to be kept 0%, Promises repaired 100%, Promises not repaired 0%
cf3> Estimated system complexity as touched objects = 0, for 1 promises
cf3>  -> Writing last-seen observations
cf3>  -> Keyring is empty
cf3>  -> No lock purging scheduled
```

## Set timezone

The timezone for the server can be set with the command `dpkg-reconfigure tzdata`. It is also possible to set the timezone noninteractive.

```
sudo sh -c 'echo "Europe/Stockholm" > /etc/timezone'  
sudo sh -c 'dpkg-reconfigure -f noninteractive tzdata'
```

The code can be found here: https://github.com/colmsjo/wip/blob/master/cfengine/timezone.cf


## Install webmin


Make promises out of this:

```
sudo nano /etc/apt/sources.list

deb http://download.webmin.com/download/repository sarge contrib
deb http://webmin.mirror.somersettechsolutions.co.uk/repository sarge contrib


cd /root
wget http://www.webmin.com/jcameron-key.asc
apt-key add jcameron-key.asc

apt-get update
apt-get install webmin
```


## pull git repository periodically

* https://cfengine.com/manuals/cf3-Reference#Familiiarizing-yourself
* http://cfengine.com/manuals/st-schedule#Commands-promises
* http://cfengine.com/manuals/cf3-Reference#Function-splayclass

First git need to be setup. Login to the server and:
```
cd && cd .ssh
ssh-keygen -t rsa -C "your_email@youremail.com"
# Add SSH key to github (or whatever git host you are using)
ssh -T git@github.com

# Pu the keys in the root account
sudo sh -c "cp /home/ubuntu/.ssh/id_rsa* /root/.ssh/"

# Now checkout the git repository with the cfengine configuration
sudo sh -c "git clone git@github.com:XXXXX/XXXXXX.git"
```

### Have the cfengine configuration updated periodically

```
body common control
{
bundlesequence  => { "pull_cf_config" };
}

bundle agent pull_cf_config
{
classes:

  "my_result" expression => splayclass("$(sys.host)$(sys.ipv4)","hourly");

commands:

  "cd /etc/cfengine3 && /usr/bin/git"
     args => "pull",
     contain => standard;
}

body contain standard
{
exec_owner => "root";
useshell => "true";
}
```


## Run cf-agent at random intervals

Run cf-agent at random interval no longer than maximum 10 minutes:

```
body executor control
{
splaytime => "10";              # Minutes
}
```