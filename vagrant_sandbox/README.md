Vagrant sandbox
---------------

NOTE: A kernel upgrade will be performed on the the first boot. In case of problems
in this upgrade, just do `vagrant up` once more to start the vm. `uname -r` should
say 3.2.0.23

NOTE: `vagrant reload vb|aws` don't seam to work. Use `vagrant destroy vb|aws && vagrant up vb|aws` instead.


See http://docs.vagrantup.com for more details


Some commands:

```
# List available boxes
vagrant box list

# Initialize 64 bit ubntu
vagrant init precise64 http://files.vagrantup.com/precise64.box
```

Some virtualbox boxes:

 * Ubuntu 12.04 64 bit - http://files.vagrantup.com/precise64.box
 * Ubuntu 12.04 32 bit - http://files.vagrantup.com/precise32.box
 * Ubuntu 13.04 64 bit - http://cloud-images.ubuntu.com/raring/current/raring-server-cloudimg-vagrant-amd64-disk1.box
 * CentOs 6.3 64 bit   - https://dl.dropbox.com/u/7225008/Vagrant/CentOS-6.3-x86_64-minimal.box
 * More to be found here - http://www.vagrantbox.es/



```
# Start VM
vagrant up

# Login
vagrant ssh

# Shutdown VM
vagrant halt

# Remove VM
vagrant destroy
```


In VirtualBox:

```
# List machines
VBoxManage list vms

# List running machines
VBoxManage list runningvms
```


AWS EC2 instances can also be used:

 * https://github.com/mitchellh/vagrant-aws


NOTE: Only the region us-east-1 seams to work at the moment.

```
vagrant plugin install vagrant-aws

vagrant plugin list

vagrant box add dummy https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box

# Set this variable to use AWS, it should bot be set to use a local Virtualbox instead
export VAGRANT_AWS='Yes'

# These environment variables need to be set, put in bashrc/bach_profile env 
export AWS_API_KEY=...
export AWS_API_SECRET=...
export AWS_PRIVATE_KEY_PATH=...
export AWS_KEYAIR_NAME=...
export AWS_REGION=...

vagrant up --provider=aws
```



Docker
-----


Docker has been installed in this VM.


```
# List images
docker images

# List running containers
docker ps

# List all containers
docker ps -a

# create a new container and connect. ID could be base etc.
docker run -i -t [ID] /bin/bash

# Create ubuntu image from local tar (in case there is network connectivity to the docker registry)
cp /vagrant/ubuntu.tar.gz
gunzip ubuntu.tar.gz
cat ubuntu.tar | docker import - my_ubuntu 

# Check ID of image just created
docker images

# Create container using the image
docker run -i -t [ID] /bin/bash
```


## Import/Export

Images can be imoported and exported. My images are saved in Amazon S3 (they are to big to save in git).
The images are gound here: s3://gizur-docker


