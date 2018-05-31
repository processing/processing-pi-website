---
title: "Reference"
date: 2017-08-20T21:38:52+08:00
lastmod: 2017-08-28T21:41:52+08:00
menu: "sidebar"
weight: 30
toc: false
---

All of the [Processing API] can be used on the Raspberry Pi. There is
some additional functions that are particularly relevant to the
Raspberry Pi, as they allow Processing to make use of the Pi's extension
header pins. This functionality is available through the *Hardware I/O*
library, and is documented below.

 

##### GPIO

The GPIO class reads and writes from General Purpose I/O pins.  
  
[pinMode()][]  
[digitalWrite()][]  
[digitalRead()][]  
[attachInterrupt()][]  
[noInterrupts()][]  
[interrupts()][]  
[releaseInterrupt()][]  
[waitForInterrupt()][]  
[releasePin()]  
  

##### I2C

The I2C class communicates with peripherals over I2C interfaces.  
  
[I2C][]  
[list()][]  
[beginTransmission()][]  
[write()][]  
[read()][]  
[endTransmission()][]  
[close()]  
  

##### LED

The LED class controls the computer's build-in lights.  
  
[LED][]  
[list()][1]  
[brightness()][]  
[close()][2]  


##### PWM

Use the SoftwareServo class below for the time being. Hardware PWM has yet to be made available by the hardware platforms we support.

[PWM][]  
[list()][3]  
[set()][]  
[clear()][]  
[close()][4]  


##### SoftwareServo

The SoftwareServo class controls RC servo motors attached to General Purpose I/O pins.

[SoftwareServo][]  
[attach()][]  
[write()][5]  
[attached()][]  
[detach()][]  


##### SPI

The SPI class communicates with attached devices over SPI interfaces.

[SPI][]  
[list()][6]  
[settings()][]  
[transfer()][]  
[close()][7]  


  [Processing API]: https://processing.org/reference/
  [pinMode()]: https://processing.org/reference/libraries/io/GPIO_pinMode_.html
  [digitalWrite()]: https://processing.org/reference/libraries/io/GPIO_digitalWrite_.html
  [digitalRead()]: https://processing.org/reference/libraries/io/GPIO_digitalRead_.html
  [attachInterrupt()]: https://processing.org/reference/libraries/io/GPIO_attachInterrupt_.html
  [noInterrupts()]: https://processing.org/reference/libraries/io/GPIO_noInterrupts_.html
  [interrupts()]: https://processing.org/reference/libraries/io/GPIO_interrupts_.html
  [releaseInterrupt()]: https://processing.org/reference/libraries/io/GPIO_releaseInterrupt_.html
  [waitForInterrupt()]: https://processing.org/reference/libraries/io/GPIO_waitForInterrupt_.html
  [releasePin()]: https://processing.org/reference/libraries/io/GPIO_releasePin_.html
  [I2C]: https://processing.org/reference/libraries/io/I2C.html
  [list()]: https://processing.org/reference/libraries/io/I2C_list_.html
  [beginTransmission()]: https://processing.org/reference/libraries/io/I2C_beginTransmission_.html
  [write()]: https://processing.org/reference/libraries/io/I2C_write_.html
  [read()]: https://processing.org/reference/libraries/io/I2C_read_.html
  [endTransmission()]: https://processing.org/reference/libraries/io/I2C_endTransmission_.html
  [close()]: https://processing.org/reference/libraries/io/I2C_close_.html
  [LED]: https://processing.org/reference/libraries/io/LED.html
  [1]: https://processing.org/reference/libraries/io/LED_list_.html
  [brightness()]: https://processing.org/reference/libraries/io/LED_brightness_.html
  [2]: https://processing.org/reference/libraries/io/LED_close_.html
  [PWM]: https://processing.org/reference/libraries/io/PWM.html
  [3]: https://processing.org/reference/libraries/io/PWM_list_.html
  [set()]: https://processing.org/reference/libraries/io/PWM_set_.html
  [clear()]: https://processing.org/reference/libraries/io/PWM_clear_.html
  [4]: https://processing.org/reference/libraries/io/PWM_close_.html
  [SoftwareServo]: https://processing.org/reference/libraries/io/SoftwareServo.html
  [attach()]: https://processing.org/reference/libraries/io/SoftwareServo_attach_.html
  [5]: https://processing.org/reference/libraries/io/SoftwareServo_write_.html
  [attached()]: https://processing.org/reference/libraries/io/SoftwareServo_attached_.html
  [detach()]: https://processing.org/reference/libraries/io/SoftwareServo_detach_.html
  [SPI]: https://processing.org/reference/libraries/io/SPI.html
  [6]: https://processing.org/reference/libraries/io/SPI_list_.html
  [settings()]: https://processing.org/reference/libraries/io/SPI_settings_.html
  [transfer()]: https://processing.org/reference/libraries/io/SPI_transfer_.html
  [7]: https://processing.org/reference/libraries/io/SPI_close_.html
