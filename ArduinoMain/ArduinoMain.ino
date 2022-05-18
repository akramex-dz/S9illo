
#include <Wire.h>
#include <DHT.h>
//#define dataPin 7 // dht data pin
//#define DHTType DHT22
//DHT dht = DHT(dataPin, DHTType);
#include <string_manp.h>
#include <sensors.h>
#include <functions.h>

//#define MoisturePin A1 // here i'll define the pins
//#define PowerPin 7 // this will be the VCC for the sensors 
#define A0 A0
#define A1 A1
#define A2 A2
#define A3 A3
#define A4 A4
#define A5 A5 
#define A6 A6


int cmd=0; // le type de commande envoyer par la raspberry ( 1, ... , 6) ( voir le tableau de codage raspberry => arduino ) 
char temp[9]; // string comming from the raspberry  (action|pin|/*powerPin*/|time)
                                                  //(   1   | 2 |   3    | 4 )
void setup() {
  Wire.begin(0x08);
  Wire.onReceive(receiveEvent);
  Wire.onRequest(requestEvent);
  Serial.begin(9600);
  pinMode(1,OUTPUT);
  
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
      /*Serial.println("im here");  
      str = temp[1]; // le premier chiffre du pin du pompe
      int a = string_to_int(str); 
      str = temp[3];
       // il faut que si la raspberry veut envoyer un nombre de pin entre 1 et 9 que temp[3] == "1" sinon si le pin est entre 10 et 14 temp[3]=="0" 
       // ceci est faite pour eviter de confendre entre par ex '2100000' est ce que le pin est 1 ou 10 donc si on veut 1 on va faire '2101000'
      if ( str == "1" ){// le pin et entre 1 et 9 
           pin = a; // donc c'est 'a'
      }
      else{ // le pin est entre 10 et 14
        str = temp[2];
        int b = string_to_int(str); // le deuxieme chiffre
        pin = a*10+b; // concatination
      }
      Serial.print("le pin:");
      Serial.print(pin);

      actionnerVanne(pin , cmd-1); // si cmd == 2 donc il va allumer sinon il va l'eteint */    
  }
  else if(cmd==1 || (cmd >= 3 && cmd <= 6 ) ) { //cmd == 1/ 3/ 4 /5 / 6 ( donc on a 
    if( temp[1] == 'A' ){ // normalement temp[1] == 'A'
      str = temp[2]; // the second number 0,1, ...,6
      pin = string_to_int(str);
       // decoding the value of the powerPin
      str = temp[3];
      int a= string_to_int(str); // the first number 
      str = temp[5];
      // il faut que si la raspberry veut envoyer un nombre de powePin entre 1 et 9 que temp[5] == "1" sinon si le powePin est entre 10 et 14 temp[5]=="0" 
      // ceci est faite pour eviter de confendre entre par ex '1A1100000' est ce que le powePin est 1 ou 10 donc si on veut 1 on va faire '1A1101000'
      if (str == "1"){
        powerPin = a; // donc c'est 'a'
      }
      else { // temp[5] == "0" donc le powerPin contient deux chiffres
        str = temp[4]; // le deuxieme chiffre
        int b = string_to_int(str);
        powerPin = a*10+b; // concatination
      }
      // now i have the pin and the powerPin

      if ( cmd == 1){ // recuperer valeur plante ( soil moisture sensor )
        traiterSoilMoisture(pin, powerPin);
        /*switch(pin){
          case 0:
             recupererValeurPlante(A0,powerPin) ;
             break;
          case 1:
             recupererValeurPlante(A1,powerPin) ;
             break;
          case 2:
             recupererValeurPlante(A2,powerPin) ;
             break;
          case 3:
             recupererValeurPlante(A3,powerPin) ;
             break;
          case 4:
             recupererValeurPlante(A4,powerPin) ;
             break;
          case 5:
             recupererValeurPlante(A5,powerPin) ;
             break;
          case 6:
             recupererValeurPlante(A6,powerPin) ;
             break;
          default :
             Serial.println("there is something wrong !");
             break;

        }*/
      } // end of cmd ==1
      
      
    } 
   
  }

}
