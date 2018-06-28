---
title: "Project 01 - Visual Synthesizer"
date: 2018-06-14T15:43:48+08:00
lastmod: 2017-06-14T15:43:48+08:00
draft: false
tags: ["synth", "gpio", "buttons", "raspberry pi"]
categories: ["hardware"]
author: "Maksim Surguy"

---

# Introduction:
  
Integrating low cost hardware components with Processing software paves the way for creating compelling human-computer interactions. Processing’s ease of use to create visual representations and Raspberry Pi’s established ecosystem make this combination a perfect match for education, arts and science.

{{< figure src="processingwithpi.jpg" link="processingwithpi.jpg" title="Processing running on Raspberry Pi" >}} 
  
The visual synthesizer (synth) project aims to introduce you to combining interactive features of Processing with access to the physical world through the input / output capacity of the Raspberry Pi and a few additional hardware components.

**Video Demo of the visual synth**

<video controls muted="" loop="" width="400"><source src="synth-demo.mp4" type="video/mp4"></video>
  
By following the steps below you will get an overall understanding of how to use Raspberry Pi and Processing together to create interactive experiences. Using this knowledge, you could create more complex interactive systems or modify your existing Processing sketches to work with synth-like hardware.

## Concepts covered:

The concepts introduced throughout this project are:

- Circuit diagrams
- Breadboard prototypes
- Accessing General Purpose Input/Output pins of Raspberry Pi using official Processing GPIO library
- Enabling interactivity by using hardware interfaces such as I<sup>2</sup>C
- Overview of Analog to Digital conversion (ADC)

## Getting started

# Part 1 : Synth-Buttons

## Background information:

{{< figure src="raspberry-pi-3-with-pins.jpg" width="500" link="raspberry-pi-3-with-pins.jpg" title="Raspberry Pi input/output pins (GPIO)" >}}  

## Project Materials:

- Raspberry Pi 2, 3, 3B+ or Pi Zero
- TV or any HDMI screen / monitor
- 4-10 push buttons
- Breadboard
- Wires

## Circuit - SYNTH:C01


{{< figure src="Project1-sketch-basic-button_schem.jpg" link="Project1-sketch-basic-button_schem.jpg" title="Schematics of a single Button connected to Pin 4 of RPI GPIO" >}}  
  
{{< figure class="center" src="Project1-sketch-basic-button_bb.jpg" width="400" link="Project1-sketch-basic-button_bb.jpg" title="Single Button connected to Pin 4 of RPI GPIO" >}}

{{< figure class="center" src="Project1-sketch1_bb.png" link="Project1-sketch1_bb.png" title="Multiple Buttons connected to GPIO pins of RPI (click to enlarge)" >}}
  
## Processing Sketch - SYNTH:SK01


{{< figure src="button-state-sk_01_ellipse.jpg" link="button-state-sk_01_ellipse.jpg" title="Single button actuating fill in a circle" >}}  

{{< figure src="button-state-sk_01.jpg" link="button-state-sk_01.jpg" title="Single button actuating grow/shrink cycle of a circle" >}}  

```processing
// Button event processing example

import processing.io.*;

// GPIO numbers refer to different phyiscal pins on various boards
// On the Raspberry Pi GPIO 4 is physical pin 7 on the header
// see setup.png in the sketch folder for wiring details

int buttonPin = 4;

void setup() {
  // INPUT_PULLUP enables the built-in pull-up resistor for this pin
  // left alone, the pin will read as HIGH
  // connected to ground (via e.g. a button or switch) it will read LOW
  GPIO.pinMode(buttonPin, GPIO.INPUT_PULLUP);
}

void draw() {
  // sense the input pin
  if (GPIO.digitalRead(buttonPin) == GPIO.LOW) {
    fill(255);
  } else {
    fill(204);
  }
  
  stroke(255);
  ellipse(width/2, height/2, width*0.75, height*0.75);
}

```

{{< figure src="button-states-sk_03.jpg" class="border" link="button-states-sk_03.jpg" title="Mapping of buttons modifying object's attributes" >}} 

