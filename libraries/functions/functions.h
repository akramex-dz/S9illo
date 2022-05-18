#ifndef FUNCTIONS_H_INCLUDED
#define FUNCTIONS_H_INCLUDED

void sendThis(std::string response); // send the string "response" to the Master (Raspberry pi) using I2C protocol

int recupererValeurPlante(int pin_number, int PowerPin); // function for reading the soil moisture level for a specific plante

void actionnerVanne(int pinNumber, int mode); // start or stop the the solenoid valve related to "pinNumber"

int niveauEau(int sensorPin, int PowerPin) ;// read the water lavel and send it to the Raspberry pi

int temperature(int pinNumber, int PowerPin);// read the temperature from dht22 then send it via i2c

int humidity(int pinNumber, int PowerPin);// read the air humidity from dht22 then send it via i2c

void traiterActionnerVanne(std:: string temp); // décode le message de la raspberry pi pour obtenir le N° de pin de la vanne et aprés actionner ou désactiver la vanne

void traiterSoilMoisture(int pin, int powerPin); // appler la function recupererValeurPlante ( j'ai utiliser cette function à cause de probleme que j'ai pas connue le type de pin par ex 'A0' donc j'ai utiliser de '#define')


#endif // FUNCTIONS_H_INCLUDED
