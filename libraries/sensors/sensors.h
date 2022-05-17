#ifndef SENSORS_H_INCLUDED
#define SENSORS_H_INCLUDED
#include <DHT.h>


float readMoisture(int pin_number, int PowerPin);// function that read and return the value of soil moisture sensor in percentage

int readWaterLevel(int sensorPin, int PowerPin);// function that read the soil moisture sensor

float DHT_22_temp(int pinNumber, int PowerPin);// function that read the temperature from dht sensor 

float DHT_22_humd(int pinNumber, int PowerPin);// function that read the humidity from dht sensor

#endif // SENSORS_H_INCLUDED
