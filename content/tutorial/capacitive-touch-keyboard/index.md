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

How is this interface used in practice? Let's say you have a microcontroller that is I2C compatible. You'd identify 4 pins necessary to connect it to the Raspberry Pi's I2C pins:

- Positive power (+3.3V)
- Ground
- Serial Clock (SCL)
- Serial Data (SDA)

Then, connect those pins as follows:

{{< figure src="rpi-i2c.png" link="rpi-i2c.png" width="500" title="Connecting I2C device (chip) to a Raspberry Pi" >}} 

With this connection in place, you can use the I2C interface on Raspberry Pi in software and specifically, in Processing. The I2C interface is supported in Processing via Hardware I/O library's I2C class documented here: [Hardware I/O I2C Reference](https://processing.org/reference/libraries/io/I2C.html).

{{% message type="focus" title="How many I2C devices can I use simultaneously?" %}}
I2C interface supports many I2C devices whose SDA, SCL and power pins are connected in parallel. Each I2C device has a factory-configured internal address that sometimes can be changed via pins on the microcontroller according to its datasheet. Each device connected to the I2C bus should have unique address in order to work with Processing or other software.
{{% /message %}}

To make Processing compatible with a wide variety of I2C devices on single board computers, the Hardware I/O library comes with a few useful examples (listed [on Github](https://github.com/processing/processing/tree/master/java/libraries/io/examples) or under "Examples" within PDE):

- BME280 Temperature, Pressure and Humidity sensor
- MCP4725 Digital to Analog Converter (DAC)
- TSL2561 Luminosity/Lux/Light sensor
- PCA9685 PWM/Servo Driver
- MPR121 Touch sensor
- HMC6352 Compass
- SSD1306 OLED Display

In this tutorial, we'll make use of MPR121 touch sensor example code and build on top of it to make something interesting!

## Capacitive touch sensing

What is capacitive touch sensing and how does it work? 

Capacitive touch sensing 
https://en.wikipedia.org/wiki/Capacitive_sensing
https://www.allaboutcircuits.com/technical-articles/introduction-to-capacitive-touch-sensing/

creative freedom for input method Unique output
    
## Generating sound from Processing

Processing is capable of playing music, generating and analyzing sounds through the use of one of the built-in or external sound libraries:

- Processing 3.x built-in [Sound Library](https://processing.org/reference/libraries/sound/index.html
)
- New [Sound Library](https://github.com/kevinstadler/processing-sound) by Kevin Stadler
- Minim by Damien Di Fede and Anderson Mills

The theory behind using oscillators, envelopes is described in detail in one of the Processing tutorials: https://processing.org/tutorials/sound/


# Making a capacitive touch keyboard

First sketch - piano with i2c MPR sensor, but without sound


```processing
import processing.io.*;
MPR121 touch;

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
     
     
```processing
/*
 
 This sketch uses a modified example sketch from the sound library (Envelopes).
 
 In this sketch, three various oscillators can be used to generate basic musical notes in range of a single octave.
 An envelope is used to limit the duration of the sound and to create a pleasant profile for each note.
 Volume of the sound is controlled by changing the amplitude of the oscillators and the envelope.
 
 A capacitive touch sensor (MPR121) along with 12 electrodes connected to it is used for the following functions: 
 - playing each note (8 keys)
 - switching between oscillators (3 modes)
 - switching between volume levels (1 toggle)
 
 */

import processing.sound.*;
import processing.io.*;
MPR121 touch; // define MPR121 I2C capacitive touch sensor

SinOsc sinOsc; // Sine oscillator
SqrOsc sqrOsc; // Square oscillator
TriOsc triOsc; // Triangle oscillator

Env env; // envelope used to create Attack-Sustain-Release profile 

// Durations for the Attack-Sustain-Release(ASR) envelope
float attackTime = 0.001;
float sustainTime = 0.004;
float releaseTime = 0.5; // essentially, duration of the note

// Define eight minor notes, in Hertz
float[] notes = { 185, 208, 233, 277, 311, 370, 415, 466}; 
//float[] notes = { 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25}; // Or use a full octave of major notes

int duration = 250; // duration between consecutive repetition of the same note 

int[] timers = new int[12]; // define 12 timers to pace the capacitive touch inputs

float[] volumeLevels = {0.5, 0.75, 1.0}; // possible volume levels to switch between, possible values are from 0 to 1
int currentVolumeIndex = 0;
float currentVolume;

int currentMode; // Used for switching between oscillators: 0 - Sine, 1 - Square, 2 - Triangle oscillator

// An index to count up the notes
int note = 0; 

// For drawing the keyboard keys
int keyWidth;

void setup() {
  size(640, 260);
  background(255);

  touch = new MPR121("i2c-1", 0x5a); // Read capacitive touch from MPR121 using its default address

  // Create Sine, Square and Trianle oscillators
  sinOsc = new SinOsc(this);
  sqrOsc = new SqrOsc(this);
  triOsc = new TriOsc(this);

  // Create the envelope 
  env  = new Env(this);

  currentVolume = volumeLevels[currentVolumeIndex];
  currentMode = 0; // set the default oscillator to Sine

  // Initialize the timers
  for (int i = 0; i < timers.length; i++) {
    timers[i] = 0;
  }

  // To display keys, split the width of the screen into equal sections
  keyWidth = width / notes.length;
}

void draw() {
  background(255);
  fill(0);
  stroke(128);

  touch.update(); // get readings from the MPR121 I2C sensor

  for (int i=0; i < 8; i++) {
    if (touch.touched(i)) {
      drawKey(i);
    }
  }

  // electrodes 0 to 7 make up the keyboard of the instrument
  for (int i=0; i < 12; i++) {
    if (touch.touched(i) && millis() - timers[i] > duration) {

      // Touching electrode 8 toggles between the volume levels defined in volumeLevels array
      if (i == 8) {
        currentVolumeIndex++;
        if (currentVolumeIndex > volumeLevels.length - 1) {
          currentVolumeIndex = 0;
        }
        currentVolume = volumeLevels[currentVolumeIndex];
      }

      // Touching electrodes 9, 10, 11 sets one of the oscillators as currently active
      if (i == 9) {
        currentMode = 0;
      }

      if (i == 10) {
        currentMode = 1;
      }

      if (i == 11) {
        currentMode = 2;
      }

      // Touching electrodes 0 to 8 triggers musical notes and displays which note is being played
      if (i >= 0 && i < notes.length) {
        playNote(i);
      }

      timers[i] = millis();
    }
  }
} 

void drawKey(int index) {
  rect(index * keyWidth, 0, keyWidth, height);
}

// Play a note, using the oscillator that is currently active, with volume level established by the volume toggle switch
void playNote(int index) {
  switch(currentMode) {
  case 0: 
    sinOsc.play(notes[index], currentVolume);
    // The envelope gets triggered with specific oscillator as input, with durations and volume level defined earlier
    env.play(sinOsc, attackTime, sustainTime, currentVolume, releaseTime);
    break;
  case 1: 
    sqrOsc.play(notes[index], currentVolume);
    env.play(sqrOsc, attackTime, sustainTime, currentVolume, releaseTime);
    break;
  case 2:
    triOsc.play(notes[index], currentVolume);
    env.play(triOsc, attackTime, sustainTime, currentVolume, releaseTime);
    break;
  }
}

```
     
## Next Steps

- Connect knobs and buttons, link to previous tutorial
- Add lights