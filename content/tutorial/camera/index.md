---
title: "Camera"
date: 2018-07-05T15:43:48+08:00
lastmod: 2018-07-06T10:50:48+08:00
draft: false
tags: ["camera", "glvideo", "glsl", "filters"]
categories: ["hardware"]
author: "Maksim Surguy"
description: "Learn how to use the camera with Processing on the Pi"
thumbnail: "thumbnail.jpg"
---

# Introduction

Since its first release, Processing has been known for its capacity in creating visualizations. It's strength in manipulating pixels of images enables more experimentation when external image sources, like cameras, are used.

While interesting and meaningful, using the built-in camera of the laptop or desktop computer with Processing can be limited by the form factor and the input methods of the computer. The portability and expandability of Raspberry Pi single-board computers opens up new frontiers for using camera as input for Processing sketches.

The combination of Processing, camera, and a couple of components connected to Pi's GPIO pins could be used to make some unique experiences while remaining affordable. Think of possibilities like:

- Portable cameras with filters that are controlled by physical buttons and knobs
- Portrait booths that generate artwork based on recent snapshot
- Computer Vision experiments
- Timelapse rigs
- and more

{{< figure src="pi-camera-hardware.jpg" class="center" title="Some examples of possibilities of using camera with Processing on the Pi" >}} 

Of course this is just a short glimpse of what's possible. The knowledge you gain in this tutorial should enable you to create your own projects using camera input in Processing on Raspberry Pi.

Let's take a look at what you will need to have in order to make the projects in this tutorial.
  
## Required Materials

The main component that you would need for this tutorial is the camera attached to Raspberry Pi. Below is the full list of parts necessary for this tutorial:

