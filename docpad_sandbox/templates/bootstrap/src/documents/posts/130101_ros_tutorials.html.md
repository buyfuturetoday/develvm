
---
layout: post
title: First steps learning ROS 
date: 2013-01-01
author: Jonas Colmsjo
---

First steps learning ROS 




The tutorial seams like a good place to start:

 * http://www.ros.org/wiki/ROS/Tutorials


Create overlay in ~/fuerte_workspace

```
rosws init ~/fuerte_workspace /opt/ros/fuerte
```


Use overlay

```
source ~/fuerte_workspace/setup.bash
```

Create sandbox

```
mkdir ~/fuerte_workspace/sandbox
rosws set ~/fuerte_workspace/sandbox
```


# Interactive markers


 * http://www.ros.org/wiki/rviz/Tutorials/Interactive%20Markers%3A%20Getting%20Started


```
# One terminal
roscore

# Second terminal
rosrun interactive_marker_tutorials basic_controls

# Third terminal
rosrun rviz rviz
```

# Turtle simulator

I'm not sure this is needed

```
rosdep install turtle_tf rviz
rosmake turtle_tf rviz
```

Run the demo

```
roslaunch turtle_tf turtle_tf_demo.launch
```
