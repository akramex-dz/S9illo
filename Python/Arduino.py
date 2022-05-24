# Class Arduino

from pickle import STOP
from turtle import st
from Plant import Plant
from time import sleep
import smbus
import asyncio

from time import sleep


class Arduino:

    
    def __init__(self, id, address):

        self.id_arduino = id
        self.list_plante = []
        self.address = address

    
    def recuperer_valeur_sol(self, pin, power_pin, plant):
        
        bus = smbus.SMBus(1)
        address = self.address
        if(power_pin <= 9):
            order = "1A" + str(pin) + "0" + str(power_pin) 
        elif(power_pin >= 10):
            order = "1A" + str(pin) + str(power_pin) 

        
        l1 = []         #list des bytes
        for c in order:
            l1.append(ord(c))                               #transfer vers les bytes
        stop = False
        cpt = 0
        

        while not stop and cpt < 3 : 

            
            bus.write_i2c_block_data(address, 0x00, l1)
            rep = bus.read_i2c_block_data(address, 0)
            string = ''
            for i in range(0, 6):               #l'information contient 6 characters
                string += chr(rep[i])
            pass_bien = string[1]               #est egale a 1 si la l'information a etait bien envoyer et 0 si l'information n'etait pas bien envoyer
            
            
            if(pass_bien == "1"):
                valeur = string[2:]
                trouve = 0
                i = 0
                
                plant.valeur_actuelle_sol = float(valeur)
                stop = True
            else:
                cpt += 1
        
        if ( cpt == 3):
            print("erreur dans la fonction recuperer_valeur_sol")
            # on  doit envoyer un message d'erreur vers l'app 


        
        



    def recuperer_valeur_temp(self, pin, power_pin, plant):
        
        bus = smbus.SMBus(1)
        address = self.address
        if(pin <= 9 and power_pin <= 9):
            ordre = "40" + str(pin) + "0" + str(power_pin) 
        elif(pin <= 9 and power_pin >= 10):
            ordre = "40" + str(pin) + str(power_pin) 
        elif(pin >= 10 and power_pin <= 9):
            ordre = "4" + str(pin) + "0" +str(power_pin) 
        elif(pin >= 10 and power_pin >= 10):
            ordre = "4" + str(pin) + str(power_pin) 
        

        l1 = []         #list des bytes
        for c in ordre:
            l1.append(ord(c))                               #transfer vers les bytes
        
        stop = False
        cpt = 0
        while not stop  and cpt < 3:    

            bus.write_i2c_block_data(address, 0x00, l1)
            rep = bus.read_i2c_block_data(address, 0)
            string = ''
            for i in range(0, 6):               #l'information contient 6 characters
                string += chr(rep[i])
            pass_bien = string[1]               #est egale a 1 si la l'information a etait bien envoyer et 0 si l'information n'etait pas bien envoyer
            

            if(pass_bien == "1"):
                valeur = string[2:]
                print(valeur)
                trouve = 0
                i = 0
                

                plant.valeur_actuelle_temp = float(valeur)
                
                

                stop = True
            else :
                cpt += 1
            
        if (cpt == 3):
            print("erreur dans la fonction recuperer_valeur_temp")
            # on  doit envoyer un message d'erreur vers l'app 


    def recuperer_valeur_humid(self, pin, power_pin, plant):
        
        bus = smbus.SMBus(1)
        address = self.address
        if(pin <= 9 and power_pin <= 9):
            ordre = "60" + str(pin) + "0" + str(power_pin) 
        elif(pin <= 9 and power_pin >= 10):
            ordre = "60" + str(pin) + str(power_pin) 
        elif(pin >= 10 and power_pin <= 9):
            ordre = "6" + str(pin) + "0" +str(power_pin) 
        elif(pin >= 10 and power_pin >= 10):
            ordre = "6" + str(pin) + str(power_pin) 
        l1 = []         #list des bytes
        for c in ordre:
            l1.append(ord(c))                               #transfer vers les bytes
        
        stop = False
        cpt = 0
        while not stop  and cpt < 3:    

            bus.write_i2c_block_data(address, 0x00, l1)
            rep = bus.read_i2c_block_data(address, 0)
            string = ''
            for i in range(0, 6):               #l'information contient 6 characters
                string += chr(rep[i])
            pass_bien = string[1]               #est egale a 1 si la l'information a etait bien envoyer et 0 si l'information n'etait pas bien envoyer
            
            


            if(pass_bien == "1"):
                valeur = string[2:]
                trouve = 0
                i = 0
                
                plant.valeur_actuelle_humid = float(valeur)

                

                stop = True
            else :
                cpt += 1
            
        if (cpt == 3):
            print("erreur dans la fonction recuperer_valeur_humid")
            # on  doit envoyer un message d'erreur vers l'app 
       




    async def actioner_vanne(self, pin, temp):
        
        bus = smbus.SMBus(1)
        address = self.address
        if(pin <= 9):
            ordre = "20" + str(pin) + "00"
        elif(pin >= 10 and pin <= 14):
            ordre = "2" + str(pin) + "00"
        l1 = []
        for c in ordre:
            l1.append(ord(c))
        bus.write_i2c_block_data(address, 0x00, l1)

        rep = bus.read_i2c_block_data(address, 0)
        string = ''
        for i in range(0, 6):
            string += chr(rep[i])
        
        
        await asyncio.sleep(temp)


        if(pin <= 9):
            ordre = "30" + str(pin) + "00"
        elif(pin >= 10 and pin <= 14):
            ordre = "3" + str(pin) + "00"
            
        l1 = []
        for c in ordre:
            l1.append(ord(c))
        bus.write_i2c_block_data(address, 0x00, l1)
        
        rep = bus.read_i2c_block_data(address, 0)

        string = ''
        for i in range(0, 6):
            string += chr(rep[i])

    
    def actioner_vanne_not_async(self, pin, temp):
        
        bus = smbus.SMBus(1)
        address = self.address
        if(pin <= 9):
            ordre = "20" + str(pin) + "00"
        elif(pin >= 10 and pin <= 14):
            ordre = "2" + str(pin) + "00"
        l1 = []
        for c in ordre:
            l1.append(ord(c))
        bus.write_i2c_block_data(address, 0x00, l1)

        rep = bus.read_i2c_block_data(address, 0)
        string = ''
        for i in range(0, 6):
            string += chr(rep[i])
        
        
        sleep(temp)


        if(pin <= 9):
            ordre = "30" + str(pin) + "00"
        elif(pin >= 10 and pin <= 14):
            ordre = "3" + str(pin) + "00"
            
        l1 = []
        for c in ordre:
            l1.append(ord(c))
        bus.write_i2c_block_data(address, 0x00, l1)
        
        rep = bus.read_i2c_block_data(address, 0)

        string = ''
        for i in range(0, 6):
            string += chr(rep[i])

