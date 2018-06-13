---
title: "Getting Started"
date: 2017-08-20T21:38:52+08:00
lastmod: 2017-08-28T21:41:52+08:00
menu: "sidebar"
weight: 20
---

# Prerequisites

To run Processing on a Raspberry Pi computer, you will want to have:

-   a Raspberry Pi model 3+, 3 or 2 (those are recommended, it *will*
    work the Pi Zero and older versions, albeit much more slowly)
-   an unused microSD card, at least 8 GB in size (fast cards are a
    plus)
-   a suitable USB power supply (2.5A are recommended for the latest
    model)
-   an HDMI cable to hook up the Pi to a screen
-   a USB keyboard and mouse

# Download and preparation

Go ahead and [download](https://github.com/processing/processing/releases/download/processing-0264-3.3.7/processing-3.3.7-linux-raspbian.zip) the latest Raspbian image with Processing
pre-installed. This image is based on Processing 3.3.7 and Raspbian
release March 2018 and works on all versions of the Pi.



Also download and install [Etcher](https://etcher.io/). Etcher is a graphical tool that
makes flashing operating system images on external media very easy.

 

Launch *Etcher*, select the ZIP file you downloaded, the card reader
with your microSD card to write to (all its contents will be erased),
and click "Flash!" to start. You can eject your microSD card afterwards.

<video controls autoplay="" muted="" loop="" width="600"><source src="../media/gettingstarted_etcher.mp4" type="video/mp4"></video>


# Initial boot

With the image flashed onto the card, you can now insert the microSD
into the Raspberry Pi and power it up. At first boot, the operating
system will expand the size of its partition to encompass the entirety
of the microSD card you installed it on. When this is done, the Pi will
swiftly reboot, and you should find yourself on Raspbian's desktop a few
moments later.

The Raspbian distribution comes with settings for a British keyboard
layout as default. To change this to your locale, click the menu button
in the top-left corner, select *Preferences* and *Raspberry Pi
Configuration*. Under the *Localisation* tab, you find a button labeled
*Set Keyboard...* which prompts you to select your keyboard layout.

Users of the Raspberry Pi 3+ might also want to set the the *WiFi
Country* to where your are located it, as this is required to be using
the built-in WiFi on this model.
 
<video controls="" autoplay="" muted="" loop="" width="600" ><source src="../media/gettingstarted_preferences.mp4" type="video/mp4"></video>
 

# A first Processing sketch

To launch the Processing Development Environment (PDE) on the Raspberry
Pi, click the menu button on the top-left corner, select *Programming*
and chose *Processing* from the list of available programming
environments.

Processing works just like its siblings on desktop and laptop computers, but you can additionally make use of the Raspberry Pi's hardware interfaces and the versatile features of its free and open source Linux operating system.

<video controls="true" autoplay="" muted="" loop="" width="600"><source src="../media/gettingstarted_firstsketch.mp4" type="video/mp4"></video>