# Class Arduino

from logging import StreamHandler
from pickle import STOP
from turtle import st
from Plant import Plant
from time import sleep
import smbus
import asyncio

from time import sleep


class Arduino:

    
    def __init__(self,db, id, address, waterLevelSensor, pinWaterLevel = 0, powerPinWaterLevel = 0):

        self.id_arduino = id
        self.db = db
        self.list_plante = []
        self.address = address
        self.waterLevelSensor = waterLevelSensor
        if(waterLevelSensor == True):
            self.pinWL = pinWaterLevel
            self.powerPinWL = powerPinWaterLevel
        stream_handler_add_plant.counter = 0
        self.stream_add_plant = self.db.child("raspberries").child("1234").child("tabArduino").child(str(self.id_arduino)).child("plants").stream(stream_handler_add_plant)
    
    def stream_handler_add_plant(self, message):
        stream_handler_add_plant.counter += 1
        
        if(str(message["path"]) == "/"  and stream_handler_add_plant.counter > 1 ) :
            plant_ids = self.db.child("raspberries").child("1234").child("tabArduino").child(str(self.id_arduino)).child("plants").shallow().get()
            # get the last id added 
            list_indice_plants = []        

            for plant_id in plant_ids.val() :
                    list_indice_plants.append(plant_id)
            
            list_indice_plants.sort()

            new_plant_id = list_indice_plants[-1]

            new_plant_id = int(new_plant_id) +1

            plant = self.db.child("raspberries").child("1234").child("tabArduino").child(str(self.id_arduino)).child("plants").child(str(new_plant_id)).get()
            plant = plant.val()

            arduino =  self.db.child("raspberries").child("1234").child("tabArduino").child(str(self.id_arduino)).get()
            arduino = arduino.val()

            intelligent = self.db.child("raspberries").child("1234").child("tabArduino").child(str(self.id_arduino)).child("plants").child(str(new_plant_id)
            ).child("commands").child("smart").get()
            intelligent = intelligent.val()

            p = Plant(new_plant_id, plant["pinVanne"], plant["tMax"], plant["smMin"], plant["powerPinSM"], 
                            plant["dataPinSM"], arduino["dataPinDht"], arduino["powerPinDht"], intelligent, self.db, self, 1234)

            #addPlant(self.id_arduino, new_plant_id)

            self.list_plante.append(p)
    
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


    def recuperer_valeur_eau(self, pin, power_pin, raspberry):
        
        bus = smbus.SMBus(1)
        address = self.address
        if(power_pin <= 9):
            order = "5A" + str(pin) + "0" + str(power_pin) 
        elif(power_pin >= 10):
            order = "5A" + str(pin) + str(power_pin) 

        
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
                i = 0
                
                raspberry.waterLevel = float(valeur)
                stop = True
            else:
                cpt += 1
        
        if ( cpt == 3):
            print("erreur dans la fonction recuperer_valeur_eau")
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

