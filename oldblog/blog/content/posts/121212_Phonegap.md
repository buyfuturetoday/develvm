Getting started with Phonegap

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Getting started with Phonegap)
[meta:date]: <> (2012-12-12)
[meta:nested:key]: <> (Metadata value)

##!!truncate


# Background

I want to develop a web app that can take pictures using the camera. I'll start with Android.

The source code is available here: https://github.com/colmsjo/cardova-test


# Links

Some articles:

 * Excellent background on how it works - http://www.risingj.com/archives/267
 * I followed this guide - http://docs.phonegap.com/en/2.2.0/guide_getting-started_android_index.md.html#Getting%20Started%20with%20Android
 * http://agiliq.com/blog/2012/03/developing-android-applications-from-command-line/

Links:

 * http://cordova.apache.org/
 * Node Cordova client - https://github.com/filmaj/cordova-client
 
# Step by step
 
 
  1. Download the Android SDK - http://developer.android.com/sdk/index.html#download
  1. Download Phonegap (could not find a Cordova download, but they are supposed to be the same) - http://phonegap.com/download#
  
 
These steps are mentioned in the guide, but I don't think they are needed: 
 
  1. Download Eclipse for mobile developers - http://www.eclipse.org/downloads/packages/eclipse-mobile-developers/junosr1
  1. Download ADT plugin - http://developer.android.com/sdk/installing/installing-adt.html
 
 
## Install the SDK and run a Hello World
 
After downloading the SDK and Phonegap, do this:
 
```
nano ~/.bash_profile
...
#
# Android SDK
#

export PATH="$PATH:/Users/jonas/local2/adt-bundle-mac/sdk/tools:/Users/jonas/local2/adt-bundle-mac/sdk/platform-tools"

source ~/.bash_profile

cd ~/local/phonegap/lib/android/bin
```
 
 
Now you're supposed to be able to create a first project:
```
# NOTE: it needs to be com.XXX only XXX do not work
./create ~/tmp/phonegap com.test testproject1
```

Now open eclipse. 

 1. Choose File->New->Other->Android Project From existing Code
 1. Right click on the project and Select Run As->Android Application

This is supposed to work, for me the app only says 'CONNECTING TO DEVICE'

I tried this:

 1. Install one or more Intel x86 Atom System Images as well as the Intel Hardware Accelerated Execution Manager (under Extras).
 1. Run the Intel installer, which has been downloaded to: extras/intel/Hardware_Accelerated_Execution_Manager within your Android SDK
Create a new AVD with the Target set to an Intel image.

Now it works, it says: 'DEVICE IS READY'


## Develop a app accessing the camera

I took the HTML code from the example below and inserted into index.html

 * http://docs.phonegap.com/en/2.2.0/cordova_camera_camera.md.html#Camera

This works well. Try yourself, the source code is here: https://github.com/colmsjo/cardova-test


## Troubleshooting

Google and you'll find a lot of info about people having trouble. 

An AVD needs to be created in order to run the emulator. Start Eclipse and open the 
Android Virtual Device Manager Windows 


Or run this:

```
android avd
```

Devices also needs to be setup:

```
adb devices
adb kill-server
adb reboot

# Start one emulator
emulator @avd1

# Check connected devices
adb devices
```

There is a Hello world app here:

 * git://github.com/apache/cordova-app-hello-world.git 
 
 
Did a lot of testing, finally this actually works:
 
```
cd ~/local2/phonegap/lib/android
./bin/create ~/phonegap_android_proj com.example TestProjActivity 3

cd ~/phonegap_android_proj

ant clean debug install
``` 
 
 
Install apk in emulator:

```
adb install TestProjActivity-debug.apk
```
 
Now check the list of apps in the device and start HelloCordova. It should say DEVICE IS READY


## Alternative way of creating the app

I tested this instead and it seams to work:
```
npm install cordova -g
sudo chown -R <yourusername> /usr/local/lib/node_modules/cordova

cordova create Baz
cd Baz/
cordova platform add android
cordova build
cordova serve android
```



