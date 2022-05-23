
#include <Wire.h>
#include <DHT.h>

#include <string_manp.h>
#include <sensors.h>
#include <functions.h>

 
#define A0 A0
#define A1 A1
#define A2 A2
#define A3 A3
#define A4 A4
#define A5 A5 
#define A6 A6


int cmd=0; // le type de commande envoyer par la raspberry ( 1, ... , 6) ( voir le tableau de codage raspberry => arduino ) 
char temp[9]; // string comming from the raspberry  (action|dataPin|powerPin)
                                                  //(   1   |  2   |    2   )
void setup() {
  Wire.begin(0x08);
  Wire.onReceive(receiveEvent);
  Wire.onRequest(requestEvent);
  Serial.begin(9600);
  
  pinMode(0,OUTPUT);
  pinMode(1,OUTPUT);
  pinMode(2,OUTPUT);
  pinMode(3,OUTPUT);
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(6,OUTPUT);
  pinMode(7,OUTPUT);
  pinMode(8,OUTPUT);
  pinMode(9,OUTPUT);
  
  
  
}

void loop() {
  
}

void receiveEvent( int howMany ){
  
   
  for (int i = 0; i < howMany; i++) {
    temp[i] = Wire.read();
    temp[i + 1] = '\0'; //add null after ea. char
  }

  for (int i = 0; i < howMany; ++i)
    temp[i] = temp[i + 1];
    //remp contient le message envoyer par la raspberry
  std:: string comand;
  
  comand = temp[0]; 

  cmd = string_to_int(comand); // convertire vers int
  Serial.print("cmd = ");
  Serial.println(cmd);

  
}

void requestEvent(){  
  std:: string str ;
  int pin;// N° de pin
  int powerPin;

  
  if (cmd>=2 && cmd<=3){// actionner ou déactionner pompe néssicite qu'un seule pin et ce pin et entre 1 et 14
      traiterActionnerVanne(temp);    
  }

  
  else if(cmd==1 || (cmd >= 4 && cmd <= 6 ) ) { //cmd == 1/ 4 /5 / 6 ( donc on a 
    
    // decodingg PowerPin
    str = temp[3];
    int a= string_to_int(str); // the first number
    str = temp[4]; // le deuxieme chiffre
    int b = string_to_int(str);
    powerPin = a*10+b; // concatination

    // Now we have the PowerPin

    if( cmd == 1 || cmd == 5 ){ // Soil Moisture or Water Lavel ( we need analog pin )
      str = temp[2]; // the Second number of the analog pin for ex: A0, A1 ...
      pin = string_to_int( str);

      if(cmd == 1 ){ // Soil Moisture
        traiterSoilMoisture(pin, powerPin);
      }
      else if(cmd == 5 ){ // Water Lavel
        traiterWaterLavel(pin , powerPin);
      }
    }
    else if ( cmd == 4 || cmd == 6){ // Temperature or air humidity
      // decodingg the data Pin
      str=temp[1];
      a= string_to_int(str); // the first number
      str = temp[2]; // le deuxieme chiffre
      b = string_to_int(str);
      pin = a*10+b; // concatination

      if(cmd == 4){ //temperature
        temperature(pin, powerPin);
      }
      else if(cmd == 6){ // humidity
        humidity(pin, powerPin);
      }
    }
   
  }

}
