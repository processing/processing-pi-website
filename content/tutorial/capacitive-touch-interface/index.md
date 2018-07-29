---
title: "Capacitive Touch Interface"
date: 2018-07-14T15:43:48+08:00
lastmod: 2018-07-14T16:50:48+08:00
draft: false
weight: 20
tags: ["sensor", "input","capacitivetouch"]
categories: ["hardware"]
author: "Maksim Surguy"
---

# Introduction

Would you like to escape the use of conventional input methods such as keyboard and mouse for interacting with your Processing sketches? You can make the interactivity within your artwork a lot more interesting by using capacitive touch sensing. 

Capacitive touch sensing works by means of continuously measuring changes in capacitance of certain points of contact (electrodes) within a specially-designed circuit. Human body acts as an electrical insulator, capable of changing electrical capacitance of a circuit when touching the electrodes and this change in capacitance can be captured by a sensor. There are many devices that use this technology in one form or another. Touchscreens and touchpads use capacitive touch sensing to detect the position and proximity of fingers interacting with them. 

In context of creative programming and physical computing, capacitive touch sensing can serve as a unique alternative to buttons because it enables the use of arbitrary shapes and sizes of conductive surfaces to act as inputs.

{{% message title="How is this different from using buttons?" %}}
Circuits using capacitive touch sensing do not require physical buttons. The button is replaced with anything that can conduct electricity. Introducing human touch into a **specially designed circuit** changes the electrical properties of that circuit, enabling detection of presence, and in some cases, proximity of human touch. 
{{% /message %}}

With addition of an inexpensive capacitive touch integrated circuit (IC) such as MPR121, your Raspberry Pi can become a breeding ground for new interaction ideas.

(TODO: Video of various conductive materials activating changes in Processing sketch)

{{< figure src="processing-capacitive-touch-new.jpg" link="processing-capacitive-touch-new.jpg" title="Using Capacitive Touch in Processing" >}} 

In the context of this project, merely detecting when something conductive is touched or not touched by a human can enable us to make some new forms of interaction. Take a look at the example below to see how capacitive touch can be used with Processing to make a custom musical interface:

(TODO: Video of the final sketch example can go here)

Excited to try this out? Let's take a look at what you'll need to make use capacitive touch in your sketches!

## Project materials:

