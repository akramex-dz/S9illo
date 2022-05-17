#include <Arduino.h>
#include <Wire.h>
#include "sensors.h"
#include "string_manp.h"
#include "functions.h"

#define ANSWER_SIZE 6

// using namespace std ;

void sendThis(std::string response) // send the string "response" to the Master (Raspberry pi) using I2C protocol
{
    byte resp[ANSWER_SIZE]; // the table that contains the response in bytes

    for (byte i = 0; i < ANSWER_SIZE; ++i)
    {
        resp[i] = (byte)response[i];
    }

    Wire.write(resp, sizeof(response)); // sending the response
}

int recupererValeurPlante(int pin_number, int PowerPin) // function for reading the soil moisture level for a specific plante
{
    float moistureLevel = readMoisture(pin_number, PowerPin); // reading from the sensor

    if (0 /* i'll write here a condition where i can't read from the sensor*/)
        return 0;
    std::string moisture = float_to_string(moistureLevel); // converting soil moisture value to string

    // formatting the answer string ( it's gonna be sent to the Raspberry)
    std::string answer = "11";
    answer = answer + moisture;

    sendThis(answer); // sending the response

    return 1;
}

void actionnerVanne(int pinNumber, int mode) // start or stop the the solenoid valve related to "pinNumber"
{
    char answer[6];
    if (mode == 1)
    {
        digitalWrite(pinNumber, HIGH);
        answer[0] = '2';
        answer[1] = '1';
        answer[2] = '0';
        answer[3] = '0';
        answer[4] = '0';
        answer[5] = '0';
    }

    else
    {
        digitalWrite(pinNumber, LOW);
        answer[0] = '3';
        answer[1] = '1';
        answer[2] = '0';
        answer[3] = '0';
        answer[4] = '0';
        answer[5] = '0';
    }

    sendThis(answer); 
}

int niveauEau(int sensorPin, int PowerPin) // read the water lavel and send it to the Raspberry pi
{
    int waterLavel = readWaterLevel(sensorPin, PowerPin); // reading water lavel from sensor

    if (0 /* i'll write here a condition where i can't read from the sensor*/)
        return 0;

    std::string lavel = int_to_string(waterLavel); // converting water lavel value to string

    // formatting the answer string ( it's gonna be sent to the Raspberry)
    char answer[6];
    // std::string answer = "51" + lavel;

    answer[0] = '5';
    answer[1] = '1';
    answer[2] = lavel[0];
    answer[3] = lavel[1];
    answer[4] = lavel[2];
    answer[5] = lavel[3];

    sendThis(answer); // sending the response

    return 1;
}

int temperature(int pinNumber, int PowerPin)
{
    float temp = DHT_22_temp(pinNumber, PowerPin); // reading temperature

    char answer[6];

    if (temp == 100) // error code
    {
        // answer = "400000";
        answer[0] = '4';
        answer[1] = '0';
        answer[2] = '0';
        answer[3] = '0';
        answer[4] = '0';
        answer[5] = '0';
        sendThis(answer);
        return 0;
    }

    std::string str_temp = float_to_string(temp);

    // answer = "41" + str_temp;
    answer[0] = '4';
    answer[1] = '1';
    answer[2] = str_temp[0];
    answer[3] = str_temp[1];
    answer[4] = str_temp[2];
    answer[5] = str_temp[3];

    sendThis(answer);

    return 1;
}

int humidity(int pinNumber, int PowerPin)
{
    float humd = DHT_22_humd(pinNumber, PowerPin);

    char answer[6];

    if (humd == 200) // error code
    {
        answer[0] = '6';
        answer[1] = '0';
        answer[2] = '0';
        answer[3] = '0';
        answer[4] = '0';
        answer[5] = '0';
        sendThis(answer);
        return 0;
    }

    std::string str_humd = float_to_string(humd);

    // answer = "61" + str_humd;
    answer[0] = '6';
    answer[1] = '1';
    answer[2] = str_humd[0];
    answer[3] = str_humd[1];
    answer[4] = str_humd[2];
    answer[5] = str_humd[3];
    sendThis(answer);

    return 1;
}