- a Raspberry Pi model 3+, 3 or 2 (those are recommended, it will work the Pi Zero and older versions, albeit much more slowly) with Processing [installed](https://pi.processing.org/get-started/)
- TV or any screen / monitor with HDMI input
- Raspberry Pi [camera module](https://www.raspberrypi.org/products/camera-module-v2/) v1 or v2 (or a USB Webcam compatible with Raspberry Pi)

Optional:

- 1 push button
- Wires

{{% message type="warning" title="A note about cameras" %}}
The official Raspberry Pi camera module is recommended because some inexpensive alternatives have been known to not work well with the V4L2 driver used by Processing. Also, if a USB webcam is used instead, there might be slight performance issues.  
{{% /message %}}

## Overview of using camera with Processing on the Pi

Getting the video frames from the camera in Processing has to be facilitated by an external library. The Processing's [Video Library](https://processing.org/reference/libraries/video/) works well on Windows, Mac and some Linux distributions. However on the Pi its performance has been found to be lacking, this is why an alternative library exists to provide the best possible experience on this platform.

This alternative library is named [GL Video](https://github.com/gohai/processing-glvideo). Its name stems from it handling frames as Open_GL_ textures rather than arrays of pixel data, the former of which is more efficient because it involves fewer operations on the CPU.

# The GL Video library

The  GL Video library works on Raspberry Pi computers running Raspbian OS. You will find it already pre-installed if you are using the [Pi image with Processing](https://pi.processing.org/download/), alternatively you can install it through the Library Manager within Processing IDE. It enables you to:

- Capture frames from camera via the GLCapture class
- Read frames from video files via GLMovie class

Both work roughly analog to the regular Video library does.

Before you use this library in your sketches, the camera has to be connected to your Pi. With the camera connected / set up, we can start using GL Video class to work with the video stream from the camera. Specifically, the `GLCapture` class within GL Video is the class that we'll be using to get the video stream from the camera.

{{% message type="warning" title="Not using Processing's Raspberry Pi image?" %}}
If you are _not_ using the pre-configured Raspbian image containing Processing, please see [this section](#gl-video-library-installation-and-set-up) for the necessary configuration changes for being able to use the camera module.
{{% /message %}}

## Using GLCapture class

The main purpose of the `GLCapture` class is to set up framerate and resolution of the camera, and to read image frames from the camera in form of textures. `GLCapture` class only works with P2D and P3D renderers and provides methods that are very similar to the `Capture` class within original [Video Library](https://processing.org/reference/libraries/video/). 

If you've never worked with the Video Library, you are encouraged to take a look at an excellent tutorial by Daniel Shiffman that goes over the steps necessary to read a video stream from the camera in Processing: 
https://processing.org/tutorials/video/ 

The main methods that GLCapture provides, are:

- `list()` - lists all cameras connected
- `start()` - starts the video stream from camera
- `stop()` - stops the video stream from camera
- `available()` - checks if a new frame is available for reading
- `read()` - populates the object with the data from a video frame

{{% message type="focus" title="Difference between GLCapture and the original Capture class" %}}
Though the syntax and the purpose of the two classes are very similar, there are some subtle differences between the two. For example, the `captureEvent` callback function that is in Capture class is not in GLCapture class. In GL Video, one instead calls the `available()` method inside `draw` to see if there is a new frame waiting. Also, GL Video only works in P2D and P3D renderers. 
{{% /message %}}

Let's dig into using the GLCapture class to start capturing the video stream! The process of using GLCapture class looks like this:

- Make sure the sketch renderer is setup to be **P2D** or **P3D**
- Import the GL Video library that contains `GLCapture` class (`import gohai.glvideo.*`)
- Create a new `GLCapture` object that will stream and store the textures from the camera
- Initialize the `GLCapture` object, specifying camera framerate, width and height of the desired video stream
- Start the stream via the `start()` method
- Read the video stream when it is available
- Display (or otherwise) use the video

Enough with the theory. Let's try this class out in practice! The following [example sketch](https://github.com/gohai/processing-glvideo/blob/master/examples/SimpleCapture/SimpleCapture.pde) comes with the GL Video library and will serve as a building block for our next steps. Running this example will result in a window which reflects whatever the camera is capturing:

<video controls loop="" width="740"><source src="videos/intro-video.mp4" type="video/mp4"></video>

```processing
import gohai.glvideo.*;
GLCapture video;

void setup() {
  size(320, 240, P2D); // Important to note the renderer
  
  // Get the list of cameras connected to the Pi
  String[] devices = GLCapture.list(); 
  println("Devices:");
  printArray(devices);
  
  // Get the resolutions and framerates supported by the first camera
  if (0 < devices.length) {
    String[] configs = GLCapture.configs(devices[0]); 
    println("Configs:");
    printArray(configs);
  }

  // this will use the first recognized camera by default
  video = new GLCapture(this);

  // you could be more specific also, e.g.
  //video = new GLCapture(this, devices[0]);
  //video = new GLCapture(this, devices[0], 640, 480, 25);
  //video = new GLCapture(this, devices[0], configs[0]);

  video.start();
}

void draw() {
  background(0);
  // If the camera is sending new data, capture that data
  if (video.available()) {
    video.read();
  }
  // Copy pixels into a PImage object and show on the screen
  image(video, 0, 0, width, height);
}
```

There are a few important parts of this code which will save you a lot of headache later: 

- Listing connected cameras 
- Checking camera capabilities 
- Using framerates and resolutions supported by the cameras you're using

### Listing the cameras connected to the Pi 
Sometimes you might want to have more than single camera connected to the Pi. You could list all cameras and use specific camera connected to the Pi by using the `GLCapture.list()` method:

```processing
String[] devices = GLCapture.list(); 
println("Devices:");
printArray(devices);
...
firstVideo = new GLCapture(this, devices[0]);
secondVideo = new GLCapture(this, devices[1]);
```

To get an idea of the framerates and resolutions supported by the camera(s), you can use `GLCapture.configs()` method.

### Finding out camera capabilities

For each camera connected to the Pi, it is useful to know what possible resolutions and framerates they provide. Using the `GLCapture.configs()` method should return all available resolutions and framerates that the camera supports:

```processing
...
// For each camera, get the configs before using the camera:
String[] configs = GLCapture.configs(devices[0]); 
println("Configs:");
printArray(configs);
...
```

### Explicitly setting the desired framerate and resolution

After you find out the camera's capabilities, you can be specific about the resolution and framerate that you'd like to use with your camera. For example, if you wanted to tell the camera to use resolution of 640 by 480 pixels, at 25 frames per second, you'd instantiate the `GLCapture` class like this:

```processing
...
video = new GLCapture(this, devices[0], 640, 480, 25);
...
```

Now that you know the basics of using the GL Video class and specifically, GLCapture class, let's make some fun projects!

# Mini projects using the camera

Using the knowledge about the `GLCapture` class, we will build the following three projects using the camera:

- Using built-in image filters
- Live histogram viewer
- Using shaders for realtime visual effects

Let's start with a simple project that will give you an idea of how to leverage the `GLCapture` class and use it with built-in image operations in Processing.

## Using built-in image filters with camera (threshold, blur, etc)

Processing comes with a range of built-in [image filters](https://processing.org/reference/filter_.html) such as:

- Threshold
- Blur
- Invert
- etc.

These filters can be applied to any `PImage`, including the `GLCapture` object which returns video data from camera.  

Consider the following example that will turn a color image into a grayscale image:

```processing
PImage img;
img = loadImage("apples.jpg");
image(img, 0, 0);
filter(GRAY);
```

Let's take this simple example and apply it to a live video feed. We'd only need to replace the static image loaded from the hard drive with the image that comes from the camera stream. For example:

```processing
// Get video data stream
if (video.available()) {
  video.read();
}
// Display the video from camera
image(video, 0, 0, width, height);
// Apply a threshold filter with parameter level 0.5
filter(GRAY);
```

Nice and easy! Of course we're not limited to only grayscale filter. Let's apply another filter, a Threshold filter that produces the following effect: 

<video controls loop="" width="740"><source src="videos/threshold-filter.mp4" type="video/mp4"></video>

Here's the full sketch for applying the threshold effect:

```processing
import gohai.glvideo.*;
GLCapture video;

void setup() {
  size(640, 480, P2D);

  // this will use the first recognized camera by default
  video = new GLCapture(this);
  video.start();
}

void draw() {
  background(0);
  if (video.available()) {
    video.read();
  }
  image(video, 0, 0, width, height);
  // Apply a threshold filter with parameter level 0.5
  filter(THRESHOLD, 0.5);
}

```

Don't stop there. Play with the other filters and see which one you like the most! Now that you're getting comfortable with using built-in filters, let's continue with a project that will take advantage of the `GLCapture` class and will use pixel analysis operations of Processing.

## Live Histogram Viewer 

One of the built-in example sketches in Processing ("Topics > Image Processing > Histogram") features a "histogram" generated from the pixel data of a still image. 

> A histogram is the frequency distribution 
of the gray levels with the number of pure black values
displayed on the left and number of pure white values on the right.

What if we take that example, but instead of still image use a live video stream to generate the histogram from the camera feed? Here's an example video captured while running live histogram viewer:

<video controls loop="" width="740"><source src="videos/histogram.mp4" type="video/mp4"></video>


The only addition comparing to the default still-image histogram sketch would be to use the `GLCapture` class and to read the camera data into PImage object that will then be analyzed to create the histogram: 

```processing
PImage img;

void setup() {
  // setup the camera framerate and resolution
  ...
}

void draw() {
  if (video.available()) {
      video.read();
    }
  img = video;
  image(video, 0, 0);
  
  // Create histogram from the image on the screen (camera feed)
  ...
}
```

This time, let's request a specific resolution and framerate of the camera input to control performance of our sketch. Lower resolutions can be processed much faster than higher resolutions. Controlling the framerate can also impact perfromance of your sketch. For the histogram viewer, let's use resolution of 640 by 480 pixels, and framerate of 24 frames per second by using the `GLCapture` instantiation parameters:

```processing
...
void setup() {
  ...
  video = new GLCapture(this, devices[0], 640, 480, 24);
  video.start();
}
...
```

Below is the full sketch for the live histogram viewer:

```processing
/**
 * Histogram Viewer derived from the "Histogram" built-in example sketch. 
 * 
 * Calculates the histogram based on the image from the camera feed. 
 */

import gohai.glvideo.*;
GLCapture video;

void setup() {
  size(640, 480, P2D);
  
  String[] devices = GLCapture.list();
  println("Devices:");
  printArray(devices);
  
  // Use camera resolution of 640x480 pixels at 24 frames per second
  video = new GLCapture(this, devices[0], 640, 480, 24);
  video.start();
}

void draw() {
  background(0);
  if (video.available()) {
    video.read();
  }
  
  image(video, 0, 0);
  int[] hist = new int[256];

  // Calculate the histogram
  for (int i = 0; i < video.width; i++) {
    for (int j = 0; j < video.height; j++) {
      int bright = int(brightness(get(i, j)));
      hist[bright]++;
    }
  }

  // Find the largest value in the histogram
  int histMax = max(hist);

  stroke(255);
  // Draw half of the histogram (skip every second value)
  for (int i = 0; i < video.width; i += 2) {
    // Map i (from 0..img.width) to a location in the histogram (0..255)
    int which = int(map(i, 0, video.width, 0, 255));
    // Convert the histogram value to a location between 
    // the bottom and the top of the picture
    int y = int(map(hist[which], 0, histMax, video.height, 0));
    line(i, video.height, i, y);
  }
}
```

Notice how we used `video.width` and `video.height` to find out the dimensions of the video. The `GLCapture` class inherits these and other methods from the `PImage` class (see [reference](https://processing.org/reference/PImage.html) for other methods available to `PImage` and thus, to each instance of `GLCapture`).

By being able to analyze and operate on pixel data from the camera, you can come up with some real-time or near real-time visuals that can be interesting and fun to experiment with.

What if you wanted to accelerate the speed of various image effects and perhaps push the boundaries of performance on the Pi? Enter Shaders!  

## Using GLSL Shaders for improved performance

Doing image processing pixel-by-pixel is a computationally expensive process. The CPU on the Pi is relatively slow and the amount of RAM is low, so performance suffers when complex operations or analysis is performed on the image data. 

There is a way to improve performance of image operations by using the Graphics Processing Unit (GPU) that's designed to accelerate graphics processing. The Pi GPU (even on Pi Zero) is capable of processing millions of pixels simultaneously and that can result in tangible performance increase. For example, check out this video of hardware accelerated effects in Processing:    

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Super long demo video of using GLSL shaders in <a href="https://twitter.com/ProcessingOrg?ref_src=twsrc%5Etfw">@ProcessingOrg</a> on <a href="https://twitter.com/Raspberry_Pi?ref_src=twsrc%5Etfw">@Raspberry_Pi</a> to apply various filters over video feed in real time. Using <a href="https://twitter.com/mrgohai?ref_src=twsrc%5Etfw">@mrgohai</a>’s GLVideo lib on the Pi makes this stuff possible! Also tested this on <a href="https://twitter.com/hashtag/pizero?src=hash&amp;ref_src=twsrc%5Etfw">#pizero</a> with the same performance! <a href="https://t.co/uUkMhBcLa7">pic.twitter.com/uUkMhBcLa7</a></p>&mdash; Maks Surguy (@msurguy) <a href="https://twitter.com/msurguy/status/1022345010878935041?ref_src=twsrc%5Etfw">July 26, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Because the data we get from GL Video library is essentially regular pixel data, we can do whatever we want with those pixels after putting them onto a PImage. For example, we can use **shaders** to take advantage of using hardware acceleration to offload image processing from the relatively slow CPU and onto the graphics processing unit (GPU) of the Raspberry Pi. 

> Shader is a program that runs on the GPU and generates the visual output on the screen. Processing supports shaders written in GLSL (openGL Shading Language) language. 

You might have seen shaders in use on websites or in video games. They are widely supported on any platform that has a GPU, including Raspberry Pi.  

### Shaders in Processing

There are two types of shaders that could be used in Processing:

 - **Vertex shaders** that specify boundaries of graphics on the screen
 - **Fragment shaders** that specify what is displayed within those boundaries

{{% message title="Learning shaders" %}}
The theory behind shaders is largely outside of the scope of this tutorial, but there is a detailed article about both types of shaders and how they can be used in Processing: https://processing.org/tutorials/pshader/
{{%/ message %}}

In this tutorial we will only explore using fragment shaders which fill the screen with colors according to the shader code. For the purpose of this tutorial, we will take existing open source fragment shaders from various places online and use them with the video from the camera. 

Let's start by understanding how to create a shader file and use it within the Processing sketch.

### Creating and using a shader file

There are four steps to create and use a shader file in your Processing sketch:

1. Creating a shader file in the same folder as the sketch
2. Declaring the shader in the sketch using `PShader` type
3. Loading the shader file via `loadShader()` method
4. Activating the shader via `shader()` method

Let's go over these steps in more detail.

To create a shader file, create a file by making a new tab within your current sketch and give this file some name ending with extension of "**.glsl**", for example "shader.glsl". For now keep the file empty. Here are some screenshots of how the new shader file is created within Processing IDE:

{{< figure src="newshader.jpg" title="Creating new shader file" >}} 

{{< figure src="newshader-name.jpg" title="Naming the shader file" >}} 

{{% message type="alert" title="Older versions of Processing" %}}
Creating `glsl` file in the same folder as the sketch only works in the newest version of Processing (starting at 3.5.x). If you are using an older version, please use another text editor to create the shader file and place it within the `data` folder of the sketch.
{{% /message %}}

Great! Now that the shader file is created, let's put in some code in it. We will use existing shader code found online that turns a color image into grayscale image. Copy and paste the following code and let's go over it to understand what's happening:

"shader.glsl" listing:
```glsl
// Shader that turns color image into grayscale
#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
varying vec4 vertTexCoord;

void main () {
  vec4 normalColor = texture2D(texture, vertTexCoord.xy);
  float gray = 0.299*normalColor.r + 0.587*normalColor.g + 0.114*normalColor.b;
  gl_FragColor = vec4(gray, gray, gray, normalColor.a);
}
```

Even though this shader is very small (only a few lines), it contains many important parts: definitions, variables, calculations, assignments and functions. 

When it comes to Processing, there are six types of shaders that can be explicitly defined by using `#define` statement:

- #define PROCESSING_POINT_SHADER
- #define PROCESSING_LINE_SHADER
- #define PROCESSING_COLOR_SHADER
- #define PROCESSING_LIGHT_SHADER
- #define PROCESSING_TEXTURE_SHADER
- #define PROCESSING_TEXLIGHT_SHADER

We will use `#define PROCESSING_TEXTURE_SHADER
` type exclusively because our shaders will be texture shaders (as opposed to light, color and others).

When writing fragment shaders, some variables are essential for every shader:

- `uniform sampler2D texture`
- `varying vec4 vertTexCoord`
- `gl_FragColor` within the `main` function

The `void main ()` function also is necessary for every shader. Within this function, the calculations on pixel values will happen and be returned as `gl_FragColor` variable.

The `uniform sampler2D texture` and `varying vec4 vertTexCoord` have special meaning so let's look at them closely:

`uniform sampler2D texture` is essentially an image(array of pixels) that will be passed from the Processing sketch to the shader. This is what shader receives and will operate on.

`varying vec4 vertTexCoord` is a set of coordinates for the boundaries of the resulting image. Even though these boundaries can be moved to be wherever you want, we will not touch them, which results in the image taking the whole area of the sketch.

Now, let's talk about the calculations taking place in this shader. Since we are turning a color image into grayscale, we first need to know RGB values for every pixel, then we sum up those values in some way to get some sort of average value.  

```glsl
// This gives the shader every pixel of the image(texture) to operate upon
vec4 normalColor = texture2D(texture, vertTexCoord.xy);

// Calculate grayscale values using luminance correction (see http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/ for more examples)
float gray = 0.299*normalColor.r + 0.587*normalColor.g + 0.114*normalColor.b;
```

This looks very different from regular Processing operations where you have to loop over arrays of pixels, doesn't it? It's because in shaders, the `main` function is ran on every pixel simultaneously(in parallel) and you cannot loop over pixel values in conventional way. 

Now that the shader file is created, let's declare, load it and use it in a sketch. 

Declaring the shader in your sketch is done by using the `PShader` type. After the shader is declared, we can load the `glsl` file and apply the shader to whatever is being displayed:

```processing
PShader shader;

void setup() {
  size(600, 100, P2D);
  shader = loadShader("shader.glsl");
}

void draw() {
  ...
  filter(shader);
}
```  

Since the sketch doesn't contain any drawing functions so far, we won't have anything to render and modify. Let's add a few colorful rectangles to the screen and then apply the shader to see how it will affect the image. Let's add this code within the `draw()` function before the `filter()` function is called:

```processing
void draw() {
  background(255);
  fill(255, 0, 0); 
  rect(0, 0, 200, height); // add a red rectangle
  fill(0, 255, 0);
  rect(200, 0, 200, height); // add a green rectangle
  fill(0, 0, 255);
  rect(400, 0, 200, height); // add a blue rectangle
  filter(shader);
}
```

Here's the result of the sketch running with and without the shader being applied:

{{< figure src="shader-on-off.png" title="Grayscale effect using a shader" >}} 

You can try modifying the values within the calculation part of the shader to see how each color is being converted to grayscale:

```glsl
// Play with these numbers and notice the grayscale changes
float gray = 0.299*normalColor.r + 0.587*normalColor.g + 0.114*normalColor.b;
```
 
You might think that converting a color image to grayscale is no big deal since you can do the same with Processing's built in `GRAY()` [filter](https://processing.org/reference/filter_.html). The most compelling reason to use shaders is that they would be an order of magnitude faster than CPU intensive filter operations. This is especially true when it comes to animation or video. 

Let's take the same shader and apply it to a live camera feed using the GL Video class! 
 
### Using a shader with camera feed

Since the shader can be applied to any image coming from Processing sketch, we can put together a sketch that does the following:

- Captures the video stream from the camera
- Draws the video frames of the camera onto the screen
- Applies our grayscale shader and shows the modified video feed on the screen

The most important part of this process is to read the camera data, draw it onto a PImage object and apply the shader:

```processing
...
// setup the sketch and the camera
...

// Read camera data and apply shader
void draw() {
  background(0);
  if (video.available()) {
    video.read();
  }

  image(video, 0, 0);  
  shader(grayscaleFilter);
}
```

Please see the video of the filter applied onto the camera stream in real time:

<video controls loop="" width="600"><source src="videos/gray-shader.mp4" type="video/mp4"></video>

The complete sketch for this effect is below:

*grayscale.pde*
```processing
import gohai.glvideo.*;
GLCapture video;

// Define the shader
PShader grayscaleFilter;

void setup() {
  size(640, 480, P2D);

  String[] devices = GLCapture.list();
  println("Devices:");
  printArray(devices);

  // Use camera resolution of 640x480 pixels at 24 frames per second
  video = new GLCapture(this, devices[0], 640, 480, 24);
  video.start();

  // Load the shader
  grayscaleFilter = loadShader("shader.glsl");
}

void draw() {
  background(0);
  if (video.available()) {
    video.read();
  }

  image(video, 0, 0);  
  
  // Apply the shader
  shader(grayscaleFilter);
}
```

Contents of the shader file:
*shader.glsl*
```glsl
// Shader that turns color image into grayscale
#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
varying vec4 vertTexCoord;

void main () {
  vec4 normalColor = texture2D(texture, vertTexCoord.xy);
  float gray = 0.299*normalColor.r + 0.587*normalColor.g + 0.114*normalColor.b;
  gl_FragColor = vec4(gray, gray, gray, normalColor.a);
}
```

This is a start! Using GL Video and shaders becomes a powerful combination to create compelling real-time visualizations. Now we can explore more advanced topics like passing parameters from the sketch to the shader. 

### Passing parameters to the shader

What if you wanted to change values within the shader in real time, and could pass those values from the sketch somehow? The `PShader` class has a single method for that, the [`set()`](https://processing.org/reference/PShader_set_.html) method. 

Using this method you can ask the sketch to update some variables within the shader in real time. For example, let's say our shader has the following variable that acts as an array of two values:

```glsl 
...
uniform vec2 pixels;
...
```

Now, using the `set()` method, you could update the `pixels` variable within the shader by specifying what values you'd like to pass into it: 

```processing
// First parameter specifies the name of the variable, followed by new values
effect.set("pixels", 0.1 * mouseX, 0.1 * mouseY);
``` 

Let's take a look at how this can be used in practice:

<video controls loop="" width="600"><source src="videos/pixelate-shader.mp4" type="video/mp4"></video>

Here's the shader code:

`pixelate.glsl`
```glsl
#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

// From Gene Kogan's Github Repo https://github.com/genekogan/Processing-Shader-Examples/tree/master/TextureShaders/data

varying vec4 vertTexCoord;
uniform sampler2D texture;
uniform vec2 pixels;

void main(void)
{
    vec2 p = vertTexCoord.st;

  p.x -= mod(p.x, 1.0 / pixels.x);
  p.y -= mod(p.y, 1.0 / pixels.y);
    
  vec3 col = texture2D(texture, p).rgb;
  gl_FragColor = vec4(col, 1.0);
}
```

And here is the Processing sketch: 

```processing

import gohai.glvideo.*;
GLCapture video;

PShader effect;

void setup() {
  size(640, 480, P2D);

  String[] devices = GLCapture.list();
  println("Devices:");
  printArray(devices);

  // Use camera resolution of 640x480 pixels at 24 frames per second
  video = new GLCapture(this, devices[0], 640, 480, 24);
  video.start();

  effect = loadShader("pixelate.glsl");
}

void draw() {
  background(0);
  if (video.available()) {
    video.read();
  }
  
  effect.set("pixels", 0.1 * mouseX, 0.1 * mouseY);

  image(video, 0, 0);  
  shader(effect);
}
```

The variable `pixels` within the shader is updated from the sketch with the coordinates of the mouse movement and is then reflected in the shader by these lines: 

```glsl
p.x -= mod(p.x, 1.0 / pixels.x); // pixels.x is 0.1 * mouseX in the sketch
p.y -= mod(p.y, 1.0 / pixels.y); // pixels.y is 0.1 * mouseY in the sketch
```

There are many types of variables that you can pass from the sketch to the shader code so be sure to check the [reference](https://processing.org/reference/PShader_set_.html) for the `set()` method

Another sketch that uses the same method to update shader variables is the Halftone effect. Here's a short demo:

<video controls loop="" width="740"><source src="videos/halftone-shader.mp4" type="video/mp4"></video>

Here's the shader code:

*halftone.glsl*
```glsl
#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

// From Gene Kogan's https://github.com/genekogan/Processing-Shader-Examples/tree/master/TextureShaders/data

varying vec4 vertTexCoord;
uniform sampler2D texture;
uniform int pixelsPerRow;

void main(void)
{
  vec2 p = vertTexCoord.st;
  float pixelSize = 1.0 / float(pixelsPerRow);
  
  float dx = mod(p.x, pixelSize) - pixelSize*0.5;
  float dy = mod(p.y, pixelSize) - pixelSize*0.5;
  
  p.x -= dx;
  p.y -= dy;
  vec3 col = texture2D(texture, p).rgb;
  float bright = 0.3333*(col.r+col.g+col.b);
  
  float dist = sqrt(dx*dx + dy*dy);
  float rad = bright * pixelSize * 0.8;
  float m = step(dist, rad);

  vec3 col2 = mix(vec3(0.0), vec3(1.0), m);
  gl_FragColor = vec4(col2, 1.0);
}
```

And here's the Processing sketch:


```processing

import gohai.glvideo.*;
GLCapture video;

PShader effect;

void setup() {
  size(640, 480, P2D);

  String[] devices = GLCapture.list();
  println("Devices:");
  printArray(devices);

  // Use camera resolution of 640x480 pixels at 24 frames per second
  video = new GLCapture(this, devices[0], 640, 480, 24);
  video.start();

  effect = loadShader("halftone.glsl");
}

void draw() {
  background(0);
  if (video.available()) {
    video.read();
  }
  
  // Change pixelsPerRow variable within the shader depending on mouse position
  effect.set("pixelsPerRow", (int) map(mouseX, 0, width, 2, 100));

  image(video, 0, 0);  
  shader(effect);
}
```

Since the dynamic parameters can come from anywhere within the sketch, you can get even more creative and not stop at using the mouse or keyboard to input the new values for the parameters. Some other alternatives that work on the Pi are:

- Knobs (potentiometers via analog to digital conversion)
- Buttons
- Sliders
- Capacitive touch
- HTTP requests

With these basic principles covered, you can now explore more shaders on your own!

### Resources

Try out some of the shaders that are open source with Processing in mind:

- Cacheflowe's [Haxademic repository](https://github.com/cacheflowe/haxademic/tree/9a1c787b3ebce91cb2929dafcd5876d3593bb613/data/shaders/filters)
- [Filters4Processing](https://github.com/SableRaf/Filters4Processing)
- [Shadershop](http://tobyschachman.com/Shadershop/)
- Gene Kogan's [Shaders for Processing](http://genekogan.com/works/processing-shader-examples/)

There are many websites and online communities that serve as repositories of GLSL shaders and there are many open source shaders in the wild that you can use with some minor effort to make them work in Processing. Some websites like that are:

- Shadertoy (https://www.shadertoy.com/)
- GLSL Sandbox (http://glslsandbox.com/)
- Interactive Shader Format (https://www.interactiveshaderformat.com)

{{% message title="Adapting shaders to Processing" %}}
When you use shaders from other websites, be sure to modify them in the following way:
- Add `#define PROCESSING_TEXTURE_SHADER` to the top
- Make sure `uniform sampler2D texture;` is used to provide the image
- Make sure `varying vec4 vertTexCoord;` is used to define the vertex coordinates of the result

{{% /message %}}

# Next steps

There are so many things that can be done with the concepts covered in this tutorial! You can use GL Video library to work with some other built in Processing sketches like [these](https://github.com/processing/processing-video/tree/master/examples/Capture) and  can get really creative inventing your own ways to visualize camera feed. Please let me know what you come up with and feel free to share with me on Twitter: [@msurguy](http://twitter.com/msurguy)

## Using a push button for shutter 

In case you want to use a physical push button to save the frame from the video feed, you can use the following sketch:

```processing
// Sketch for shutter button. The button should be connected to pin 4 on the Pi
import processing.io.*;
import gohai.glvideo.*;
GLCapture camera;

void setup() {
  size(640, 480, P2D); //or use fullScreen(P2D);
  String[] devices = GLCapture.list();
  camera = new GLCapture(this, devices[0], 640, 480, 30);
  camera.start();
  
  // Add a button on pin 4, see the "Visual Synthesizer" tutorial for more information
  GPIO.pinMode(4, GPIO.INPUT_PULLUP);
}

void draw() {
  background(0);
  if (camera.available()) {
    camera.read();
  }
  image(camera, 0, 0, width, height);
  
  // When the button is pressed, take a picture
  if (GPIO.digitalRead(4) == GPIO.LOW) {
    saveFrame("CAP####.jpg");
    delay(500);
  }
}
```

# Appendix

## GL Video library installation and set up

If you're not using the pre-configured [image](https://pi.processing.org/download/) for the Pi, you'll need to install the GL Video library and enable the camera. 

To use GL Video Library in Processing on the Pi, find it in the contribution manager and install it:

{{< figure src="library-manager.png" title="Installing GL Video library" >}} 

 There are two types of cameras that GL Video can work with:

- Raspberry Pi Camera 
- USB webcams

Now, let's look at the setup required if you'll be using the Pi Camera.

### If using the Pi Camera

If it is the first time you Pi Camera on the Pi, some preliminary steps are needed in order to use the camera with Procesing: 

1. Enabling the camera interface using GUI tool or `raspi-config` command line tool
2. Connecting the camera
3. Enabling `bcm2835_v4l2` driver

You can use Raspbian's built-in configuration tool to enable the camera interface. Click on the launcher in top left, then navigate to `Preferences -> Raspberry Pi Configuration -> Interfaces`, and enable the camera interface:

{{< figure src="raspi-config-gui.jpg" class="center"  title="Enabling the camera interface on the Pi" >}} 

Now, turn off the Pi and connect the camera to the CSI interface. After the camera is connected, you can boot up the Pi and perform one more step of the setup.

GL Video library needs a special driver to be enabled on the operating system level. Add the line `"bcm2835_v4l2"` (without quotation marks) to the file `/etc/modules`. This can be accomplished by executing the following in a terminal window:

    echo "bcm2835_v4l2" | sudo tee -a /etc/modules >/dev/null

After a restart you should be able to use the Pi Camera in Processing!