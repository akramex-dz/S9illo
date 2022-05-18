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

std::string float_to_string(float num)
{
    return(std::to_string(num));
}

std::string int_to_string(int num)
{
    return(std::to_string(num));
}
