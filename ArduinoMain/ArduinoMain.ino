
#include <Wire.h>
#include <DHT.h>
#define dataPin 7 // dht data pin
#define DHTType DHT22
//DHT dht = DHT(dataPin, DHTType);
#include <string_manp.h>
#include <sensors.h>
#include <functions.h>

#define MoisturePin A1 // here i'll define the pins
#define PowerPin 7 // this will be the VCC for the sensors 


void setup() {
  Wire.begin(0x8);
  Wire.onReceive(receiveEvent);
  Serial.begin(9600);
  
}

void loop() {
  /*delay(2000);
  Serial.print("temp: ");
  Serial.print(DHT_22_temp(7));
  Serial.print("c°");
  delay(2000);
  Serial.print("|| Humd: ");
  Serial.print(DHT_22_humd(7));
  Serial.println("%");
  Serial.println();*/
}

void receiveEvent( int howMany ){
  
}
