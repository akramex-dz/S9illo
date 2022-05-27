from asyncio import tasks
from re import T
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





arduinos_ids = db.child("raspberries").child("1234").child("tabArduino").shallow().get()

arduinos_ids = arduinos_ids.val()



list_arduinos = []
 
#also add the local variables in sql

for id_arduino in arduinos_ids :
        
        arduino = db.child("raspberries").child("1234").child("tabArduino").child(str(id_arduino)).get()
        arduino = arduino.val()
        if(arduino["waterLevelSensor"] == False) :
                ard = Arduino( str(id_arduino) , arduino["i2cAdr"], arduino["waterLevelSensor"])
        elif(arduino["waterLevelSensor"] == True):
                ard = Arduino( str(id_arduino) , arduino["i2cAdr"], arduino["waterLevelSensor"], arduino["dataPinWl"], arduino["powerPinWl"])

        plants_ids = db.child("raspberries").child("1234").child("tabArduino").child(str(id_arduino)).child("plants").shallow().get()
        plants_ids = plants_ids.val()
        for id_plant in plants_ids :
                plant = db.child("raspberries").child("1234").child("tabArduino").child(str(id_arduino)).child("plants").child(str(id_plant)).get()
                plant = plant.val()

                intelligent = db.child("raspberries").child("1234").child("tabArduino").child(str(id_arduino)).child("plants").child(str(id_plant)
        ).child("commands").child("smart").get()
                intelligent = intelligent.val()

                p = Plant(id_plant, plant["pinVanne"], plant["tMax"], plant["smMin"], plant["powerPinSM"], 
                plant["dataPinSM"], arduino["dataPinDht"], arduino["powerPinDht"], intelligent, db, ard, 1234)
                
                ard.list_plante.append(p)

        

        list_arduinos.append(ard)

rasp = Raspberry(list_arduinos, configuration, 1234)












async def boucle():
        while True:

                #if there is internet:
                        # upload to firebase 
                
                for arduino in rasp.list_arduino:
                        if(arduino.waterLevelSensor == True):
                                arduino.recuperer_valeur_eau( arduino.pinWL, arduino.powerPinWL, rasp ) 


                                db.child("raspberries").child("1234").child("waterLevel").set(rasp.waterLevel) 
                        print(f"inside the arduino {arduino.id_arduino}")

                        for plant in arduino.list_plante:
                                print(f"inside the plant {plant.id_plante}")
                                if(plant.intelligent == True):
                                        
                                        
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
                                        
                                        indice_temp = []
                                        
                                        for id_last in tab_temp.val() :
                                                id_last = id_last
                                                indice_temp.append(id_last)
                                        indice_temp.sort()
                                        id_last = indice_temp[-1]
                                                
                                        id_last = int(id_last) + 1

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
                                        
                                        indice_sm = []

                                        for id_last in tab_sm.val() :
                                                
                                                id_last = id_last
                                                indice_sm.append(id_last)

                                        indice_sm.sort()
                                        id_last = indice_sm[-1]
                                                
                                                
                                        id_last = int(id_last)+1

                                        dict = {"T":  temps,
                                        "V": data["soilMoisture"]}

                                        db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                        ).child("soilMoisture").child(str(id_last)).set(dict)

                                        # humidity 

                                        tab_hum = db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                        ).child("airHumidity").shallow().get()
                                        
                                        indice_humd = []

                                        for id_last in tab_hum.val() :
                                                
                                                id_last = id_last
                                                indice_humd.append(id_last)

                                        indice_humd.sort()
                                        id_last = indice_humd[-1]
                                                
                                        id_last = int(id_last)+1

                                        dict = {"T":  temps,
                                        "V": data["airHumidity"]}

                                        db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                        ).child("airHumidity").child(str(id_last)).set(dict)



                                                


                                        #print(f"valeur actuelle du temp plante {plant.id_plante} est {plant.valeur_actuelle_temp}")
                                        #print(f"seuil temp {plant.seuille_temp}")

                                        if((plant.valeur_actuelle_sol <= plant.seuille_sol) or (plant.valeur_actuelle_temp >= plant.seuille_temp)):
                                                #global task 
                                                task = asyncio.create_task(arduino.actioner_vanne(plant.pin_vanne, 5))
                                                #print(f"arosage de plant {plant.id_plante}")
                                        time.sleep(0.5)
                                        
                
                await task
                time.sleep(10)
        #await task

 
async def main():
        

        task1 = asyncio.create_task(boucle())
        await task1



asyncio.run(main())
                                
                                
    