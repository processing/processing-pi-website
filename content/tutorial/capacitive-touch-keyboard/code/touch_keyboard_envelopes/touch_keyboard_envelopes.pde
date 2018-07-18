/*
This sketch uses a modified example sketch from the sound library (Envelopes).
 
 In this sketch, three various oscillators can be used to generate basic musical notes in range of a single octave.
 An envelope is used to limit the duration of the sound and to create a pleasant profile for each note.
 Volume of the sound is controlled by changing the amplitude of the oscillators and the envelope.
 
 A capacitive touch sensor (MPR121) along with 12 electrodes connected to it is used for the following functions: 
 - playing each note 
 - switching between oscillators
 - switching between volume levels
 
 */

import processing.sound.*;
import processing.io.*;
MPR121 touch; // define MPR121 I2C capacitive touch sensor

// define oscillators
SinOsc sinOsc;
SqrOsc sqrOsc;
TriOsc triOsc;

// define envelope
Env env; 

// Times and levels for the Attack-Sustain-Release(ASR) envelope
float attackTime = 0.001;
float sustainTime = 0.004;
float releaseTime = 0.5; // essentially, duration of the note

int[] midiSequence = { 60, 62, 64, 65, 67, 69, 71, 72}; // These are indexes of an octave in MIDI notes.

int duration = 500; // duration between consecutive repetition of the same note 

int[] timers = new int[12]; // define 12 timers to pace the capacitive touch inputs

float currentVolume;
float[] volumeLevels = {0.5, 0.75, 1.0}; // possible volume levels to switch between
int currentVolumeIndex = 0;

int currentMode; // 0 - Sine, 1 - Square, 2 - Triangle oscillator

// An index to count up the notes
int note = 0; 

void setup() {
  size(640, 360);
  background(255);

  // define Sine, Square and Trianle oscillators
  sinOsc = new SinOsc(this);
  sqrOsc = new SqrOsc(this);
  triOsc = new TriOsc(this);

  // Create the envelope 
  env  = new Env(this);

  currentVolume = volumeLevels[currentVolumeIndex];

  currentMode = 0; // sets the default oscillator to Sine

  touch = new MPR121("i2c-1", 0x5a);

  // Initialize the timers
  for (int i = 0; i < timers.length; i++) {
    timers[i] = 0;
  }
}

void draw() {
  touch.update(); // get readings from the MPR121 I2C sensor

  // Touching electrodes 9, 10, 11 sets one of the oscillators as currently active
  if (touch.touched(9) && millis() - timers[9] > 250) {
    currentMode = 0;
    timers[9] = millis();
  }
  if (touch.touched(10) && millis() - timers[10] > 250) {
    currentMode = 1;
    timers[10] = millis();
  }
  if (touch.touched(11) && millis() - timers[11] > 250) {
    currentMode = 2;
    timers[11] = millis();
  }

  // Touching electrode 8 switches between Volume levels
  if (touch.touched(8) && millis() - timers[8] > duration) {
    currentVolumeIndex++;
    if (currentVolumeIndex > volumeLevels.length - 1) {
      currentVolumeIndex = 0;
    }
    currentVolume = volumeLevels[currentVolumeIndex];
    timers[8] = millis();
  }

  // electrodes 0 to 7 make up the keyboard of the instrument
  for (int i=0; i < 8; i++) {
    if (touch.touched(i) && millis() - timers[i] > 250) {
      playNote(i);
      timers[i] = millis();
    }
  }
} 

// This function calculates the respective frequency of a MIDI note
float midiToFreq(int note) {
  return (pow(2, ((note-69)/12.0)))*440;
}

void playNote(int index) {
  // midiToFreq transforms the MIDI value into a frequency in Hz which we use to control the triangle oscillator
  if (currentMode == 0) {
    sinOsc.play(midiToFreq(midiSequence[index]), currentVolume);
    // The envelope gets triggered with the oscillator as input and the times and levels we defined earlier
    env.play(sinOsc, attackTime, sustainTime, currentVolume, releaseTime);
  } else if (currentMode == 1) {
    sqrOsc.play(midiToFreq(midiSequence[index]), currentVolume);
    env.play(sqrOsc, attackTime, sustainTime, currentVolume, releaseTime);
  } else if (currentMode == 2) {
    triOsc.play(midiToFreq(midiSequence[index]), currentVolume);
    env.play(triOsc, attackTime, sustainTime, currentVolume, releaseTime);
  }
}
