# Class Arduino
from Plant import Plant
import smbus

from time import sleep


class Arduino:

    
    def __init__(self, id, temp, listp, address):

        self.id_arduino = id
        self.test_temp = temp
        self.list_plante = listp
        self.address = address

    
    def recuperer_valeur_sol(self, pin, power_pin):
        
        bus = smbus.SMBus(1)
        address = self.address
        order = "1A" + str(pin) + str(power_pin) + "0000"   #hoho verifi la structure ta3ek bech dir 01 mechi 10
        l1 = []         #list des bytes
        for c in order:
            l1.append(ord(c))                               #transfer vers les bytes
        bus.write_i2c_block_data(address, 0x00, l1)
        sleep(0.5)
        rep = bus.read_i2c_block_data(address, 0)
        string = ''
        for i in range(0, 6):               #l'information contient 6 characters
            string += chr(rep[i])
        pass_bien = string[1]               #est egale a 1 si la l'information a etait bien envoyer et 0 si l'information n'etait pas bien envoyer
        if(pass_bien == "1"):
            valeur = string[2:]
            trouve = 0
            i = 0
            while trouve == 0:
                if (self.list_plante[i].pin != pin):
                    i += 1
                else:
                    trouve = 1
            self.list_plante[i].valeur_actuelle_sol = valeur
        #else:
            #On a un probleme de recuperation depuis le detecteur en essaie de relire n fois (n determiner) si l'information est toujour pas disponible en 
            # envoie un message d'erreur vers l'app



    def recuperer_valeur_temp(self, pin, power_pin):
        
        bus = smbus.SMBus(1)
        address = self.address
        if(pin <= 9 and power_pin <= 9):
            ordre = "40" + str(pin) + "0" + str(power_pin) + "0000"
        elif(pin <= 9 and power_pin >= 10):
            ordre = "40" + str(pin) + str(power_pin) + "0000"
        elif(pin >= 10 and power_pin <= 9):
            ordre = "4" + str(pin) + "0" +str(power_pin) + "0000"
        elif(pin >= 10 and power_pin >= 10):
            ordre = "4" + str(pin) + str(power_pin) + "0000"
        l1 = []         #list des bytes
        for c in ordre:
            l1.append(ord(c))                               #transfer vers les bytes
        bus.write_i2c_block_data(address, 0x00, l1)
        sleep(0.5)
        rep = bus.read_i2c_block_data(address, 0)
        string = ''
        for i in range(0, 6):               #l'information contient 6 characters
            string += chr(rep[i])
        pass_bien = string[1]               #est egale a 1 si la l'information a etait bien envoyer et 0 si l'information n'etait pas bien envoyer
        if(pass_bien == "1"):
            valeur = string[2:]
            trouve = 0
            i = 0
            while trouve == 0:
                if (self.list_plante[i].pin != pin):
                    i += 1
                else:
                    trouve = 1
            self.list_plante[i].valeur_actuelle_temp = valeur
        #else :
                #On a un probleme de recuperation depuis le detecteur en essaie de relire n fois (n determiner) si l'information est toujour pas disponible en
                # envoie un message d'erreur vers l'app




    def actioner_vanne(self, pin, temp):
        
        bus = smbus.SMBus(1)
        address = self.address
        if(pin <= 9):
            ordre = "20" + str(pin) + "000000"
        elif(pin >= 10 and pin <= 14):
            ordre = "2" + str(pin) + "000000"
        l1 = []
        for c in ordre:
            l1.append(ord(c))
        bus.write_i2c_block_data(address, 0x00, l1)

        rep = bus.read_i2c_block_data(address, 0)
        string = ''
        for i in range(0, 6):
            string += chr(rep[i])
        
        print(string) #####################
        
        sleep(temp)

        if(pin <= 9):
            ordre = "30" + str(pin) + "000000"
        elif(pin >= 10 and pin <= 14):
            ordre = "3" + str(pin) + "000000"
            
        l1 = []
        for c in ordre:
            l1.append(ord(c))
        bus.write_i2c_block_data(address, 0x00, l1)
        
        rep = bus.read_i2c_block_data(address, 0)

        string = ''
        for i in range(0, 6):
            string += chr(rep[i])

        stop = 0
        '''while not stop:             #a changer selon les critere la fonction recuperer valeur 
            rep = bus.read_i2c_block_data(address, 0)
            string = ''
            for i in range(0, 6):
                string += chr(rep[i])
            if(string[1] == "1"):
                stop = 1'''





""" print(ard1.list_plante[1].id_plante)
print(ard1.list_plante[1].pin_vanne)
print(ard1.list_plante[1].seuille)
print(ard1.list_plante[0].id_plante)
print(ard1.list_plante[0].pin_vanne)
print(ard1.list_plante[0].seuille) """








""" msg_size = size
        i2c = I2C(0, scl=Pin(scll), sda=Pin(sdaa), freq=freqq)
        adr = i2c.scan()[0]

        i2c.writeto(adr, str("1" + str(pin) + str(temp)))
        sleep(0.2)
        a = i2c.readfrom(adr, msg_size)
        while a[1] != "1":
            #i2c.writeto(adr, str("1" + str(pin) + str(temp)))
            #sleep(0.2)
            a = i2c.readfrom(adr, msg_size)
        for i in range(a[0] - 2):
            valeur = a[i + 2]
        trouve = 0
        i = 0
        while trouve == 0:
            if (self.list_plante[i].pin != pin):
                i += 1
            else:
                trouve = 1
        self.list_plante[i].valeur_actuelle = valeur
        i2c.writeto(adr, str(1)) """



""" i2c = I2C(0, scl=Pin(scll), sda=Pin(sdaa), freq=freqq)
        adr = i2c.scan()[0]

        i2c.writeto(adr, str("2" + str(pin) + str(temp))) """