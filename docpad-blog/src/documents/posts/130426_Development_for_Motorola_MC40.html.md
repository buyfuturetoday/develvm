
---
layout: post
title: Development for Motorola MC
date: 2013-04-26
author: Jonas Colmsjo
tags: ['post']
---

Development for Motorola MC40 





## Introduction

MC40 runs Android but Phonegap APK files don't seam to work.

Motorola provides a development suite:

 * Installation instruction - http://docs.rhomobile.com/rhomobile-install
 * http://docs.rhomobile.com/
 * https://developer.motorolasolutions.com/community/rhomobile-suite
 * https://app.rhohub.com/



## Installation on OSX


Need to install tvm  - https://rvm.io/

```
curl -L https://get.rvm.io | bash -s stable --rails --autolibs=enabled # Or, --ruby=1.9.3
```


Runing `curl -L https://get.rvm.io | bash -s stable --rails --autolibs=enabled ` gives me an error, see below.

Run this instread:

```
rvm install 1.9.3
```


### Erorrs

```
Error running 'env GEM_PATH=/Users/jonas/.rvm/gems/ruby-2.0.0-p0:/Users/jonas/.rvm/gems/ruby-2.0.0-p0@global:/Users/jonas/.rvm/gems/ruby-2.0.0-p0:/Users/jonas/.rvm/gems/ruby-2.0.0-p0@global GEM_HOME=/Users/jonas/.rvm/gems/ruby-2.0.0-p0 /Users/jonas/.rvm/rubies/ruby-2.0.0-p0/bin/ruby -d /Users/jonas/.rvm/src/rubygems-2.0.3/setup.rb',
please read /Users/jonas/.rvm/log/ruby-2.0.0-p0/1367225774_rubygems.install.log
```

This is the content of the install log:

```
[2013-04-29 10:56:14] /Users/jonas/.rvm/rubies/ruby-2.0.0-p0/bin/ruby
Exception `LoadError' at /Users/jonas/.rvm/rubies/ruby-2.0.0-p0/lib/ruby/2.0.0/rubygems.rb:1073 - cannot load such file -- rubygems/defaults/operating_system
Exception `LoadError' at /Users/jonas/.rvm/rubies/ruby-2.0.0-p0/lib/ruby/2.0.0/rubygems.rb:1082 - cannot load such file -- rubygems/defaults/ruby
/Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require': dlopen(/Users/jonas/.rvm/rubies/ruby-2.0.0-p0/lib/ruby/2.0.0/x86_64-darwin12.3.0/openssl.bundle, 9): Symbol not found: _TLSv1_1_client_method (LoadError)
  Referenced from: /Users/jonas/.rvm/rubies/ruby-2.0.0-p0/lib/ruby/2.0.0/x86_64-darwin12.3.0/openssl.bundle
  Expected in: /usr/lib/hive/lib/native/universal/libssl.1.0.0.dylib
 in /Users/jonas/.rvm/rubies/ruby-2.0.0-p0/lib/ruby/2.0.0/x86_64-darwin12.3.0/openssl.bundle - /Users/jonas/.rvm/rubies/ruby-2.0.0-p0/lib/ruby/2.0.0/x86_64-darwin12.3.0/openssl.bundle
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/rubies/ruby-2.0.0-p0/lib/ruby/2.0.0/openssl.rb:17:in `<top (required)>'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/security.rb:11:in `<top (required)>'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/package.rb:43:in `<top (required)>'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/installer.rb:8:in `<top (required)>'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/request_set.rb:5:in `<top (required)>'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems.rb:195:in `finish_resolve'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/rdoc.rb:14:in `<top (required)>'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/uninstaller.rb:10:in `<top (required)>'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/core_ext/kernel_require.rb:45:in `require'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/commands/setup_command.rb:462:in `uninstall_old_gemcutter'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/commands/setup_command.rb:146:in `execute'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/command.rb:305:in `invoke_with_build_args'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/command_manager.rb:170:in `process_args'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/command_manager.rb:130:in `run'
        from /Users/jonas/.rvm/src/rubygems-2.0.3/lib/rubygems/gem_runner.rb:60:in `run'
        from setup.rb:45:in `<main>'
RubyGems 2.0.3 installed
```


## Alternative way to install

 * https://github.com/railsinstaller/railsinstaller-nix/downloads
 * background - http://www.engineyard.com/blog/2012/railsinstaller-for-os-x/



