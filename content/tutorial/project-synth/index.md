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

## Project Materials:

- Raspberry Pi 2, 3, 3B+ or Pi Zero
- TV or any HDMI screen / monitor
- 4-10 push buttons
- Breadboard
- Wires

## Circuit - SYNTH:C01

{{< figure src="Project1-sketch-basic-button_schem.jpg" link="Project1-sketch-basic-button_schem.jpg" title="Schematics of a single Button connected to Pin 4 of RPI GPIO" >}}  
  
{{< figure class="center" src="Project1-sketch-basic-button_bb.jpg" width="400" link="Project1-sketch-basic-button_bb.jpg" title="Single Button connected to Pin 4 of RPI GPIO" >}}

{{< figure class="center" src="Project1-multiple-buttons_bb.jpg" link="Project1-multiple-buttons_bb.jpg" title="Multiple Buttons connected to GPIO pins of RPI (click to enlarge)" >}}
  
## Processing Sketch - SYNTH:SK01

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

{{< figure class="center border" src="synth.jpg" width="600" link="synth.jpg" title="Demo of the Visual Synth" >}}

# Next Steps

# Resources

- https://github.com/splitbrain/rpibplusleaf
- GPIO labeling: https://www.raspberrypi-spy.co.uk/2012/06/simple-guide-to-the-rpi-gpio-header-and-pins/#prettyPhoto
- https://github.com/DotNetToscana/IoTHelpers/wiki/Raspberry-Pi-2-and-3-Pinout
- https://pinout.xyz