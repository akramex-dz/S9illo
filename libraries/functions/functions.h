#ifndef FUNCTIONS_H_INCLUDED
#define FUNCTIONS_H_INCLUDED

void sendThis(std::string response); // send the string "response" to the Master (Raspberry pi) using I2C protocol

int recupererValeurPlante(int pin_number, int PowerPin); // function for reading the soil moisture level for a specific plante

void actionnerVanne(int pinNumber, int mode); // start or stop the the solenoid valve related to "pinNumber"

int niveauEau(int sensorPin, int PowerPin) ;// read the water lavel and send it to the Raspberry pi

int temperature(int pinNumber);

int humidity(int pinNumber);


#endif // FUNCTIONS_H_INCLUDED
