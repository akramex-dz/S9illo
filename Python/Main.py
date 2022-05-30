from asyncio import tasks
import asyncio
from calendar import month
#from hashlib import new
#from operator import ne
#from re import T
from Plant import Plant
from Raspberry import Raspberry
from Arduino import Arduino
from DataSave import *
import pyrebase

import time
import asyncio
import datetime
#from datetime import date, datetime
import urllib.request


def IsConnected(host='http://google.com'):
    try:
        urllib.request.urlopen(host)  # Python 3.x
        return True
    except:
        return False


async def programmable(time_diff, duration, arduino, plant):  # programmable mode function
    print("begin programmable")
    #await asyncio.sleep(time_diff)
    t = asyncio.create_task( arduino.actioner_vanne(plant.pin_vanne, duration) )
    await asyncio.sleep(0.1)
    await t
    print("end programmbale")


configuration = {
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



# read data from firebase and create the arduinos and plants in our RAM and in the local database
arduinos_ids = db.child("raspberries").child(
    "1234").child("tabArduino").shallow().get()
    

arduinos_ids = arduinos_ids.val()


list_arduinos = []


for id_arduino in arduinos_ids:

    arduino = db.child("raspberries").child("1234").child(
        "tabArduino").child(str(id_arduino)).get()
    

    arduino = arduino.val()


    if(arduino["waterLevelSensor"] == False):
        ard = Arduino(db, id_arduino,
                      arduino["i2cAdr"], arduino["waterLevelSensor"])
    elif(arduino["waterLevelSensor"] == True):
        ard = Arduino(
            db, id_arduino, arduino["i2cAdr"], arduino["waterLevelSensor"], arduino["dataPinWl"], arduino["powerPinWl"])

    addArduino(id_arduino)

    plants_ids = db.child("raspberries").child("1234").child(
        "tabArduino").child(str(id_arduino)).child("plants").shallow().get()
    plants_ids = plants_ids.val()
    for id_plant in plants_ids:
        plant = db.child("raspberries").child("1234").child("tabArduino").child(
            str(id_arduino)).child("plants").child(str(id_plant)).get()
        plant = plant.val()


        intelligent = db.child("raspberries").child("1234").child("tabArduino").child(str(id_arduino)).child("plants").child(str(id_plant)
                                                                                                                             ).child("commands").child("smart").get()
        intelligent = intelligent.val()

        p = Plant(id_plant, plant["pinVanne"], plant["tMax"], plant["smMin"], plant["powerPinSM"],
                  plant["dataPinSM"], arduino["dataPinDht"], arduino["powerPinDht"], intelligent, db, ard, 1234)

        addPlant(id_arduino, id_plant)

        ard.list_plante.append(p)
       

    list_arduinos.append(ard)



global rasp
rasp = Raspberry(list_arduinos, configuration, 1234)

for arduino in rasp.list_arduino :
    for plant in arduino.list_plante :
        # ramener le programme d'arosage depuis Firebase et le stocker dans la base de donnés local

        programme = db.child("raspberries").child("1234").child("tabArduino").child(str(arduino.id_arduino)).child("plants").child(str(plant.id_plante)
        ).child("commands").child("programm").get()

        programme = programme.val()

        for i in range(4) :
            for j in range(7) :
                indice_prog = db.child("raspberries").child("1234").child("tabArduino").child(str(arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                    ).child("commands").child("programm").child(str(i)).child(str(j)).shallow().get()
                indice_prog = indice_prog.val()
                print(f"{i}, {j}")
                if bool(indice_prog) == True : # la list est plein
                    l = []
                    for indice in indice_prog :
                        l.append(indice)
                    
                    l.sort()

                    for indice in l :
                        prog = db.child("raspberries").child("1234").child("tabArduino").child(str(arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                    ).child("commands").child("programm").child(str(i)).child(str(j)).child(str(indice)).get()
                        prog = prog.val()
                        t = prog["time"]
                        d = prog["secondes"]
                        addProg(plant.linked_arduino.id_arduino, plant.id_plante , t, d )
                        
                        dictionary = {"time": t,
                                      "secondes": d,
                                      "trait" : True # on a traiter ce programme                                   
                                    }
                        db.child("raspberries").child("1234").child("tabArduino").child(str(arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                    ).child("commands").child("programm").child(str(i)).child(str(j)).child(str(indice)).set(dictionary)
                
        
def add_arduino_stream_handler(message):

    add_arduino_stream_handler.counter += 1

    

    # new arduino id added , cpt is for avoiding exucuting at the very first time
    if(str(message["path"]) == "/" and add_arduino_stream_handler.counter > 1):

       

        new_ard_id = db.child("raspberries").child(
            "1234").child("nbArduino").get()
        new_ard_id = new_ard_id.val()

        new_ard_id -= 1

        arduino = db.child("raspberries").child("1234").child(
            "tabArduino").child(str(new_ard_id)).get()
        arduino = arduino.val()

        ard = Arduino(
            db, new_ard_id, arduino["i2cAdr"], arduino["waterLevelSensor"], arduino["dataPinWl"], arduino["powerPinWl"])

        addArduino(new_ard_id)

       

        rasp.list_arduino.append(ard)
       


add_arduino_stream = db.child("raspberries").child("1234").child(
    "tabArduino").stream(add_arduino_stream_handler)




async def boucle():
    k = 0 
    while True:
        print(f"infinite loop = {k}")
        k += 1
        for arduino in rasp.list_arduino:
            if(arduino.waterLevelSensor == True):
                arduino.recuperer_valeur_eau(
                    arduino.pinWL, arduino.powerPinWL, rasp)

                """ db.child("raspberries").child("1234").child("waterLevel").set(rasp.waterLevel) """

            

            for plant in arduino.list_plante:
                

                plant.linked_arduino.recuperer_valeur_temp(
                    plant.pin_data_dht, plant.pin_power_dht, plant)

                plant.linked_arduino.recuperer_valeur_sol(
                    plant.pin_sol_data, plant.pin_sol_power, plant)

                time.sleep(0.5)

                plant.linked_arduino.recuperer_valeur_humid(
                    plant.pin_data_dht, plant.pin_power_dht, plant)

                now = datetime.datetime.now()
                current_date = now.strftime("%d/%m/%Y")
                current_time = now.strftime("%H:%M")

                temps = current_date + " " + current_time

                temps = str(temps)  # convert to string

                data = {"airHumidity": plant.valeur_actuelle_humid,
                        "soilMoisture": plant.valeur_actuelle_sol,
                        "temperature": plant.valeur_actuelle_temp,
                        "time": temps
                        }

                # set the data to the local database

                addData(arduino.id_arduino, plant.id_plante, data)

                #print(f"valeur actuelle du temp plante {plant.id_plante} est {plant.valeur_actuelle_temp}")
                #print(f"seuil temp {plant.seuille_temp}")

                if(plant.intelligent == True):

                    if (plant.valeur_actuelle_sol <= plant.seuille_sol):
                        """ or (plant.valeur_actuelle_temp >= plant.seuille_temp) """
                        #global task
                        task = asyncio.create_task(
                            arduino.actioner_vanne(plant.pin_vanne, 2))

                # mode programmé

                
                            

                    

                time.sleep(0.5)

        if (IsConnected() == True):
            print("there is connection")
            # uploading water lavel
            for arduino in rasp.list_arduino:
                if(arduino.waterLevelSensor == True):

                    db.child("raspberries").child("1234").child(
                        "waterLevel").set(rasp.waterLevel)

                for plant in arduino.list_plante:

                    data = getFirstDataIn(arduino.id_arduino, plant.id_plante)

                    while (data != 0):

                        temps = data["time"]

                        # upload to firebase the temp, humd and soil moisture

                        # upload the temperature to the table

                        # temperature

                        tab_temp = db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                                                                                                                                               ).child("temperature").shallow().get()

                        indice_temp = []

                        for id_last in tab_temp.val():
                            id_last = id_last
                            indice_temp.append(id_last)

                        indice_temp.sort()
                        id_last = indice_temp[-1]

                        id_last = int(id_last) + 1
                        

                        dict = {"T":  temps,
                                "V": data["temperature"]}

                        db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                                                                                                                                    ).child("temperature").child(str(id_last)).set(dict)

                        # upload the soil moisture to the table

                        # soil moisture

                        tab_sm = db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                                                                                                                                             ).child("soilMoisture").shallow().get()

                        indice_sm = []

                        for id_last in tab_sm.val():

                            id_last = id_last
                            indice_sm.append(id_last)

                        indice_sm.sort()
                        id_last = indice_sm[-1]

                        id_last = int(id_last)+1

                        dict = {"T":  temps,
                                "V": data["soilMoisture"]}

                        db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                                                                                                                                    ).child("soilMoisture").child(str(id_last)).set(dict)

                        # upload the humidity to the table

                        # humidity

                        tab_hum = db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                                                                                                                                              ).child("airHumidity").shallow().get()

                        indice_humd = []

                        

                        for id_last in tab_hum.val():

                            id_last = id_last
                            indice_humd.append(id_last)

                        indice_humd.sort()
                        id_last = indice_humd[-1]

                        id_last = int(id_last)+1

                        dict = {"T":  temps,
                                "V": data["airHumidity"]}

                        db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                                                                                                                                    ).child("airHumidity").child(str(id_last)).set(dict)

                        # last instruction in the while loop
                        data = getFirstDataIn(
                            arduino.id_arduino, plant.id_plante)

                    # upload the actuelle values to firebase
                    plant.linked_arduino.recuperer_valeur_temp(
                        plant.pin_data_dht, plant.pin_power_dht, plant)

                    plant.linked_arduino.recuperer_valeur_sol(
                        plant.pin_sol_data, plant.pin_sol_power, plant)

                    time.sleep(0.5)

                    plant.linked_arduino.recuperer_valeur_humid(
                        plant.pin_data_dht, plant.pin_power_dht, plant)

                    data = {"airHumidity": plant.valeur_actuelle_humid,
                            "soilMoisture": plant.valeur_actuelle_sol,
                            "temperature": plant.valeur_actuelle_temp
                            }

                    db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                                                                                                                                ).child("valeursActuelles").set(data)

        await task  # mode manual
        #await task1  # mode programmable
        
        await asyncio.sleep(15)
    
    # await task
    
