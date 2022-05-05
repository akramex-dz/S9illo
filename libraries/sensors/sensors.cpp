#include <Arduino.h>
#include "sensors.h"

 // function that read and return the value of soil moisture sensor in percentage
float readMoisture(int pin_number, int PowerPin){ // PowerPin is the VCC Pin
  // value with %
  float moisture_percentage;
  // analog value
  int sensor_analog;

  digitalWrite(PowerPin, HIGH);  // Turn the sensor ON
  delay(10);              // wait 10 milliseconds

  // reading from the pin
  sensor_analog = analogRead(pin_number);

  digitalWrite(PowerPin, LOW);   // Turn the sensor OFF

  // conversion to %
  moisture_percentage = ( 100 - ( (sensor_analog/1023.00) * 100 ) );

  return moisture_percentage;
}

  // function that read the soil moisture sensor
int readWaterLevel(int sensorPin, int PowerPin) { // PowerPin is the VCC Pin
  digitalWrite(PowerPin, HIGH);  // Turn the sensor ON
  delay(10);              // wait 10 milliseconds
 int val = analogRead(sensorPin);    // Read the analog value form sensor
  digitalWrite(PowerPin, LOW);   // Turn the sensor OFF
  return val;             // send current reading
}
