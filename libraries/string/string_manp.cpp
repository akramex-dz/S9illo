#include <iostream>
#include <string>
#include "string_manp.h"



float string_to_float(std::string str)
{
    return (std::stof(str));
}

int string_to_int (std::string str)
{
    return(stoi(str));
}

std::string float_to_string(float num)
{
    return(std::to_string(num));
}

std::string int_to_string(int num)
{
    return(std::to_string(num));
}
