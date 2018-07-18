---
title: "Capacitive Touch Keyboard"
date: 2018-07-14T15:43:48+08:00
lastmod: 2018-07-14T16:50:48+08:00
draft: false
tags: ["capacitive touch", "keyboard", "i2c"]
categories: ["hardware"]
author: "Maksim Surguy"
---

# Introduction

Would you like to escape using conventional input methods such as keyboard and mouse that interact with your Processing sketches? Perhaps you want to use regular objects such as fruits, vegetables or foil to provide input for your sketches? Then this tutorial is for you! 

In this tutorial we will explore making everyday objects interact with Processing through a concept known as "capacitive touch". Capacitive touch is used in various circuits to detect presence and sometimes position of human touch. For example smart phones, tablets, laptop touchpads and other devices use this concept to track location of finger(s) across some surface.

{{% message title="How is this different from using buttons?" %}}
Circuits using capacitive touch do not require physical buttons. The button is replaced with anything that can conduct electricity. Introducing human touch into a **specially designed circuit** changes the electrical properties of that circuit, enabling detection of human touch. 
{{% /message %}}

In the context of this project, merely detecting when something is touched or not touched by a human can enable us to make some new forms of interaction. Take a look at the example below to see how capacitive touch can be used with Processing:

(Video of various capacitive touch examples goes here)



Excited to try this out? Let's take a look at what you will need to make this!

## Project materials:

To build the capacitive touch keyboard, you would need to have the following:

- a Raspberry Pi model 3+, 3 or 2 (those are recommended, it will work the Pi Zero and older versions, albeit much more slowly) with Processing [installed](https://pi.processing.org/get-started/)
- TV or any screen / monitor with HDMI input
- MPR121 Capacitive Touch Sensor Breakout
- Copper tape or any other conductor for capacitive touch electrodes
- Alligator clips or soldering iron with solder
- Breadboard
- Wires

## Using I2C interface
- How to plug in
- Which pins?
- Working with I2c interface (sidenote or short paragraph)
     - Connecting many devices is possible
     - Which pins on the Pi can be used
     - What addresses are and how to know what to use
     - Processing class already implements functionality
     - Link to the other Processing I2C examples

## Capacitive touch sensing
- Short overview on how it works
- Devices that use capacitive touch sensing
     Phones / tablets
     Makey Makey
     Magic Mouse
- What else can we do with this?
     Making keyboard
    Audio visual experience
    Cover materials and interactivity - creative freedom for input method
    Unique output
    
## Making sound with Processing
- Intro to sound library
- Short example

# Making capacitive touch keyboard
Alert - the electrodes can be made of...


```processing
import processing.io.*;
MPR121 touch;

// see setup.png in the sketch folder for wiring details

void setup() {
  size(600, 200);
  //printArray(I2C.list());
  touch = new MPR121("i2c-1", 0x5a);
}

void draw() {
  background(204);
  noStroke();

  touch.update();

  for (int i=0; i < 12; i++) {
    if (touch.touched(i)) {
      fill(255, 0, 0);
    } else {
      fill(255, 255, 255);
    }
    ellipse((width/12) * (i+0.5), height/2, 20, 20);
  }
}
```

## Get a Single Key to work

## Get other keys

- Processing Sketch for capacitive touch keyboard
     - Playing with single key
     - Adding more keys
     - Complete sketch
     
## Next Steps

- Connect knobs and buttons, link to previous tutorial
- Add lights