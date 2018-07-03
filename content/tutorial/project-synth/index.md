---
title: "Project 01 - Visual Synthesizer"
date: 2018-06-14T15:43:48+08:00
lastmod: 2018-06-27T10:50:48+08:00
draft: false
tags: ["synth", "gpio", "buttons", "raspberry pi"]
categories: ["hardware"]
author: "Maksim Surguy"

---

# Introduction
  
Integrating low cost hardware components with Processing software paves the way for creating compelling human-computer interactions. Processing’s ease of use to create visual representations and Raspberry Pi’s established ecosystem make this combination a perfect match for education, arts and science.
  
The visual synthesizer (synth) project aims to introduce you to combining interactive features of Processing with access to the physical world through the input / output capacity of the Raspberry Pi and a few additional hardware components.

In this project, a few physical buttons are connected to a Raspberry Pi. A person pressing these buttons can control the following parameters of objects inside of a Processing sketch that's running on the Pi:

- Size
- Position
- Color
- Opacity
- Speed

{{< figure src="button-states-sk_03.jpg" class="border" link="button-states-sk_03.jpg" title="Concept of Physical Buttons modifying Processing sketch attributes" >}} 

Depending on which buttons are pressed, various object parameters will be affected, as demonstrated in the video of the final sketch of this tutorial:

**Video of the visual synth sketch running on Raspberry Pi:**

<video class="center" controls muted="" loop="" width="400"><source src="synth-demo.mp4" type="video/mp4"></video>
  
By following the steps below you will get an overall understanding of how to use Raspberry Pi and Processing together to create an interactive experience. Using this knowledge, you could create more complex interactive systems or modify your existing Processing sketches to work with simple hardware described in this tutorial.

