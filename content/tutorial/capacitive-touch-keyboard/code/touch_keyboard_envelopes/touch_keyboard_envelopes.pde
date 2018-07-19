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

// Define an octave of the available notes in form of MIDI indexes of major keys
int[] notes = { 60, 62, 64, 65, 67, 69, 71, 72}; 

int duration = 500; // duration between consecutive repetition of the same note 

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
  size(640, 360);
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
        drawKey(i);
      }

      timers[i] = millis();
    }
  }
} 

// This helper function calculates the respective frequency of a MIDI note, in Hz
float midiToFreq(int note) {
  return (pow(2, ((note-69)/12.0)))*440;
}

void drawKey(int index) {
  rect(index * keyWidth, 0, keyWidth, height);
}

// Play a note, using the oscillator that is currently active, with volume level established by the volume toggle switch
void playNote(int index) {
  switch(currentMode) {
  case 0: 
    sinOsc.play(midiToFreq(notes[index]), currentVolume);
    // The envelope gets triggered with specific oscillator as input, with durations and volume level defined earlier
    env.play(sinOsc, attackTime, sustainTime, currentVolume, releaseTime);
    break;
  case 1: 
    sqrOsc.play(midiToFreq(notes[index]), currentVolume);
    env.play(sqrOsc, attackTime, sustainTime, currentVolume, releaseTime);
    break;
  case 2:
    triOsc.play(midiToFreq(notes[index]), currentVolume);
    env.play(triOsc, attackTime, sustainTime, currentVolume, releaseTime);
    break;
  }
}
