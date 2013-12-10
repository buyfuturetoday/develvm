# -*- mode: ruby -*-
# vi: set ft=ruby :

#
# Start VM with docker installed
#


Vagrant.configure("2") do |config|

  #
  # AWS plugin
  #

  config.vm.define :ubuntu_aws do |aws_config|
   # aws_config.vm.forward_port 80, 8080

    aws_config.vm.provider :aws do |aws, override|
      aws.access_key_id     = ENV['AWS_API_KEY']
      aws.secret_access_key = ENV['AWS_API_SECRET']
      aws.keypair_name      = ENV['AWS_KEYPAIR_NAME']
      aws.region            = ENV['AWS_REGION2']

      # For 13.04 use ami-eb95e382
      aws.ami               = "ami-7747d01e"
      #aws.instance_type     =

      override.ssh.username = "ubuntu"
      override.ssh.private_key_path = ENV['AWS_PRIVATE_KEY_PATH']
    end

    aws_config.vm.box = "dummy"
    aws_config.vm.box_url = "https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box"
    aws_config.vm.provision :shell, :path => "bootstrap-ec2.sh"

  end


  #
  # A local virtualbox
  #
  # Using a bridged network instead of NAT (the VM will apear to be on the same network as the host)
  #

  config.vm.define :ubuntu do |vb_config|
    vb_config.vm.box = "precise64"
    vb_config.vm.box_url = "http://files.vagrantup.com/precise64.box"

#    vb_config.vm.network :public_network
    vb_config.vm.network :forwarded_port, guest: 80, host: 8080, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 8081, host: 8081, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 8069, host: 8069, auto_correct: true

    vb_config.vm.network :forwarded_port, guest: 49150, host: 49150, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49151, host: 49151, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49152, host: 49152, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49153, host: 49153, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49154, host: 49154, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49155, host: 49155, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49156, host: 49156, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49157, host: 49157, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49158, host: 49158, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49159, host: 49159, auto_correct: true

    vb_config.vm.network :forwarded_port, guest: 49160, host: 49160, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49161, host: 49161, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49162, host: 49162, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49163, host: 49163, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49164, host: 49164, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49165, host: 49165, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49166, host: 49166, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49167, host: 49167, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49168, host: 49168, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49169, host: 49169, auto_correct: true

    vb_config.vm.network :forwarded_port, guest: 49170, host: 49170, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49171, host: 49171, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49172, host: 49172, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49173, host: 49173, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49174, host: 49174, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49175, host: 49175, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49176, host: 49176, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49177, host: 49177, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49178, host: 49178, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49179, host: 49179, auto_correct: true

    vb_config.vm.network :forwarded_port, guest: 49180, host: 49180, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49181, host: 49181, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49182, host: 49182, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49183, host: 49183, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49184, host: 49184, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49185, host: 49185, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49186, host: 49186, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49187, host: 49187, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49188, host: 49188, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49189, host: 49189, auto_correct: true

    vb_config.vm.network :forwarded_port, guest: 49190, host: 49190, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49191, host: 49191, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49192, host: 49192, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49193, host: 49193, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49194, host: 49194, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49195, host: 49195, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49196, host: 49196, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49197, host: 49197, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49198, host: 49198, auto_correct: true
    vb_config.vm.network :forwarded_port, guest: 49199, host: 49199, auto_correct: true

    vb_config.vm.provision :shell, :path => "bootstrap.sh"
    vb_config.vm.provision :shell, :path => "bootstrap2.sh"
  end


  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--memory", "1000"]
  end


  #
  # CoreOS - an operating system build for docker (only!)
  #

  config.vm.define :coreos do |vb_config|

#    vb_config.vm.network :public_network
    vb_config.vm.network :forwarded_port, guest: 8080, host: 8080, auto_correct: true
    vb_config.vm.box = "coreos"
    vb_config.vm.box_url = "http://storage.core-os.net/coreos/amd64-generic/dev-channel/coreos_production_vagrant.box"
  end


  #
  # Arch linux
  #

  config.vm.define :arch do |vb_config|
    vb_config.vm.network :public_network
    vb_config.vm.box = "arch"
    vb_config.vm.box_url = "https://downloads.sourceforge.net/project/vagrant-archlinux/vagrant-archlinux.box"
  end


  #
  # Gentoo linux
  #

  config.vm.define :gentoo do |vb_config|

    vb_config.vm.network :public_network
    vb_config.vm.box = "gentoo"
    vb_config.vm.box_url = "https://lxmx-vm.s3.amazonaws.com/vagrant/boxes/lxmx_gentoo-2013.05_chef-11.4.4.box"
#    vb_config.vm.box_url = "https://seedrs.box.com/shared/static/6cg94mkdtuz3baoy8zl8.box"
  end


  #
  # OpenSUSE
  #
  # Network don't work

  config.vm.define :suse do |vb_config|

#    vb_config.vm.network :public_network
    vb_config.vm.box = "suse123"

#    vb_config.vm.box_url = "http://bit.ly/openSUSE-12-3-virtualbox-box"
    vb_config.vm.box_url = "http://sourceforge.net/projects/opensusevagrant/files/12.3/opensuse-12.3-64.box/download"

  end



  #
  # OpenSUSE
  # 
  # Network don't work

  config.vm.define :centos do |vb_config|

#    vb_config.vm.network :public_network
    vb_config.vm.box = "centos64"

    vb_config.vm.box_url = "https://github.com/2creatives/vagrant-centos/releases/download/v0.1.0/centos64-x86_64-20131030.box"

  end



  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "2048", "--cpus", "2"]
#    vb.gui = true
  end



end