To build a capacitive touch musical interface or a similar input device, you would need to acquire a capacitive touch IC, specifically MPR121 that is available from [Adafruit](https://www.adafruit.com/product/1982), eBay or other vendors for under $10. Here's a full list of materials that you would need to have:

- a Raspberry Pi model 3+, 3 or 2 (those are recommended, it will work the Pi Zero and older versions, albeit much more slowly) with Processing [installed](https://pi.processing.org/get-started/)
- TV or any screen / monitor with HDMI input
- MPR121 12-key Capacitive Touch Sensor Breakout
- Copper tape or any other conductor to create capacitive touch electrodes
- Headphones or a speaker with integrated amplifier
- Alligator clips or soldering iron with solder depending on what material for the electrodes you'll be using
- Breadboard
- Wires

With these components on hand, let's take a look how to take advantage of using a special hardware interface (I<sup>2</sup>C) to communicate with MPR121 capactive touch sensor.

## I<sup>2</sup>C interface on Raspberry Pi

Raspberry Pi and similar single board computers support I<sup>2</sup>C interface for communicating with a wide variety of affordable microcontrollers that support I<sup>2</sup>C protocol. According to a [Sparkfun tutorial](https://learn.sparkfun.com/tutorials/i2c) on I<sup>2</sup>C: 

> The Inter-integrated Circuit (I<sup>2</sup>C) Protocol is a protocol intended to allow multiple “slave” digital integrated circuits (“chips”) to communicate with one or more “master” chips. Like the Serial Peripheral Interface (SPI), it is only intended for short distance communications within a single device. Like Asynchronous Serial Interfaces (such as RS-232 or UARTs), it only requires two signal wires to exchange information.

How is this interface used in practice? Let's say you have a microcontroller that is I<sup>2</sup>C compatible. You'd identify 4 pins necessary to connect it to the Raspberry Pi's I<sup>2</sup>C pins:

- Positive power (+3.3V)
- Ground
- Serial Clock (SCL)
- Serial Data (SDA)

Then, connect those pins as follows:

{{< figure src="rpi-i2c.png" link="rpi-i2c.png" width="500" title="Connecting I<sup>2</sup>C device (chip) to a Raspberry Pi" >}} 

With this connection in place, you can use the I<sup>2</sup>C interface on Raspberry Pi in software and specifically, in Processing. The I<sup>2</sup>C interface is supported in Processing via Hardware I/O library's I<sup>2</sup>C class documented here: [Hardware I/O I2C Reference](https://processing.org/reference/libraries/io/I2C.html).

{{% message type="focus" title="How many I<sup>2</sup>C devices can I use simultaneously?" %}}
I<sup>2</sup>C interface supports many I<sup>2</sup>C devices whose SDA, SCL and power pins are connected in parallel. Each I<sup>2</sup>C device has a factory-configured internal address that in most cases can be changed via pins on the microcontroller according to its datasheet. **Each device connected to the I<sup>2</sup>C bus should have unique address in order to work with Processing or other software.**
{{% /message %}}

To make Processing compatible with a wide variety of I<sup>2</sup>C devices on single board computers, the Hardware I/O library comes with a few useful examples (listed [on Github](https://github.com/processing/processing/tree/master/java/libraries/io/examples) or under "Examples" within PDE):

- BME280 Temperature, Pressure and Humidity sensor
- MCP4725 Digital to Analog Converter (DAC)
- TSL2561 Luminosity/Lux/Light sensor
- PCA9685 PWM/Servo Driver
- MPR121 Touch sensor
- HMC6352 Compass
- SSD1306 OLED Display

In this tutorial, we'll make use of MPR121 touch sensor example code and build on top of it to make something interesting!

## Generating sound in Processing

Processing is capable of playing music, generating and analyzing sounds through the use of one of the built-in or external sound libraries:

- Processing 3.x built-in [Sound Library](https://processing.org/reference/libraries/sound/index.html
)
- New [Sound Library](https://github.com/kevinstadler/processing-sound) by Kevin Stadler
- [Minim](https://github.com/ddf/Minim) by Damien Di Fede and Anderson Mills

In this tutorial, we'll be using the new Sound Library by Kevin Stadler that will replace built-in Processing Sound Library at the end of August 2018. 

We will use "oscillators" and "envelopes" from the new sound library to synthesize various sounds.

{{% message title="Concepts used to synthesize sound in Processing" %}}
While the concepts behind generating sound from Processing using the sound library go outside of the scope of this tutorial, you can take a look at another excellent tutorial that is a part of the book titled "Processing: A Programming Handbook for Visual Designers and Artists" and is available online: https://processing.org/tutorials/sound/
{{% /message %}}

Now that we have the main components and concepts covered, let's get to making your own capacitive touch keyboard!

# Making the capacitive touch keyboard

In the course of the next steps of this tutorial, you'll gradually build a capacitive touch synthesizer. To get there, we will first connect the MPR121 sensor to Raspberry Pi, visualize its readings in a Processing sketch, learn to respond to the sensor readings using the sound library, and finally, put all of the prior knowledge together to make a sound synthesizer with eight keys, three different modes and a volume toggle. 

I used sticky backing copper tape to create the following keyboard layout, but of course you'll be free to make your own arrangement:

{{< figure src="complete-keyboard.jpg" link="complete-keyboard.jpg" title="Example of a keyboard layout made with copper tape" >}} 

Here's the suggested order of the steps: 

1. Connecting MPR121 sensor breakout board
2. Making a sketch to create visual representation of the keyboard
3. Making a sketch for synthesizing a single sound  
4. Modifying the sketch to synthesize multiple sounds
5. Adding volume and mode toggles
6. Final Sketch

Let's connect the capacitive touch sensor to the Raspberry Pi!

## 1. Connecting MPR121 capacitive touch sensor

MPR121 is I<sup>2</sup>C capable microcontroller, and like any I<sup>2</sup>C chip, it can be easily connected to Raspberry Pi via four wires:

- Power pin (3.3V)
- Ground pin
- SDA pin
- SCL pin 

Below you'll find a diagram of how to connect the MPR121 breakout board to Raspberry Pi:

{{< figure src="mpr121-inputs-cropped.png" link="mpr121-inputs-cropped.png" title="Connecting MPR121 breakout board to a Raspberry Pi" >}} 

When the MPR121 board is connected to the Raspberry Pi, you can start experimenting with making and connecting the electrodes that you'll use to interact with the rest of the Processing sketches in this tutorial. For the final sketch of this tutorial, you'll need all 12 electrodes to be connected to the MPR121 board but you don't need all 12 right now. 

### Tips on what to use for the electrodes
What should you use to make the electrodes? Basically anything that conducts electricity to some degree should work well. Here's a list of some things you can try with MPR121 sensor:

- Wires
- Printed Circuit Boards
- Copper / Aluminum foil
- Fruit
- Vegetables
- Salt water
- Tap water
- Conductive tape
- Conductive thread
- Conductive fabric
- Conductive 3D printer filament(!)

{{% message type="focus" title="Experimenting with electrode materials" %}}
To make experimenting easier, you can use wires with alligator clips. Connect the wires to the pins marked as "Electrodes" and use the alligator clips to connect various materials for quick testing.
{{% /message %}}

The creative freedom that sensors like MPR121 provide is unmatched. The ways by which you can communicate physical interaction with Processing using this sensor will be up to your imagination! Let's experiment with various electrode types and make some Processing sketches in the next steps! 

## 2. Visualizing a keyboard

Let's try one of the built-in examples to visualize which electrodes are being touched. The `Touch_I2C_MPR121` example sketch mentioned above has some starter code that we will use for the next steps of the tutorial. Please find and open this sketch:

{{< figure src="screenshot-hw-examples.jpg" link="screenshot-hw-examples.jpg" width="300" class="center border" title="Built-in sketch that works with MPR121 sensor" >}} 

When you run this sketch, you'll see the white dots on the screen, representing the state of each electrode connected to the MPR121 sensor:

{{< figure src="touch-example-sketch.png" link="touch-example-sketch.png" class="" width="600" title="Built-in sketch for MPR121 sensor" >}} 

*Touch_I2C_MPR121.pde*
```processing
/*

This sketch reacts to presence of touch on the electrodes of the MPR121 sensor.
The electrodes that are touched will look like piano keys 

 */

import processing.io.*;
MPR121 touch; // define MPR121 I2C capacitive touch sensor

// Variables used for drawing the keys of the keyboard
int keyWidth;
int keyCount = 12; // Specify the number of touch electrodes used for the keyboard

void setup() {
  size(640, 260);
  background(255);

  // Initialize MPR121 sensor using its default address
  touch = new MPR121("i2c-1", 0x5a); 

  // To show the keys, split the width of the screen into equal sections
  keyWidth = width / keyCount;
}

void draw() {
  background(255);
  fill(0);
  stroke(128);

  touch.update(); // get readings from the MPR121 I2C sensor

  for (int i = 0; i < keyCount; i++) {
    if (touch.touched(i)) {
      // Draw a rectangle to mark the key that is pressed
      rect(i * keyWidth, 0, keyWidth, height);
    }
  }
} 
```

## 3. Synthesizing a single sound

{{< figure src="piano-key-frequency.png" link="piano-key-frequency.png" title="Frequency of the piano notes in the fourth octave, in Hz" >}} 


```processing
import processing.sound.*;
import processing.io.*;
MPR121 touch; // define MPR121 I2C capacitive touch sensor

SinOsc sinOsc; // Sine oscillator
Env env; // envelope used to create Attack-Sustain-Release profile 

// Durations for the Attack-Sustain-Release(ASR) envelope
float attackTime = 0.001;
float sustainTime = 0.004;
float releaseTime = 0.5; // essentially, duration of the note

int duration = 250; // duration between consecutive repetition of the same note 
int timer;

void setup() {
  size(640, 260);
  background(255);

  touch = new MPR121("i2c-1", 0x5a); // Read capacitive touch from MPR121 using its default address

  // Create Sine, Square and Trianle oscillators
  sinOsc = new SinOsc(this);

  // Create the envelope 
  env  = new Env(this);

  timer = 0;
}

void draw() {
  background(255);

  touch.update(); // get readings from the MPR121 I2C sensor
  
  // electrodes 0 to 7 make up the keyboard of the instrument
  if (touch.touched(0) && millis() - timer > duration) {
    sinOsc.play(440, 1.0);
    // The envelope gets triggered with specific oscillator as input, with durations and volume level defined earlier
    env.play(sinOsc, attackTime, sustainTime, 1.0, releaseTime);
    timer = millis();
  }
} 
```

## 4. Synthesizing multiple sounds


## 5. Adding volume and mode toggles



## 6. The Final Sketch
       
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