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

{{< figure src="processing-capacitive-touch.jpg" link="processing-capacitive-touch-new.jpg" title="Using Capacitive Touch in Processing" >}} 

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

## Using I<sup>2</sup>C interface in Processing on Raspberry Pi

Raspberry Pi and similar single board computers support I<sup>2</sup>C interface for communicating with a wide variety of affordable integrated circuits (ICs) and peripherals that support I<sup>2</sup>C protocol. This protocol is very robust and is convenient because:

* It requires only two wires for data exchange
* Multiple devices using the protocol can share one set of wires connected in parallel
* It is an interface for one host to talk to different peripherals
* It uses addresses, so that the host can talk to a specific device 

{{% message type="focus" title="Can I connect multiple I<sup>2</sup>C devices together?" %}}
Yes! I<sup>2</sup>C interface supports many I<sup>2</sup>C devices whose SDA, SCL and power pins are connected in parallel. Each I<sup>2</sup>C integrated circuit has a factory-configured internal address (such as 0x5A for MPR121 sensor) that in most cases can be changed by connecting pins on the integrated circuit according to its datasheet. **Each device connected to the I<sup>2</sup>C bus should have unique address in order to work with Processing or other software.**
{{% /message %}}


How is this interface used in practice? Let's say you have an IC that is I<sup>2</sup>C compatible. You'd identify 4 pins necessary to connect it to the Raspberry Pi's I<sup>2</sup>C pins:

- Positive power (+3.3V)
- Ground
- Serial Clock (SCL)
- Serial Data (SDA)

Then, connect those pins as follows:

{{< figure src="rpi-i2c.png" link="rpi-i2c.png" width="500" title="Connecting I<sup>2</sup>C device (chip) to a Raspberry Pi" >}} 

With this connection in place, you can use the I<sup>2</sup>C interface on Raspberry Pi to communicate with the I<sup>2</sup>C device. The I<sup>2</sup>C interface is supported in Processing via Hardware I/O library's I<sup>2</sup>C class documented here: [Hardware I/O I2C Reference](https://processing.org/reference/libraries/io/I2C.html).

