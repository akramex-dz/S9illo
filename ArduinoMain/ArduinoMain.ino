
#include <Wire.h>
#include <string_manp.h>
#include <sensors.h>
#include <functions.h>

#define MoisturePin A1 // here i'll define the pins
#define PowerPin 7 // this will be the VCC for the sensors 


void setup() {
  // join the arduino as a slave with addresse 8
  // Set D7 as an OUTPUT
  pinMode(PowerPin, OUTPUT);
  
  // Set to LOW so no power flows through the sensor
  digitalWrite(PowerPin, LOW);
  
  Wire.begin(0x8);
  Wire.onReceive(receiveEvent);
  
}

void loop() {
  // put your main code here, to run repeatedly:
 
}

void receiveEvent( int howMany ){
  
}
