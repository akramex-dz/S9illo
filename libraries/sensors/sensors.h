#ifndef SENSORS_H_INCLUDED
#define SENSORS_H_INCLUDED

float readMoisture(int pin_number, int PowerPin);// function that read and return the value of soil moisture sensor in percentage

int readWaterLevel(int sensorPin, int PowerPin);// function that read the soil moisture sensor

#endif // SENSORS_H_INCLUDED
