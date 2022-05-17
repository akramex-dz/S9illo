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
    if (str == "1")
        return 1;
    if (str == "2")
        return 2;
    if (str == "3")
        return 3;
    if (str == "4")
        return 4;
    if (str == "5")
        return 5;
    if (str == "6")
        return 6;
    if (str == "7")
        return 7;
    if (str == "8")
        return 8;
    if (str == "9")
        return 9;    

}

std::string float_to_string(float num)
{
    return(std::to_string(num));
}

std::string int_to_string(int num)
{
    return(std::to_string(num));
}
