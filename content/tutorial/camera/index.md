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

Since its first release, Processing has been known for its capacity in creating visualizations. It's strength in manipulating pixels of video frames and images enables more experimentation when external image sources, like cameras, are used.

While interesting and meaningful, using the built-in camera of the laptop or desktop computer with Processing can be limited by the form factor and the input methods of the computer. The portability and expandability of Raspberry Pi or similar single board computers opens up new frontiers for using camera input with Processing.

Combination of Processing on Raspberry Pi, camera, and a couple of components connected to Pi's GPIO could be used to make some unique experiences while remaining affordable. Think of some possibilities like:

- Portable cameras with filters that are controlled by physical buttons and knobs
- Portrait booths that generate artwork based on recent snapshot
- Computer Vision experiments
- Timelapse rigs

(Video of some filters / sketches in action?)

Of course this is just a short glimpse of what's possible. The knowledge you gain in this tutorial should enable you to create your own projects using camera input in Processing on Raspberry Pi.

Let's take a look at what you will need to have in order to make the projects in this tutorial.
  
## Required Materials

- a Raspberry Pi model 3+, 3 or 2 (those are recommended, it will work the Pi Zero and older versions, albeit much more slowly) with Processing [installed](https://pi.processing.org/get-started/)
- TV or any screen / monitor with HDMI input
- Official Raspberry Pi Camera or a USB Webcam compatible with Raspberry Pi
- 1 push button
- Breadboard
- Wires

# GLVideo library

Unfortunately, the official Video / Capture library 

https://github.com/gohai/processing-glvideo

Similar to the official **Capture** library that has excellent tutorial by Daniel Shiffman: 
https://processing.org/tutorials/video/

## Overview and history


Let's start by going over the image input that you can use with Processing on the Pi. 

## Types of image input

  - usb
  - picamera

## installation

For use with the Raspberry Pi camera, make sure the camera is
enabled in the Raspberry Pi Configuration tool and add the line
"bcm2835_v4l2" (without quotation marks) to the file
/etc/modules. After a restart you should be able to use the camera in Processing:


## simple example from the lib

Simple capture

https://github.com/processing/processing-video/tree/master/examples/Capture

## switching between webcam or picamera


### provide details on limitations
  
  
# Mini projects with the camera

## color picker from GLVideo

## Histogram browser in real time

## Selfie with Processing image filters (blur, threshold, etc)

### adding a button for shutter

## Using GLSL shaders

# Next steps