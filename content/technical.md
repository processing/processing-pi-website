---
title: "Technical"
date: 2018-05-27T21:38:52+08:00
lastmod: 2018-05-27T21:41:52+08:00
menu: "sidebar"
weight: 65
---


# Technical Notes

## Introduction

The (original) **Raspberry Pi** contained an ARMv6 CPU, and 256 or 512 MB RAM. The **Raspberry Pi 2** contains a quad-core ARMv7 CPU, and 1 GB of RAM. The **Raspberry Pi 3** and **3+** contain a quad-core ARMv8 (64-bit) CPU, which can also be operated in an ARMv7 compatible mode. It contains the same 1 GB of RAM. The **Raspberry Pi Zero** and **Raspberry Pi Zero W** feature the same ARMv6 CPU as the original Raspberry Pi, and 512 MB RAM. They all contain the same Broadcom VideoCore IV graphics processor.

All models primarily run a modified version of the Debian Linux distribution named [Raspbian](http://www.raspbian.org/) that was made to run on the ARMv6 CPU (and higher).

On the Pi 2, 3 and 3+ it is also possible to run other, unmodified Linux distributions, such as Debian or Fedora, since those settled on the ARMv7 architecture as their "baseline" for modern ARM support. However on those distributions you might not have the necessary kernel modules and graphics library to make full use of the Pi's peripherals. This page thus specifically talks about running Processing on Raspbian.

## "Legacy" Graphics

The Pi's graphics core exposes OpenGL ES 2.0, which is supported by Processing P2D and P3D renderer, thanks to specific enablement in the underlying library, JOGL. The graphics driver are built around a closed-source driver (found in `/opt/vc`), which limits our ability to troubleshoot bugs for the moment.

Due to a limitation of this driver, P3D is currently limited to using two lights.

Certain sketches might run out of video memory and throw an exception mentioning `GL_OUT_OF_MEMORY`. You might be able to work around this by changing the *memory split* - the amount of memory allocated for the GPU from all system memory. To do so, open the **Raspberry Pi Configuration** (under *Menu*, *Preferences*), navigate to the *Performance* tab, change the amount of "GPU memory" and then restart your Pi.

## Experimental Graphics

Alternatively, Raspbian also includes a free and open source Mesa driver, named `vc4`, which can be enabled by running `sudo raspi-config` in a terminal, and selecting either *GL (Full KMS)* or *GL (Fake KMS)* under *Advanced Options* and *GL Driver*. (The current default is *Legacy*, which is described in the section above.)

This driver might run notably faster than the legacy graphics, supports up to four lights, and does not show some glitches that plague the other driver.

As of now the experimental driver does not yet support hardware-enabled video decoding, the camera module, as well as some screens that can be attached to the DSI interface, which should be forthcoming in future versions of Raspbian.

## GPIO

Keep in mind that the Pi uses **3.3V levels**, rather then the 5V of the Arduino Uno. The pins are said not to be 5V tolerant, so make sure to keep your voltages to 3.3V.

Each pin is rated up to **16 mA per pin**, with **50 mA total**, across all pins. (The Arduino UNO is 20 mA @ 5V per pin.) Make sure not to draw more current.

The Hardware I/O library's [GPIO](https://processing.org/reference/libraries/io/GPIO.html) class uses GPIO numbers with its methods. Those are not the same as the physical pin numbers of the pin header. (see [pinout](https://pinout.xyz/))

## I2C

The Pi has one (publicly exposed) hardware I2C interface. To use it in Processing (with the [I2C](https://processing.org/reference/libraries/io/I2C.html) class in processing.io), open the **Raspberry Pi Configuration** (under *Menu*, *Preferences*), navigate to the *Interfaces* tab, enable I2C and then restart your Pi.

After restarting, [I2C.list()](https://processing.org/reference/libraries/io/I2C_list_.html) should return one interface: e.g. `i2c-1` on the Pi 2. The interface is located on pins 3 (SDA) and 5 (SCL) on the Pi's header. (see [pinout](https://pinout.xyz/)) Ground is conveniently located right next to it, on pin 6. Use it together with the 3.3V supply on pin 1, since that is the level that the Pi expects.

## SPI

The Pi two hardware SPI interfaces, but which share all but the SS (*Slave Select*) pins. To use it in Processing (with the [SPI](https://processing.org/reference/libraries/io/SPI.html) class in processing.io), open the **Raspberry Pi Configuration** (under *Menu*, *Preferences*), navigate to the *Interfaces* tab, enable SPI and then restart your Pi.

After restarting, [SPI.list()](https://processing.org/reference/libraries/io/I2C_list_.html) should return two interfaces `spidev0.0` and `spidev0.1`.

The interfaces' pins are located on the Pi's header on pins 19 (MOSI), 21 (MISO), 23 (SCLK), 24 (SS, aka CE0) and 26 (SS, aka CE1). (see [pinout](https://pinout.xyz/)) When using `spidev0.0`, pin 24 (CE0) is being pulled low during a transaction, while pin26 (CE1) remains unchanged. When using `spidev0.1`, pin 26 (CE1) is being pulled low, while pin24 (CE0) remains unchanged. (This is to be able to address two devices on the same data & clock lines.)

## LEDs

The Pi has two on-board LEDs, `led0` and `led1`, which can be controlled through the [LED](https://processing.org/reference/libraries/io/LED.html) class in Processing.

Since the regular user (named `pi`) is by default not permitted to write to the LED device, you must enable this **once** by running

    sudo sed -i 's|exit 0|chmod -R a+rw /sys/class/leds/*\nexit 0|' /etc/rc.local

After a restart, the devices should be read- and writable by any user. (This can be confirmed by running `ls -l /sys/class/leds/led0/brightness`. The resulting line should start with `-rw-rw-rw-`.)

On the Pi, `led0` is the green (I/O activity) light, while `led1` is the red (power) light. They only can be turned on and off, so [brightness()](https://processing.org/reference/libraries/io/LED_brightness_.html) values besides 0.0 and 1.0 have no effect.

## Serial

The Pi has one exposed serial port, on pins 8 (TXD) and 10 (RXD). (see [pinout](https://pinout.xyz/)) Like all other pins, these operate on 3.3V TTL levels, instead of the RS-232 voltage levels normally expected from a computer's "serial port".

To enable the serial port device to be used with Processing, start the text-based Raspberry Pi Configuration tool by executing the following command in a terminal:

    sudo raspi-config

With the arrow-keys and Enter, navigate to *Interfacing Options*, *Serial*. In the dialog that appears, answer *No* to the question whether or not to use the port for a login shell. Answer *Yes* to the question whether the serial port hardware should be enabled. Reboot the Raspberry Pi for the changes to have effect.

The serial port will be available to Processing's [Serial](https://processing.org/reference/libraries/serial/index.html) library under the name `/dev/serial0`. (This will be an alias to `/dev/ttyS0` on models that have Bluetooth functionality, and an alias to `/dev/ttyAMA0` on models that lack Bluetooth.)

## Video library

Use the new [GL Video](https://github.com/gohai/processing-glvideo) library to make use of the Raspberry Pi's accelerated video decoding hardware. (also available from the Contribution Manager)

[Examples](https://github.com/gohai/processing-glvideo/tree/master/examples) show the various ways the library can be used. Please file issues [here](https://github.com/gohai/processing-glvideo/issues/new).

### Video library: Capture

If you're receiving the error `IllegalArgumentException: No such Gstreamer factory: v4l2src` with the (regular) Video library, try installing the necessary packages by executing `sudo aptitude install gstreamer0.10-plugins-good` in a terminal.

*Alternatively*, the [GL Video](https://github.com/gohai/processing-glvideo) library also contains some (very limited) functionality for using capture hardware. See [this example](https://github.com/gohai/processing-glvideo/tree/master/examples/SimpleCapture) for details.

If you want to use the Raspberry Pi camera with the [GL Video](https://github.com/gohai/processing-glvideo) library, add the following line to your `/etc/modules` file and reboot:

    bcm2835_v4l2

(Note this is a lowercase `L` not a number one.) After the reboot your camera should show up as `/dev/video0`.

## Touchscreen

The [simpletouch library](https://github.com/gohai/processing-simpletouch/releases/download/latest/processing-simpletouch.zip) makes it possible to use any multi-touch-enabled display or trackpad with Processing, as long as the device is supported by the Linux kernel. This library is available through the Contribution Manager under the name "Simple Touch".

This works well with the official [Raspberry Pi display](https://www.raspberrypi.org/blog/the-eagerly-awaited-raspberry-pi-display/), and allows for tracking of up to 10 fingers.

[Two example sketches](https://github.com/gohai/processing-simpletouch/tree/master/examples) the library comes with explain how to use it. Please file issues [here](https://github.com/gohai/processing-simpletouch/issues/new).

## Libraries

Most libraries from the Contribution Manager work just fine without any change necessary to run on ARM. Exception to this are libraries that comes with parts written in "native code", which is platform- and architecture-dependent, and hence needs updating. As a general rule of thumb: if you find (sub-) directories for different platforms inside the library's library directory, then this is likely the case.

If you come across a library that's not working, or if you need help compiling a library for ARM, please open an [issue](https://github.com/processing/processing/issues/new?labels=arm&assignee=gohai).

### Library: OpenCV

ARM devices are supported by Greg Borenstein's [OpenCV library](https://github.com/atduskgreg/opencv-processing) starting with version 0.5.4 (available in the Contribution Manager).

### Library: OpenKinect

A test version of [Open Kinect for Processing](http://shiffman.net/p5/kinect/), with support for armv6hf, can be found [here](http://sukzessiv.net/~gohai/p5-arm/processing-openkinect-arm-fixes-4d25eb2.zip). (PR [#1](https://github.com/shiffman/OpenKinect-for-Processing/pull/46) [#2](https://github.com/shiffman/OpenKinect-for-Processing/pull/50)) On most ARM devices this will only work (if at all) with the Kinect 1, because of the high demand on USB throughput of the Kinect 2. Don't forget to place the file [51-kinect.rules](https://raw.githubusercontent.com/OpenKinect/libfreenect/master/platform/linux/udev/51-kinect.rules) in `/etc/udev/rules.d` for Processing to be able to access the Kinect's camera.

### Library: PureData

The [puredatap5 library](https://github.com/libpd/puredatap5/raw/3abdfad807365259e7378b3c2f9ddce392f93738/pdp5.zip) allows you to write sketches in Processing that control and interact with musical patches prepared in Pure Data. See the accompanying HelloPd example for how it works. This library requires `PortAudio` to be installed, which seems to be the case for current releases of the Raspbian distribution. This library is not yet available through the Contribution Manager, but support for ARM was merged into its main [repository](https://github.com/libpd/puredatap5). 

### Library: Processing Sound

ARM devices are supported by Processing's [Sound library](https://github.com/processing/processing-sound) starting with version 1.4.0 (available in the Contribution Manager).

## FX2D

The experimental FX2D renderer is not supported on ARM, because Oracle dropped support for JavaFX on ARM devices with Java 8u33. We might want to try using OpenJFX project in the future, but as of now this is unsupported.
