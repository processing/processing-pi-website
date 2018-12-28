---
title: "Reference"
date: 2017-08-20T21:38:52+08:00
lastmod: 2017-08-28T21:41:52+08:00
menu: "sidebar"
weight: 30
toc: false
---

All of the [Processing API](https://processing.org/reference/) can be used on the Raspberry Pi. There is
some additional functions that are particularly relevant to the
Raspberry Pi, as they allow Processing to make use of the Pi's extension
header pins. This functionality is available through the *Hardware I/O*
library, and is documented below.

{{% row %}}
{{% columns 4 %}}

##### GPIO

The GPIO class reads and writes from General Purpose I/O pins.  
 
[pinMode()](https://processing.org/reference/libraries/io/GPIO_pinMode_.html)  
[digitalWrite()](https://processing.org/reference/libraries/io/GPIO_digitalWrite_.html)  
[digitalRead()](https://processing.org/reference/libraries/io/GPIO_digitalRead_.html)  
[attachInterrupt()](https://processing.org/reference/libraries/io/GPIO_attachInterrupt_.html)  
[noInterrupts()](https://processing.org/reference/libraries/io/GPIO_noInterrupts_.html)  
[interrupts()](https://processing.org/reference/libraries/io/GPIO_interrupts_.html)  
[releaseInterrupt()](https://processing.org/reference/libraries/io/GPIO_releaseInterrupt_.html)  
[waitForInterrupt()](https://processing.org/reference/libraries/io/GPIO_waitForInterrupt_.html)  
[releasePin()](https://processing.org/reference/libraries/io/GPIO_releasePin_.html)

{{% /columns %}}
{{% columns 4 %}}

##### I2C

The I2C class communicates with peripherals over I2C interfaces.  

[I2C](https://processing.org/reference/libraries/io/I2C.html)  
[list()](https://processing.org/reference/libraries/io/I2C_list_.html)  
[beginTransmission()](https://processing.org/reference/libraries/io/I2C_beginTransmission_.html)  
[write()](https://processing.org/reference/libraries/io/I2C_write_.html)  
[read()](https://processing.org/reference/libraries/io/I2C_read_.html)  
[endTransmission()](https://processing.org/reference/libraries/io/I2C_endTransmission_.html)  
[close()](https://processing.org/reference/libraries/io/I2C_close_.html)

{{% /columns %}}
{{% columns 4 %}}

##### SPI

The SPI class communicates with attached devices over SPI.

[SPI](https://processing.org/reference/libraries/io/SPI.html)  
[list()](https://processing.org/reference/libraries/io/SPI_list_.html)  
[settings()](https://processing.org/reference/libraries/io/SPI_settings_.html)  
[transfer()](https://processing.org/reference/libraries/io/SPI_transfer_.html)  
[close()](https://processing.org/reference/libraries/io/SPI_close_.html)

{{% /columns %}}
{{% /row %}}
{{% row %}}
{{% columns 4 %}}

##### SoftwareServo

The SoftwareServo class controls RC servo motors attached to General Purpose I/O pins.

[SoftwareServo](https://processing.org/reference/libraries/io/SoftwareServo.html)  
[attach()](https://processing.org/reference/libraries/io/SoftwareServo_attach_.html)  
[write()](https://processing.org/reference/libraries/io/SoftwareServo_write_.html)  
[attached()](https://processing.org/reference/libraries/io/SoftwareServo_attached_.html)  
[detach()](https://processing.org/reference/libraries/io/SoftwareServo_detach_.html)

{{% /columns %}}
{{% columns 4 %}}

##### LED

The LED class controls the computer's build-in lights.  

[LED](https://processing.org/reference/libraries/io/LED.html)  
[brightness()](https://processing.org/reference/libraries/io/LED_brightness_.html)  
[close()](https://processing.org/reference/libraries/io/LED_close_.html)  
[list()](https://processing.org/reference/libraries/io/LED_list_.html)  

{{% /columns %}}
{{% columns 4 %}}

##### PWM

Use the SoftwareServo class for the time being. Hardware PWM has yet to be made available by the hardware platforms we support.

[PWM](https://processing.org/reference/libraries/io/PWM.html)  
[list()](https://processing.org/reference/libraries/io/PWM_list_.html)  
[set()](https://processing.org/reference/libraries/io/PWM_set_.html)  
[clear()](https://processing.org/reference/libraries/io/PWM_clear_.html)  
[close()](https://processing.org/reference/libraries/io/PWM_close_.html)

{{% /columns %}}
{{% /row %}}
