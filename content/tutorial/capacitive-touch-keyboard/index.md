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

With addition of an inexpensive capacitive touch integrated circuit (IC) such as MPR121, your Raspberry Pi can become a breeding ground for new interaction ideas:

(TODO: Video of various conductive materials activating changes in Processing sketch)

{{< figure src="processing-capacitive-touch-2.jpg" link="processing-capacitive-touch-2.jpg" title="Using Capacitive Touch in Processing" >}} 

In this tutorial we will explore making everyday objects interact with Processing by using a concept known as "capacitive touch sensing". Capacitive touch is used in various devices to detect presence and sometimes position of human touch. For example smart phones, tablets, laptop touchpads and other devices use this concept to track location of finger(s) across some surface.

{{% message title="How is this different from using buttons?" %}}
Circuits using capacitive touch do not require physical buttons. The button is replaced with anything that can conduct electricity. Introducing human touch into a **specially designed circuit** changes the electrical properties of that circuit, enabling detection of human touch. 
{{% /message %}}

In the context of this project, merely detecting when something conductive is touched or not touched by a human can enable us to make some new forms of interaction. Take a look at the example below to see how capacitive touch can be used with Processing:

(TODO: Video of the final sketch example can go here)

Excited to try this out? Let's take a look at what you will need to make use capacitive touch in your sketches!

## Project materials:

To build a capacitive touch keyboard or a similar input device, you would need to have the following:

- a Raspberry Pi model 3+, 3 or 2 (those are recommended, it will work the Pi Zero and older versions, albeit much more slowly) with Processing [installed](https://pi.processing.org/get-started/)
- TV or any screen / monitor with HDMI input
- MPR121 12-key Capacitive Touch Sensor Breakout
- Copper tape or any other conductor for capacitive touch electrodes
- Headphones or a speaker with integrated amplifier
- Alligator clips or soldering iron with solder
- Breadboard
- Wires

{{% message title="Using other capacitive touch ICs" %}}
Processing has support for MPR121 IC via MPR121 class in one of the "Hardware I/O" library examples titled [Touch_I2C_MPR121](https://github.com/processing/processing/tree/master/java/libraries/io/examples/Touch_I2C_MPR121). It is possible to use another IC instead of MPR121 by reading through IC's datasheet and creating your own class for it. For example, CAP1188 is another affordable candidate. 
{{% /message %}}

With these components on hand, let's take a look how to take advantage of using a special hardware interface (I2C) to communicate with MPR121 capactive touch sensor.

## I2C interface on Raspberry Pi

Raspberry Pi and similar single board computers support I2C interface for communicating with a wide variety of affordable microcontrollers that support I2C protocol. According to a [Sparkfun tutorial](https://learn.sparkfun.com/tutorials/i2c) on I2C: 

> The Inter-integrated Circuit (I2C) Protocol is a protocol intended to allow multiple “slave” digital integrated circuits (“chips”) to communicate with one or more “master” chips. Like the Serial Peripheral Interface (SPI), it is only intended for short distance communications within a single device. Like Asynchronous Serial Interfaces (such as RS-232 or UARTs), it only requires two signal wires to exchange information.

How is this convenient interface used in practice? Let's say you have a microcontroller that is I2C compatible. You'd identify 4 pins necessary to connect it to Raspberry Pi:

- Positive power (usually +3.3V)
- Ground
- Serial Clock (SCL)
- Serial Data (SDA)

Then, connect those pins as follows:

{{< figure src="rpi-i2c.png" link="rpi-i2c.png" width="500" title="Connecting I2C device (chip) to a Raspberry Pi" >}} 

With this connection in place, you can use the I2C interface on Raspberry Pi in software and specifically, in Processing. The I2C interface is supported in Processing via Hardware I/O library's I2C class documented here: [Hardware I/O I2C Reference](https://processing.org/reference/libraries/io/I2C.html).

{{% message type="focus" title="How many I2C devices can I use simultaneously?" %}}
I2C interface supports many I2C devices whose SDA, SCL and power pins are connected in parallel. Each I2C device has a factory-configured internal address that sometimes can be changed via pins on the microcontroller according to its datasheet. All devices on I2C bus should have unique addresses in order to work with Processing or other software.
{{% /message %}}

To make Processing compatible with a wide variety of I2C devices on single board computers, the Hardware I/O library comes with a few useful examples (listed [on Github](https://github.com/processing/processing/tree/master/java/libraries/io/examples) or under "Examples" within PDE):

- BME280 Temperature, Pressure and Humidity sensor
- MCP4725 Digital to Analog Converter (DAC)
- TSL2561 Luminosity/Lux/Light sensor
- PCA9685 PWM/Servo Driver
- MPR121 Touch sensor
- HMC6352 Compass
- SSD1306 OLED Display

In this tutorial, we'll make use of MPR121 touch sensor example code and expand it to make something interesting!

## Capacitive touch sensing

What is capacitive touch sensing and how does it work? 


creative freedom for input method Unique output
    
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