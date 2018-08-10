---
title: "Camera"
date: 2018-07-05T15:43:48+08:00
lastmod: 2018-07-06T10:50:48+08:00
draft: false
tags: ["camera", "filters", "glsl"]
categories: ["hardware"]
author: "Maksim Surguy"
description: "Learn how to use camera with Processing on the Pi"
thumbnail: "thumbnail.jpg"
---

# Introduction

Since its first release, Processing has been known for its capacity in creating visualizations. It's strength in manipulating pixels of images enables more experimentation when external image sources, like cameras, are used.

While interesting and meaningful, using the built-in camera of the laptop or desktop computer with Processing can be limited by the form factor and the input methods of the computer. The portability and expandability of Raspberry Pi single board computers opens up new frontiers for using camera as input for Processing sketches.

The combination of Processing, camera, and a couple of components connected to Pi's GPIO could be used to make some unique experiences while remaining affordable. Think of possibilities like:

- Portable cameras with filters that are controlled by physical buttons and knobs
- Portrait booths that generate artwork based on recent snapshot
- Computer Vision experiments
- Timelapse rigs
- and more

(Video of some filters / sketches in action?)

Of course this is just a short glimpse of what's possible. The knowledge you gain in this tutorial should enable you to create your own projects using camera input in Processing on Raspberry Pi.

Let's take a look at what you will need to have in order to make the projects in this tutorial.
  
## Required Materials

The main component that you would need for this tutorial is the camera attached to Raspberry Pi. Below is the full list of parts necessary for this tutorial:

- a Raspberry Pi model 3+, 3 or 2 (those are recommended, it will work the Pi Zero and older versions, albeit much more slowly) with Processing [installed](https://pi.processing.org/get-started/)
- TV or any screen / monitor with HDMI input
- Official Raspberry Pi Camera or a USB Webcam compatible with Raspberry Pi

Optional:

- 1 push button
- Wires

{{% message type="warning" title="A note about cameras" %}}
The official Raspberry Pi Camera is recommended because some inexpensive alternatives have been known to not work well with Processing. Also, if a USB webcam is used instead of the Pi Camera, there might be slight performance issues.  
{{% /message %}}

## Overview of using camera with Processing on the Pi

Getting the video frames from camera in Processing has to be facilitated by an external library. The official [Video Library](https://processing.org/reference/libraries/video/) works well on Windows, Mac and some linux distributions. Unfortunately, the official Video Library does not work on Raspberry Pi running Raspbian operating system. 

Thanks to the hard work of Gottfried Haider(TODO: add more details?), there is a replacement for the Video Library that works on the Pi, and that is [GL Video Library](https://github.com/gohai/processing-glvideo)

# GL Video library

[GL Video Library](https://github.com/gohai/processing-glvideo) works well on Raspberry Pi computers running Raspbian OS. The library can be installed through the Library Manager and it enables you to:

- Capture frames from camera via GLCapture subclass
- Read frames from video files via GLMovie subclass

TODO: which other details are necessary? Hardware acceleration? Etc

## Installation and set up

To use GL Video Library in Processing on the Pi, find it in the contribution manager and install it:

{{< figure src="library-manager.png" title="Installing GL Video library" >}} 

Now, let's connect a camera to your Pi and set it up. There are two types of cameras that GL Video can work with:

- Raspberry Pi Camera (recommended)
- USB webcams

The setup will be different depending on the type of camera so let's go over these two options:

### If using a webcam

If a USB webcam is used, no other setup is necessary. Just plug the camera in and you're good to go! Keep in mind, USB webcams might deliver lower performance than the Pi Camera.

### If using the Pi Camera

If it is the first time you Pi Camera on the Pi, some preliminary steps are needed. 

Connect the camera to the Pi. Be sure to turn off the Pi and disconnect it from power before connecting the camera. After the camera is connected, boot up the Pi and enable the camera interface in `raspi-config` tool:

{{< figure src="raspi-config.png" class="center"  title="Enabling the camera interface on the Pi" >}} 

When a Raspberry Pi Camera is used, GL Video library needs a special driver to be enabled on the operating system level. Add the line `"bcm2835_v4l2"` (without quotation marks) to the file `/etc/modules`. After a restart you should be able to use the camera in Processing.

## Using GLCapture

Steps

- Make sure the renderer is P2D or P3D
- Import the lib
- Create GLCapture object
- Initialize the GLCapture object, specifying framerate, width and height of the desired video stream
- Start the stream via .start()
- Read the video stream if it is available 



listing the cameras connected to the Pi (useful when there are more than one)

finding out the framerate and resolutions supported by the camera

Only P2D and P3D renderers are supported


import the lib

import gohai.glvideo.*;
GLCapture video;

  size(320, 240, P2D);

  String[] devices = GLCapture.list();

    String[] configs = GLCapture.configs(devices[0]);


  video = new GLCapture(this);


  // you could be more specific also, e.g.
  //video = new GLCapture(this, devices[0]);
  //video = new GLCapture(this, devices[0], 640, 480, 25);
  //video = new GLCapture(this, devices[0], configs[0]);


  video.start();

if (video.available()) {
    video.read();
  }
  image(video, 0, 0, width, height);

Similar to the official **Capture** library that has excellent tutorial by Daniel Shiffman: 
https://processing.org/tutorials/video/

## Simple capture

Simple capture

https://github.com/processing/processing-video/tree/master/examples/Capture  
  
# Mini projects with the camera

## color picker from GLVideo

## Histogram preview

## Selfie with Processing image filters (blur, threshold, etc)

### adding a button for shutter



## Using GLSL shaders

Because the data we get from GL Video library is essentially regular pixel data, we can do whatever we want with those pixels after putting them onto a PImage. For example, we can take advantage of using hardware accelerated shaders to offload image processing from the relatively slow CPU and onto the graphics processing unit (GPU) of the Raspberry Pi. 



# Next steps