To make Processing compatible with a wide variety of I<sup>2</sup>C devices on single board computers, the Hardware I/O library comes with a few useful examples (listed [on Github](https://github.com/processing/processing/tree/master/java/libraries/io/examples) or under "Examples > Libraries > Hardware I/O" within PDE):

- BME280 Temperature, Pressure and Humidity sensor
- MCP4725 Digital to Analog Converter (DAC)
- TSL2561 Luminosity/Lux/Light sensor
- PCA9685 PWM/Servo Driver
- MPR121 Touch sensor
- HMC6352 Compass
- SSD1306 OLED Display

{{% message type="focus" title="What about other I<sup>2</sup>C peripherals?" %}}
If there's some I<sup>2</sup>C peripheral that's not within Processing examples, it is possible to create a new integration for it by consulting the peripheral's datasheet or by looking at existing implementations, for example Adafruit's [Arduino libraries](https://github.com/adafruit), [Pi4J](http://pi4j.com/) libraries and similar. [Contributions](https://github.com/processing/processing) are welcome!  
{{% /message %}}

In this tutorial, we'll make use of MPR121 touch sensor example code and build on top of it to make something interesting! Now that you have some idea of how the capacitive sensing works and how to connect an I<sup>2</sup>C peripheral, let's have a quick overview of how to generate sound in Processing.

## Generating sound in Processing

Processing is capable of playing music, generating and analyzing sounds through the use of one of the built-in or external sound libraries. In this tutorial, we'll be using the New [Sound Library](https://github.com/kevinstadler/processing-sound) by Kevin Stadler that was written as a part of Google Summer of Code 2018 and will replace built-in Processing Sound Library at the end of August 2018.

You can download the new Sound Library from the Releases section on Github: [kevinstadler/processing-sound/releases](https://github.com/kevinstadler/processing-sound/releases)

With the library installed, feel free to take a look at some of the examples included with it. We will use the concepts of "oscillators" and "envelopes" from the new sound library to synthesize various sounds.

{{% message title="Concepts used to synthesize sound in Processing" %}}
While a lot of the concepts behind generating sound from Processing using the sound library go outside of the scope of this tutorial, you can take a look at an excellent tutorial that is a part of the book titled "Processing: A Programming Handbook for Visual Designers and Artists" and is available online: https://processing.org/tutorials/sound/
{{% /message %}}

Now that we have the main components and concepts covered, let's get to making your own capacitive touch musical interface!

# Making the capacitive touch musical interface

In the course of the next steps of this tutorial, you'll gradually build a synthesizer with a custom capacitive touch interface. To get there, we will first connect the MPR121 sensor to Raspberry Pi, visualize its readings in a Processing sketch, learn to synthesize sounds via the sound library, and finally, put everything together! 

I used sticky backing copper tape to create the following keyboard layout, but of course you'll be free to make your own arrangement:

{{< figure src="complete-keyboard.jpg" link="complete-keyboard.jpg" title="Example of a keyboard layout made with copper tape" >}} 

Here's the suggested order of the steps to build your custom synthesizer: 

1. Connecting MPR121 sensor breakout board
2. Using an example sketch to create visual representation of the touch sensor state
3. Responding to touch by synthesizing sounds  
4. Using advanced features of MPR121 sensor to affect pitch 
5. Putting everything together

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

For now, you can just connect 2-3 breadboarding wires to the first few electrode pins of the MPR121 breakout board.

### Tips on what to use for the electrodes
What can you use to make the electrodes? Basically anything that conducts electricity to some degree should work well. Here's a list of some things you can try with MPR121 sensor:

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

The creative freedom that sensors like MPR121 provide is unmatched. The ways by which you can communicate physical interaction with Processing using this sensor will be up to your imagination! Let's experiment with reading the MPR121 sensor data in the next steps.

## 2. Visualizing the state of MPR121 sensor

First, let's try one of the built-in examples to visualize which electrodes are being touched. The `Touch_I2C_MPR121` example sketch mentioned above has some starter code that we will use for the next steps of the tutorial. Please find and open this sketch:

{{< figure src="screenshot-hw-examples.jpg" link="screenshot-hw-examples.jpg" width="300" class="center border" title="Built-in sketch that works with MPR121 sensor" >}} 

When you run this sketch, you'll see the white dots on the screen, representing the state of each electrode connected to the MPR121 sensor:

{{< figure src="touch-example-sketch.png" link="touch-example-sketch.png" class="" width="300" title="Built-in sketch for MPR121 sensor" >}} 

When you touch the makeshift electrodes (breadboarding wires) connected to the pins of MPR121 sensor, you should start seeing the updates in the Processing sketch:

(TODO: GIF of the MPR121 sketch goes here)

{{% message type="warning" title="Resetting the MPR121 sensor" %}}
Every time you run the Processing sketch using the MPR121 sensor, the sensor state is reset in the following way:

- The current reading of the capacitance of each of the electrodes is being taken as the "baseline" reading of those electrodes
- The sampling interval is set to 1ms instead of chip's default 16ms
- Sampling will be started and will continue until the Raspberry Pi is unplugged from power
    
Whenever you need to connect a new type of electrode (let's say you switch from breadboard wires to wires with alligator clips), you need to restart the sketch so that the baseline value is updated.   
{{% /message %}}

Now that you understand the basics of how the MPR121 sensor works, let's use it to make sound via the sound library!

## 3. Synthesizing sound using the sound library

The [sound library](https://github.com/kevinstadler/processing-sound) comes with many great examples, specifically on how to synthesize sound using oscillators. Let's take one of these examples and make it work with MPR121 touch sensor. 

For now, we will be working with the `SawWave` oscillator and you can check out the example of using it in "Contributed Libraries -> Sound -> Oscillators -> SawWave.pde" sketch. That example sketch synthesizes a continuous sound that you can affect by moving the mouse on the screen. The main part of that sketch is the initialization of the oscillator, calling `.play()` on it and specifying the frequency of the oscillation:

```processing
import processing.sound.*;

SawOsc saw;

void setup() {
    ...
    // Create the sine oscillator and start synthesizing sound
    saw = new SawOsc(this);   
    saw.play();
}

void draw() {
    // Map mouseY from 0.0 to 1.0 for amplitude
    saw.amp(map(mouseY, 0, height, 1.0, 0.0));

    // Map mouseX from 20Hz to 1000Hz for frequency  
    saw.freq(map(mouseX, 0, width, 80.0, 200.0));
}
```

We will modify that sketch to change the amplitude of the sound generated by the library depending on whether the first electrode connected to MPR121 sensor is touched or not (instead of using vertical position of the mouse). 

To get a reading from MPR121 sensor and determine whether a certain electrode is being touched or not, we need to do two things: ask the sensor to update its state by issuing a call to `.update()` within the `draw()` function and ask about the state of specific electrode on MPR121 by issuing a `.touched(N)` where N is the pin number we care about (can be 0-11).

Let's put the sound synthesis and touch sensor operations together by increasing the amplitude of the sound when the first electrode of the MPR121 is touched:   

{{< figure src="mprosc.png" class="center" link="mprosc.png" title="Interaction of MPR121 sensor and an oscillator" >}} 

The code below shows how you would combine the sound library and the MPR121 sensor to modify the amplitude of the synthesized sound:

```processing
/**
 * This is a combination of saw wave oscillator example of the sound library and MPR121 example from I/O Hardware Library.
 * Touching pin 0 of the MPR121 sets the volume of the oscillator to 100%, while not touching sets it to 50%
 */

import processing.sound.*;
import processing.io.*;

MPR121 touch; // define MPR121 I2C capacitive touch sensor

SawOsc saw;

void setup() {
  size(640, 360);
  background(255);

  touch = new MPR121("i2c-1", 0x5a); // Read capacitive touch from MPR121 using its default address

  // Create and start the saw oscillator.
  saw = new SawOsc(this);
  saw.play();
  // Make the saw oscillator to be at half volume
  saw.amp(0.5);
}

void draw() {
  touch.update(); // get readings from the MPR121 I2C sensor

  // If electrode 0 is touched, set the volume to 100%, otherwise set it to 50%
  if (touch.touched(0)) {
    saw.amp(1.0);
  } else {
    saw.amp(0.5);
  }

  // Map mouseX from 20Hz to 1000Hz for frequency
  float frequency = map(mouseX, 0, width, 20.0, 1000.0);
  saw.freq(frequency);
}
```

Currently the frequency of the sound generated by the oscillator is set by the horizontal coordinate of the mouse. What if you wanted to affect the frequency of the sound by the position of your finger on the electrode that's being touched? MPR121 Class provides us with `analogRead(pin)` function that returns the capacitance value of a specific electrode.   

## 4. Using `analogRead()` to affect pitch 

Besides detecting whether some electrode is being touched or not, MPR121 class provides some additional features like:

- returning raw capacitance value via `analogRead(channel)` function
- returning raw capacitance value substracted from baseline value via `analogReadBaseline(channel)` function

(TODO: get some measurements of the output of each function and be more specific about how the two are different)

When the electrode connected to the MPR121 sensor is being touched, the capacitance value measured by MPR121 can be different depending on where exactly the electrode is being touched. Because of this behavior, `analogRead()` and `analogReadBaseline` can be used to add some more control of the Processing sketch. For example, we can add some variation within the frequencies of the sound generated by the oscillators.  

TODO: add some graphic about how touching different parts of the electrode can change capacitance (this needs to be tested first)

Let's use the `analogRead()` function of the MPR121 class to make something that functionally resembles a pitch wheel on a synthesizer. Using the last sketch of this tutorial, we will change the default frequency of the oscillator from mouse-position dependent to finger-position dependent:

```processing

// Old (using horizontal mouse position):
float frequency = map(mouseX, 0, width, 20.0, 1000.0);
saw.freq(frequency);

// New (using touch.analogRead on pin 0):
float frequency = map(touch.analogRead(0), 0, 200, 100.0, 1000.0);
saw.freq(frequency);
```

With this simple change, the frequency of the sound will be changed depending on how far along the electrode the touch is occurring. Try experimenting by moving the finger along the electrode and listen to the changing sound!

## 5. The Final Sketch

Now that you have good understanding of interfacing with MPR121 touch sensor and using the sound library to synthesize sound, let's create a custom musical interface that incorporates all of those concepts. 

Here's what we will do:

- Decide on what to use for the electrodes
- Envision how the musical interface will look like
- Connect the MPR121 sensor to the electrodes
- Make a Processing sketch

For my musical interface, I'm using some sticky copper foil tape. 

Todo: make an interface and code sketch that's more unique than piano

Todo: Note frequency explanation

{{< figure src="piano-key-frequency.png" class="center"  link="piano-key-frequency.png" title="Frequency of the piano notes in the fourth octave, in Hz" >}} 
       
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