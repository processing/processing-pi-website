
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

  effect.set("pixelsPerRow", (int) map(mouseX, 0, width, 2, 100));

  image(video, 0, 0);  
  shader(effect);
}
