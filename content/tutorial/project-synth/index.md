---
title: "Project 01 - Visual Synthesizer"
date: 2018-06-14T15:43:48+08:00
lastmod: 2018-06-27T10:50:48+08:00
draft: false
tags: ["synth", "gpio", "buttons", "raspberry pi"]
categories: ["hardware"]
author: "Maksim Surguy"

---

# Introduction:
  
Integrating low cost hardware components with Processing software paves the way for creating compelling human-computer interactions. Processing’s ease of use to create visual representations and Raspberry Pi’s established ecosystem make this combination a perfect match for education, arts and science.

{{< figure src="processingwithpi.jpg" link="processingwithpi.jpg" title="Processing running on Raspberry Pi" >}} 
  
The visual synthesizer (synth) project aims to introduce you to combining interactive features of Processing with access to the physical world through the input / output capacity of the Raspberry Pi and a few additional hardware components.

In this project, a few physical buttons are connected to a Raspberry Pi. A person pressing the buttons affects the followings parameters of objects inside of a Processing sketch that's running on the Pi:

- Size
- Position
- Color
- Opacity
- Speed

Depending on which buttons are pressed, unique combinations of interactions can be generated, as shown in the video of the final sketch of this tutorial:

**Video of the visual synth sketch running on Raspberry Pi:**

<video class="center" controls muted="" loop="" width="400"><source src="synth-demo.mp4" type="video/mp4"></video>
  
By following the steps below you will get an overall understanding of how to use Raspberry Pi and Processing together to create an interactive experience. Using this knowledge, you could create more complex interactive systems or modify your existing Processing sketches to work with hardware described in this tutorial.

## Concepts covered:

The concepts introduced throughout this project are:

- Circuit diagrams
- Breadboard prototypes
- Accessing General Purpose Input/Output pins of Raspberry Pi using official Processing GPIO library
- Using push buttons with Processing

# Getting started

In order to get started, you would need a Raspberry Pi with Processing [installed](https://pi.processing.org/get-started/) and running on it. The code shown in this tutorial needs to run on Raspberry Pi in order to work with the hardware pins of the Pi. The tutorial is written for users with various backgrounds so please keep that in mind as you replicate the project.


{{% message type="warning" title="Warning!" %}}
If this is your first time connecting hardware components together, be sure to read the instructions carefully and follow all safety guidelines mentioned here. We cannot be held liable in case your hardware gets damaged.
{{% /message %}}

With that, let's gather the components!

## Project Materials:

In order to complete this tutorial, you would need the following:

- Raspberry Pi 2, 3, 3B+ or Pi Zero with OS installed
- TV or any HDMI screen / monitor
- 1-5 push buttons
- Breadboard
- Wires

## Background information:

Need to know in order to follow the tutorial:
- circuit diagrams
- how to read the schematics
- how to connect components on a breadboard

{{% message %}}
Depending on your experience with hardware, following this tutorial might require looking up some terms and concepts. Don't be afraid to ask questions on the 
[Processing Forum](https://discourse.processing.org/c/processing-pi) 
{{% /message %}}

GPIO introduction
How many pins are usable
What are the other pins?

{{< figure src="raspberry-pi-3-with-pins.jpg" width="500" link="raspberry-pi-3-with-pins.jpg" title="Raspberry Pi input/output pins (GPIO)" >}}  

## What's in a button?

How is the button made, how does it show up on a circuit? What are the various buttons out there?

{{% message title="Button? Pushbutton? Microswitch?" %}}
There are a few names for the same thing. "Pushbutton", "Momentary switch", "Momentary push button", "Microswitch" are all valid names for a button.
{{% /message %}}

Normally Closed
Normally Open buttons

# Making the visual synth

The steps to make the synth:
1. Make single button work
2. Add more buttons

## Getting a single button to interact with Processing

Explain the input/ output pins and designation

{{< figure src="Project1-sketch-basic-button_schem.jpg" link="Project1-sketch-basic-button_schem.jpg" title="Schematics of a single Button connected to Pin 4 of RPI GPIO" >}}  
  
{{< figure class="center" src="Project1-sketch-basic-button_bb.jpg" width="400" link="Project1-sketch-basic-button_bb.jpg" title="Single Button connected to Pin 4 of RPI GPIO" >}}


{{< figure src="button-state-sk_01_ellipse.jpg" link="button-state-sk_01_ellipse.jpg" title="Single button actuating fill in a circle" >}}


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


{{< figure src="button-state-sk_01.jpg" link="button-state-sk_01.jpg" title="Single button actuating grow/shrink cycle of a circle" >}}  


## Adding more buttons


{{< figure class="center" src="Project1-sketch1_bb.png" link="Project1-sketch1_bb.png" title="Multiple Buttons connected to GPIO pins of RPI (click to enlarge)" >}}

  

{{< figure src="button-states-sk_03.jpg" class="border" link="button-states-sk_03.jpg" title="Mapping of buttons modifying object's attributes" >}} 

## Making clean code



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

# Next Steps

# Resources

- https://github.com/splitbrain/rpibplusleaf
- GPIO labeling: https://www.raspberrypi-spy.co.uk/2012/06/simple-guide-to-the-rpi-gpio-header-and-pins/#prettyPhoto
- https://github.com/DotNetToscana/IoTHelpers/wiki/Raspberry-Pi-2-and-3-Pinout
- https://pinout.xyz