```processing
// Import built-in Processing Hardware Library
import processing.io.*;

// Define an instance of the Circle object
Circle myCircle;

// Define the pins that will be reading button input
int[] pins = { 4, 17, 27, 22, 5 };

void setup() {
  size(400, 400);
  // Change the color mode of the sketch to HSB
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // INPUT_PULLUP enables the built-in pull-up resistor for this pin
  // left alone, the pin will read as HIGH
  // connected to ground (via e.g. a button or switch) it will read LOW

  // Set all pins in the pins array as inputs with pull up resistors enabled
  for (int i = 0; i < pins.length; i++) {
    GPIO.pinMode(pins[i], GPIO.INPUT_PULLUP);
  }

  // Create a circle in the middle of the screen 
  myCircle = new Circle(width / 2, height / 2, 100, 148);
}

void draw() {
  background(0); 

  // Set the speed of change within the circle modifiers
  myCircle.changeSpeed(0.06);

  // Determine if any or all of the buttons are pressed. If they are, modify attributes of the circle

  if (GPIO.digitalRead(pins[0]) == GPIO.LOW) {
    myCircle.pulsateSize();
  } 

  if (GPIO.digitalRead(pins[1]) == GPIO.LOW) {
    myCircle.pulsatePosition();
  } 

  if (GPIO.digitalRead(pins[2]) == GPIO.LOW) {
    myCircle.pulsateHue();
  } 

  if (GPIO.digitalRead(pins[3]) == GPIO.LOW) {
    myCircle.pulsateOpacity();
  }

  // Modify speed of the animation if the last button is being pressed
  if (GPIO.digitalRead(pins[4]) == GPIO.LOW) {
    myCircle.changeSpeed(0.12);
  } 

  // Increment the variable that tracks animation state
  myCircle.incrementT();
  // Draw the circle on the screen
  myCircle.display();
}

class Circle { 

  // These variables store the initial position of the circle
  float originalXpos;
  float originalYpos;
  // These store current position, possibly different from the original position
  float xpos;
  float ypos;
  // What is the possible deviation from the initial position, in pixels
  int orbitRange = 50;


  float originalDiameter;
  float diameter;
  int growthRange = 50;

  int opacity = 255;
  int opacityRange = 80;

  int originalHue;
  int hue;
  int hueRange = 80;

  float t = 0;
  float speed = 0.06;

  Circle(float tempXpos, float tempYpos, float tempDiameter, int tempHue) { 
    originalHue = tempHue;
    hue = originalHue;

    originalXpos = tempXpos;
    originalYpos = tempYpos;
    xpos = originalXpos;
    ypos = originalYpos;

    originalDiameter = tempDiameter;
    diameter = originalDiameter;
  }

  void incrementT() {
    t += speed;
  }

  void changeSpeed(float tempSpeed) {
    speed = tempSpeed;
  }

  void pulsateSize() {
    diameter = originalDiameter + growthRange * sin(t);
  }

  void pulsatePosition() {
    ypos = originalXpos + orbitRange * cos(t*2);
  }

  void pulsateOpacity() {
    opacity = int(170 + opacityRange * sin(t));
  }

  void pulsateHue() {
    hue = int(originalHue + hueRange * sin(t));
  }

  void display() {
    fill(hue, 100, 100, opacity); 
    ellipse(xpos, ypos, diameter, diameter);
  }
}
```

# Part 2 - Synth-Knobs

## Background information:

## Project Materials

- Raspberry Pi 2, 3, 3B+ or Pi Zero
- TV or any HDMI screen / monitor
- 4-10 push buttons
- Breadboard
- Wires
- Potentiometers
- Resistors
- ADS1115 Analog-to-digital (ADC) chip

## Circuit



## Processing Sketch

{{< figure class="center border" src="potentiometer-sketch.jpg" width="600" link="potentiometer-sketch.jpg" title="Simple Sketch demonstrating Potentiometer and Processing usage" >}}

{{< figure class="center border" src="synth-sketch.jpg" width="600" link="synth-sketch.jpg" title="Mapping of buttons and knobs to elements within Processing sketch" >}}


# Next Steps

# Resources

- https://github.com/splitbrain/rpibplusleaf
- GPIO labeling: https://www.raspberrypi-spy.co.uk/2012/06/simple-guide-to-the-rpi-gpio-header-and-pins/#prettyPhoto
- https://github.com/DotNetToscana/IoTHelpers/wiki/Raspberry-Pi-2-and-3-Pinout
- https://pinout.xyz