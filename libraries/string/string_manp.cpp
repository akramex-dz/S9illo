#include <iostream>
#include <string>
#include <stdio.h>
#include "string_manp.h"



float string_to_float(std::string str)
{
    return (std::stof(str));
}

/*
int string_to_int (std::string str) // la premiere version
{
    return(stoi(str));
}*/


int string_to_int (std::string str) // la deuxième version pour un seule charactere (j'ai un probleme avec le I2C avec la premiere version)
{
    if(str == "0")
        return 0;
    else if(str == "1")
        return 1;
        else if (str =="2")
            return 2;
            else if (str == "3")
                return 3;
                else if(str == "4")
                    return 4;
                    else if(str == "5")
                        return 5;
                        else if (str == "6")
                            return 6;
                            else if (str == "7")
                                return 7;
                                else if (str == "8")
                                    return 8;
                                    else if(str == "9")
                                        return 9;
                                    
                                
                            
                        
                    
                
            
        
    
}

std::string float_to_string(float number)
{
    std:: string str;
    int num = number*10;// bring the first number after dicimal
    int a = num%10;
    // writing from right to left
    str[3] = int_to_string(a);

    str[2]='.';

    num = (num-a)/10;
    a = num%10;
    str[1] = int_to_string(a);

    num = (num-a)/10;
    a = num%10;
    str[0] = int_to_string(a);

    return str;



}

char int_to_string(int num)
{
    switch(num){
        case 0:
            return '0';
            break;

        case 1:
            return '1';
            break;
        
        case 2:
            return '2';
            break;

        case 3:
            return '3';
            break;

        case 4:
            return '4';
            break;

        case 5:
            return '5';
            break;

        case 6:
            return '6';
            break;

        case 7:
            return '7';
            break;

        case 8:
            return '8';
            break;
        
        case 9:
            return '9';
            break;

        default:
            //Serial.println("ther is a probleme in 'int_to_string'");
            break;
    
    }
}
