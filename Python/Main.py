from asyncio import tasks
from Plant import Plant
from Raspberry import Raspberry
from Arduino import Arduino
import pyrebase
import time
import asyncio
from datetime import date, datetime



configuration ={
"apiKey": "AIzaSyBGJhJzJlJDfnU5h-uq56NDka6ZmJkU6Os",
"authDomain": "s9illolatestedition.firebaseapp.com",
"databaseURL": "https://s9illolatestedition-default-rtdb.europe-west1.firebasedatabase.app",
"projectId": "s9illolatestedition",
"storageBucket": "s9illolatestedition.appspot.com",
"messagingSenderId": "571948003738",
"appId": "1:571948003738:web:242ae0a20f78f91e8b4a23"
                  }

firebase = pyrebase.initialize_app(configuration)
db = firebase.database()




""" p1 = Plant(db, True, 0, 0, 1234, 0, 0)
p2 = Plant(db, True, 1, 1, 1234, 0, 1)
l1 = [p1, p2] """

""" ard = Arduino(0, 8)

p = Plant(0, 1, 25, 5, 3, "0", 10, 5, True, db ,ard , 1234)
p1 = Plant(1, 0, 25, 5, 3, "0", 10, 5, True, db ,ard , 1234)

l1 = [p, p1]

ard.list_plante = l1



l2 = [ard]



bleutooth = "hey"

rasp = Raspberry(l2, configuration, bleutooth, 1234) """

arduinos_ids = db.child("raspberries").child("1234").child("tabArduino").shallow().get()

arduinos_ids = arduinos_ids.val()



list_arduinos = []

for id_arduino in arduinos_ids :
        
        arduino = db.child("raspberries").child("1234").child("tabArduino").child(str(id_arduino)).get()
        arduino = arduino.val()
        ard = Arduino( str(id_arduino) , arduino["i2cAdr"])

        plants_ids = db.child("raspberries").child("1234").child("tabArduino").child(str(id_arduino)).child("plants").shallow().get()
        plants_ids = plants_ids.val()
        for id_plant in range(1): #plants_ids :###############################################################
                plant = db.child("raspberries").child("1234").child("tabArduino").child(str(id_arduino)).child("plants").child(str(id_plant)).get()
                plant = plant.val()

                intelligent = db.child("raspberries").child("1234").child("tabArduino").child(str(id_arduino)).child("plants").child(str(id_plant)
        ).child("commands").child("smart").get()
                intelligent = intelligent.val()
                p = Plant(id_plant, plant["pinVanne"], plant["tMax"], plant["smMax"], plant["powerPinSM"], 
                plant["dataPinSM"], arduino["dataPinDht"], arduino["powerPinDht"], intelligent["smart"], db, ard, 1234)
                
                ard.list_plante.append(p)

        

        list_arduinos.append(ard)

rasp = Raspberry(list_arduinos, configuration, 1234)










""" for arduino in rasp.list_arduino:
        for plant in arduino.list_plante:
                if(plant.intelligent == True):
                        data = {"active" : True, "duration" : 5}           # 30 second pour le test de demain
                        db.child("raspberries").child(str(rasp.id_raspberry)).child("tabArduino").child(str(arduino.id_arduino)).child("plants").child(str(plant.id_plante)).child("commands").child("manual").set(data) """ 

async def boucle():
        #while True:
                #time.sleep(30)

                for arduino in rasp.list_arduino:
                        for plant in arduino.list_plante:
                                
                                if(plant.intelligent == True):
                                        #task = asyncio.create_task(rasp.arrosage_automatic(plant))
                                        
                                        plant.linked_arduino.recuperer_valeur_temp(plant.pin_data_dht, plant.pin_power_dht, plant)

                                        

                                        plant.linked_arduino.recuperer_valeur_sol(plant.pin_sol_data, plant.pin_sol_power, plant)

                                        
                                        time.sleep(0.5)

                                        plant.linked_arduino.recuperer_valeur_humid(plant.pin_data_dht, plant.pin_power_dht, plant)

                                        data = {"airHumidity": plant.valeur_actuelle_humid,
                                        "soilMoisture": plant.valeur_actuelle_sol ,
                                        "temperature": plant.valeur_actuelle_temp
                                        }


                                        
                                        db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                        ).child("valeursActuelles").set(data)

                                        tab_temp = db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                        ).child("temperature").shallow().get()
                                        
                                        

                                        for id_last in tab_temp.val() :
                                                id_last = id_last

                                        
                                        id_last = int(id_last)+1

                                        now = datetime.now()
                                        current_date = now.strftime("%d/%m/%Y")
                                        current_time = now.strftime("%H:%M")

                                        temps = current_date + " " + current_time

                                        dict = {"T":  temps,
                                        "V": data["temperature"]}

                                        db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                        ).child("temperature").child(str(id_last)).set(dict)

                                        tab_sm = db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                        ).child("soilMoisture").shallow().get()
                                        
                                        

                                        for id_last in tab_sm.val() :
                                                
                                                id_last = id_last
                                                
                                        id_last = int(id_last)+1

                                        dict = {"T":  temps,
                                        "V": data["soilMoisture"]}

                                        db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                        ).child("soilMoisture").child(str(id_last)).set(dict)

                                        # humidity 

                                        tab_hum = db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                        ).child("airHumidity").shallow().get()
                                        
                                        

                                        for id_last in tab_hum.val() :
                                                
                                                id_last = id_last
                                                print(id_last)
                                                
                                        id_last = int(id_last)+1

                                        dict = {"T":  temps,
                                        "V": data["airHumidity"]}

                                        db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                        ).child("airHumidity").child(str(id_last)).set(dict)



                                                


                                        #print(f"valeur actuelle du temp plante {plant.id_plante} est {plant.valeur_actuelle_temp}")
                                        #print(f"seuil temp {plant.seuille_temp}")

                                        if((plant.valeur_actuelle_sol >= plant.seuille_sol) or (plant.valeur_actuelle_temp >= plant.seuille_temp)):
                                                #global task 
                                                task = asyncio.create_task(arduino.actioner_vanne(plant.pin_vanne, 5))
                                                #print(f"arosage de plant {plant.id_plante}")
                                        time.sleep(0.5)
                                        
                
                await task


async def main():
        

        task1 = asyncio.create_task(boucle())
        await task1



asyncio.run(main())
                                
                                
    