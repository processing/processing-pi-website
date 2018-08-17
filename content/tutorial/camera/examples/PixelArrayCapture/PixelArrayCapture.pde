/**
 *  Please note that the code for interfacing with Capture devices
 *  will change in future releases of this library. This is just a
 *  filler till something more permanent becomes available.
 *
 *  For use with the Raspberry Pi camera, make sure the camera is
 *  enabled in the Raspberry Pi Configuration tool and add the line
 *  "bcm2835_v4l2" (without quotation marks) to the file
 *  /etc/modules. After a restart you should be able to see the
 *  camera device as /dev/video0.
 */

import gohai.glvideo.*;
GLCapture video;

void setup() {
  size(640, 480, P2D);
  noStroke();

  

  String[] devices = GLCapture.list();
  println("Devices:");
  printArray(devices);
  if (0 < devices.length) {
    String[] configs = GLCapture.configs(devices[0]);
    println("Configs:");
    printArray(configs);
  }

  // this will use the first recognized camera
  video = new GLCapture(this, devices[0], 640, 480, 24);
  video.start();
}

void draw() {
  background(0);
  if (video.available()) {
    video.read();
  }
  image(video, 0, 0, width, height);
int[] hist = new int[256];

  // Calculate the histogram
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      int bright = int(brightness(get(i, j)));
      hist[bright]++;
    }
  }
  
  
// Find the largest value in the histogram
int histMax = max(hist);
stroke(255);
// Draw half of the histogram (skip every second value)
for (int i = 0; i < width; i+=2) {
  // Map i (from 0..img.width) to a location in the histogram (0..255)
  int which = int(map(i, 0, width, 0, 255));
  // Convert the histogram value to a location between 
  // the bottom and the top of the picture
  int y = int(map(hist[which], 0, histMax, height, 0));
  line(i, height, i, y);
}
  

  // alternatively, the pixel value can also be read like this:
  //if (0 < video.width) {
  //  video.loadPixels();
  //  center = video.pixels[video.height/2*video.width + video.width/2];
  //}
}
