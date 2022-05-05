#include <Arduino.h>
#include <Wire.h>
#include "sensors.h"
#include "string_manp.h"
#include "functions.h"

#define ANSWER_SIZE 6

//using namespace std ;

void sendThis(std::string response)
{
    byte resp[ANSWER_SIZE]; // the table that contains the response in bytes 

    for (byte i=0; i< ANSWER_SIZE; ++i){
        resp[i] = (byte)response[i];
    }
     
    Wire.write(resp, sizeof(response)); // sending the response
}


int recupererValeurPlante(int pin_number, int PowerPin) // function for reading the soil moisture level for a specific plante
{
    float moistureLevel = readMoisture(pin_number, PowerPin) ; // reading from the sensor

    if (0 /* i'll write here a condition where i can't read from the sensor*/)
        return 0;
    std::string moisture = float_to_string(moistureLevel); // converting soil moisture value to string

     // formatting the answer string ( it's gonna be sent to the Raspberry)
    std::string answer = "11";
    answer = answer+moisture;

    sendThis(answer); // sending the response

    return 1;
}