async def mode_programmable():
    print("running mode programmable")
    while True :

        for arduino in rasp.list_arduino :
            print("inside for arduino")
            for plant in arduino.list_plante :
                print("inside the for plant ")

                if(plant.intelligent == False):

                    prog = getProg(
                        plant.linked_arduino.id_arduino, plant.id_plante)
                    if(prog != 0) :
                        date = prog["id"]
                        duration = prog["duration"]
                        date = str(date)

                        year_p = int(date[:4]) 
                        month_p = int(date[4:6])
                        day_p = int(date[6:8])
                        hour_p = int(date[8:10])
                        minute_p = int(date[10:12])
                        print(f"date prochaine {date}")
                        prochain = datetime.datetime(
                            year_p, month_p, day_p, hour_p, minute_p, 0)
                        now = datetime.datetime.now()


                        temps = now.strftime("%Y%m%d%H%M")

                        print(f"date now {temps}")
                        year = int(temps[:4])
                        month = int(temps[4:6])
                        day = int(temps[6:8])
                        hour = int(temps[8:10])
                        minute = int(temps[10:12])
                        now = datetime.datetime(year, month, day, hour, minute, 0)

                        diff = prochain - now

                        time_diff = diff.total_seconds()

                        print(f"time diffrence {time_diff}")

                        if (time_diff <= 0) :

                            arduino.actioner_vanne_not_async(plant.pin_vanne, duration)
                            delProg(plant.linked_arduino.id_arduino, plant.id_plante)
                            
                            
        await asyncio.sleep(10)


async def main():

    task3 = asyncio.create_task(mode_programmable())
    task2 = asyncio.create_task(boucle())
    await task3 
    await task2


add_arduino_stream_handler.counter = 0

asyncio.run(main())
