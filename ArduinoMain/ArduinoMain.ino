
#include <Wire.h>

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

 // function that read and return the value of soil moisture sensor in percentage
float readMoisture(int pin_number){
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
int readWaterLevel(int sensorPin) {
  digitalWrite(PowerPin, HIGH);  // Turn the sensor ON
  delay(10);              // wait 10 milliseconds
 int val = analogRead(sensorPin);    // Read the analog value form sensor
  digitalWrite(PowerPin, LOW);   // Turn the sensor OFF
  return val;             // send current reading
}