{{% message %}}
Depending on your experience with hardware, following this tutorial might require looking up some terms and concepts. Don't be afraid to ask questions on the 
[Processing Forum](https://discourse.processing.org/c/processing-pi) 
{{% /message %}}

## Concepts covered

The concepts described throughout this project are:

- Breadboard prototypes
- Accessing General Purpose Input/Output pins of Raspberry Pi using official Processing GPIO library
- Using push buttons with Processing

# Getting started

In order to get started, you would need a Raspberry Pi with Processing [installed](https://pi.processing.org/get-started/). The code shown in this tutorial needs to run within Processing Development Environment on the Raspberry Pi in order to work with the hardware pins of the Pi. The tutorial is written for users with various technical backgrounds so please keep that in mind as you replicate the project.

{{% message type="warning" title="Warning!" %}}
If this is your first time connecting hardware components together, be sure to read the instructions carefully and follow all safety guidelines mentioned here. Processing Foundation or contributors cannot be held liable in case your hardware gets damaged.
{{% /message %}}

With that, let's gather the components and get coding!

## Project Materials

In order to complete this tutorial, you would need the following items:

- Raspberry Pi 2, 3, 3B+ or Pi Zero with Processing [installed](https://pi.processing.org/get-started/)
- TV or any screen / monitor with HDMI input
- 1-5 push buttons
- Breadboard
- Wires

## History and Background information

*An optional introduction to buttons.*

For almost two hundred years, buttons have been one of the most commonly used methods of interfacing with technology. The underlying principle of a button is  simple and well-suited for anything where there's electricity present: completing a circuit when the button is pressed. Thanks to this functional simplicity, buttons gained wide popularity, they've been used to do mundane and great things alike: from typing up Morse code, controlling TV channels, to launching huge rockets into space!

Nowadays we encounter buttons dozens or hundreds of times a day, sometimes without realizing it. Pressing a button is usually followed by some kind of feedback mechanism: a sound, changing light, message on a screen, etc. We often take this interaction for granted and are surprised when pushing a button doesn't produce any sort of feedback or response.

*An optional introduction to synthesizers.*

A synthesizer is an electronic instrument producing a variety of sounds by generating and combining signals of different frequencies. One of the earliest synthesizers is "Musical Telegraph" invented by Elisha Gray in 1874. 

---

In this project we will leverage the physical feeling or pressing a button and the drawing capacity of Processing to make an unusual synthesizer: a visual synthesizer.   

### Types of buttons

There are few different types of buttons: 

- Push buttons (also called "Momentary push buttons")
- Microswitches (also called "Momentary switches")

Within these types, the connections inside the buttons could be: 

- Normally Closed
- Normally Open

In this tutorial, we'll be using the most common button: Normally Open Push Buttons.

### Raspberry Pi GPIO and Processing

Modern Raspberry Pi computers have 26 pins that can be designated to be an input (receiving signals) or output (sending signals) pins. 10 of those are shared between other interfaces (I2C, SPI), leaving 16 pins that can be used purely for input and output. Here's a diagram showing the GPIO pins that are not shared with other interfaces on the Raspberry Pi:

{{< figure src="raspberry-pi-3-with-pins.jpg" width="400" link="raspberry-pi-3-with-pins.jpg" title="Input/output pins (GPIO) that are not shared with other interfaces" >}}  

{{% message %}}
GPIO stands for "General Purpose Input-Output". Please see [this page](https://www.raspberrypi.org/documentation/usage/gpio/) for more information about GPIO pins and their usage.
{{% /message %}} 

Processing's built in [Hardware I/O Library](https://processing.org/reference/libraries/io/) (`processing.io.*`) can work with any of the GPIO pins to read signals or output signals on those pins. 

Before using the GPIO pins in your sketch, you must determine whether the pin will be used as an input or as an output and if it is an input, configure the pin by using Hardware I/O library's `GPIO.pinMode` function ([reference](https://processing.org/reference/libraries/io/GPIO_pinMode_.html)). When the pin is set as an input, there are three different options for it's `pinMode` to choose from:

- INPUT
- INPUT_PULLDOWN
- INPUT_PULLUP

Using one of these three options determines whether a pull-up / pull-down resistor is enabled on that particular pin or if the default state of the circuitry of the Raspberry Pi should be used, which is not recommended.

{{% message title="Pull-up and pull-down resistors" %}}
[From Wikipedia](https://en.wikipedia.org/wiki/Pull-up_resistor): In electronic logic circuits, a pull-up resistor is a resistor used to ensure a known state for a signal. It is typically used in combination with components such as switches and transistors, which physically interrupt the connection of subsequent components to ground. The pull-up resistor then ensures a well-defined voltage (i.e. VCC) across the latter during interruption.

A pull-down resistor works in the same way but is connected to ground. It holds the logic signal at a low logic level when no other active device is connected.
{{% /message %}}

After the pin is configured to act as an input with a pull-down or pull-up resistor, we can get the current state of the button in Processing by using [digitalRead](https://processing.org/reference/libraries/io/GPIO_digitalRead_.html) function. Here is an example using a built-in pull-up resistor and retrieving the state of the button:

```processing
// Example using a built-in pull-up resistor on a Raspberry Pi GPIO pin
import processing.io.*;

int buttonPin = 4; // The button is connected to pin 4 and the ground

void setup() {
  GPIO.pinMode(buttonPin, GPIO.INPUT_PULLUP);
}
...
// When a pull-up resistor is enabled, the button will read LOW when it's pressed
if (GPIO.digitalRead(buttonPin) == GPIO.LOW) {
  // Button is pressed
}
```

If we used a pull-down resistor, the button would need to be connected to +3.3V instead of the ground, and the Processing sketch would be as follows:

```processing
// Example using a built-in pull-down resistor on a Raspberry Pi GPIO pin
import processing.io.*;

int buttonPin = 4; // The button is connected to pin 4 and the positive 3.3V

void setup() {
  GPIO.pinMode(buttonPin, GPIO.INPUT_PULLDOWN);
}
...
// When a pull-down resistor is enabled, the button will read HIGH when it's pressed
if (GPIO.digitalRead(buttonPin) == GPIO.HIGH) {
  // Button is pressed
}
```

With these basics covered, let's move on!

# Making the visual synth

Now that you know about buttons, GPIO and Processing's `pinMode` There are two main steps to make the visual synth:

1. Make a single button work with Processing
2. Add more buttons

Let's start by connecting a single button to the Raspberry Pi and making it work with Processing!

## Getting a single button to interact with Processing

The easiest way to make a button work on Raspberry Pi is to connect it between a GPIO pin and the ground. In order for this to register as an input when the button is pressed, an internal pull-up resistor has to be enabled.

In this tutorial, we'll be using the `INPUT_PULLUP` mode for the input pins and this way avoid using other components like external resistors.

Let's connect a single button to GPIO pin #4 and the ground as shown in the schematic:

{{< figure class="center" src="Project1-sketch-basic-button_bb.png" width="500" link="Project1-sketch-basic-button_bb.png" title="Single Button connected to Pin 4 of RPI GPIO" >}}

With this simple electrical circuit in place, we can create a basic sketch in Processing that will use the state of the button as the input. In this sketch, let's fill in a circle when the button is pressed, and let's make the circle empty when it's not:

{{< figure class="border" src="button-state-sk_01_ellipse.png" link="button-state-sk_01_ellipse.png" title="Single button actuating fill in a circle" >}}

The Processing sketch for this basic interaction comes with the built-in examples of the Hardware I/O library and is presented below: 

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

We can use this simple circuit and the sketch as the basis for the next steps in making the visual synth! 

Our goal is to make something within Processing to react to the state of the button continuously. When the button is not pressed, we want the object to remain the same, but when the button is pressed, we'd like the object to continuously react for the entire time the button is pressed. For example, if the button is pressed, the object can expand, shrink and do that over and over until the button is released. Here's a diagram that shows those two different stages: 
 
{{< figure class="border" src="button-state-sk_01.png" link="button-state-sk_01.png" title="Single button actuating grow/shrink cycle of a circle" >}}  
 
To achieve this cyclical growing/shrinking animation cycle, we can use the concept of "oscillator" that comes from audio synthesizers. 

{{% message %}}
From [Wikipedia](https://en.wikipedia.org/wiki/Electronic_oscillator): "An electronic oscillator is an electronic circuit that produces a periodic, oscillating electronic signal, often a sine wave or a square wave"
{{% /message %}}

The base for our oscillator will be a sinusoidal wave created with Processing [sin(x) function](https://processing.org/reference/sin_.html). We can create an internal counter that will be incremented only when the button is pressed and feed the value of that counter to the `sin(x)` function:

TODO: figure of the sin(x) graph and the button press

Let's try this out in practice and make a simple sketch demonstrating the cyclical growing and shrinking during button press: 

```processing
import processing.io.*;

int buttonPin = 4;           // Which pin the button is connected to
int circleDiameter = 200;    // Original diameter of the circle
float updatedCircleDiameter; // This holds growing / shinking diameter
int circleGrowthDelta = 50;  // Max growth increase
float t = 0;                 // Counter for the oscillator

void setup() {
  size(400, 400);
  GPIO.pinMode(buttonPin, GPIO.INPUT_PULLUP);
}

void draw() {
  background(100);

  // Increase the counter when button is pressed
  if (GPIO.digitalRead(buttonPin) == GPIO.LOW) {
    t += 0.06;
  }

  fill(180);
  stroke(255);
  
  updatedCircleDiameter = circleDiameter + circleGrowthDelta * (sin(t));
  ellipse(width/2, height/2, updatedCircleDiameter, updatedCircleDiameter);
}

```

## Adding more buttons


{{< figure class="center" src="Project1-sketch1_bb.png" link="Project1-sketch1_bb.png" title="Multiple Buttons connected to GPIO pins of RPI (click to enlarge)" >}}

  

{{< figure src="button-states-sk_03.jpg" class="border" link="button-states-sk_03.jpg" title="Mapping of buttons modifying object's attributes" >}} 

## Making OOP sketch


```processing
// Import Processing's Hardware library
import processing.io.*;

// Define an instance of the Circle object
Circle myCircle;

// Define the pins that will be reading button presses
int[] pins = { 4, 17, 27, 22, 5 };

void setup() {
  size(400, 400);
  // Change the color mode of the sketch to HSB
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // INPUT_PULLUP enables the built-in pull-up resistor for this pin
  // left alone, the pin will read as HIGH
  // connected to ground (via e.g. a button or switch) it will read LOW

  // Set all pins in the pins array as inputs with pull-up resistors enabled
  for (int i = 0; i < pins.length; i++) {
    GPIO.pinMode(pins[i], GPIO.INPUT_PULLUP);
  }

  // Create a circle in the middle of the screen 
  myCircle = new Circle(width / 2, height / 2, 100, 148);
}

void draw() {
  background(0); 

  // Modify attributes of the circle depending on which buttons are pressed
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

  // Increase the speed of the animation while the 5th button is pressed
  if (GPIO.digitalRead(pins[4]) == GPIO.LOW) {
    myCircle.speed(0.12);
  } else {
    myCircle.speed(0.06);
  }

  // Update the circle state
  myCircle.update();
  // And draw it to the screen
  myCircle.display();
}


class Circle { 

  // These variables store the initial position of the circle
  float originalXpos;
  float originalYpos;
  // These store its current position
  float xpos;
  float ypos;
  // Possible deviation from the initial position, in pixels
  int orbitRange = 50;

  float originalDiameter;
  float diameter;
  int growthRange = 50;

  int opacity = 255;
  int opacityRange = 80;

  int originalHue;
  int hue;
  int hueRange = 80;

  float t = 0.0;
  float speed = 0.06;

  Circle(float x, float y, float dia, int h) {
    originalXpos = x;
    originalYpos = y;
    xpos = x;
    ypos = x;

    originalDiameter = dia;
    diameter = dia;

    originalHue = h;
    hue = h;
  }

  void pulsateSize() {
    diameter = originalDiameter + growthRange * sin(t);
  }

  void pulsatePosition() {
    ypos = originalXpos + orbitRange * cos(t*2);
  }

  void pulsateHue() {
    hue = int(originalHue + hueRange * sin(t));
  }

  void pulsateOpacity() {
    opacity = int(170 + opacityRange * sin(t));
  }

  void speed(float s) {
    speed = s;
  }

  void update() {
    t += speed;
  }

  void display() {
    fill(hue, 100, 100, opacity); 
    ellipse(xpos, ypos, diameter, diameter);
  }
}
```

# Next Steps

- make a box 

# Resources

- https://github.com/splitbrain/rpibplusleaf
- GPIO labeling: https://www.raspberrypi-spy.co.uk/2012/06/simple-guide-to-the-rpi-gpio-header-and-pins/#prettyPhoto
- https://github.com/DotNetToscana/IoTHelpers/wiki/Raspberry-Pi-2-and-3-Pinout
- https://pinout.xyz