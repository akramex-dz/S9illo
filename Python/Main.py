from asyncio import tasks
from hashlib import new
from operator import ne
from re import T
from Plant import Plant
from Raspberry import Raspberry
from Arduino import Arduino
#from WateringProgram import *
#from DataSave import *
import pyrebase
import sqlite3
import time
import asyncio
from datetime import date, datetime
import urllib.request




#db = sqlite3.connect("s9illo.db")
conn = sqlite3.connect("s9illo.db")
cr = conn.cursor()
cr.execute("create table if not exists arduino(arduino_id integer)")

def addArduino ( arduinoid ) :
    #conn = sqlite3.connect("s9illo.db")    
    cr.execute(f"insert into arduino(arduino_id) values ({arduinoid})") 
    cr.execute(f"create table if not exists PLANTSof{arduinoid} (plant_id integer, data_nb integer)")
    conn.commit()
    #db.commit()

def delArduino ( arduinoid ) :
    cr.execute(f"delete from arduino where arduino_id = {arduinoid} ")
    cr.execute(f"select plant_id from PLANTSof{arduinoid}")
    plantids = cr.fetchall()
    for plantid in plantids :
        cr.execute(f"DROP TABLE DATAof{arduinoid}{plantid[0]}")
    cr.execute(f"drop table PLANTSof{arduinoid} ")
    #db.commit()
    conn.commit()


    
def addPlant ( arduinoid, plantid ) :
    cr.execute(f"insert into PLANTSof{arduinoid} values ({plantid},0)")
    cr.execute(f"create table if not exists DATAof{arduinoid}{plantid}(data_id integer, moisture float, humidity float, temperature float, time text)")
    #db.commit()
    conn.commit()
    
def delPlant ( arduinoid, plantid ) :
    cr.execute(f"delete from PLANTSof{arduinoid} where plant_id = {plantid} ")
    cr.execute(f"DROP TABLE DATAof{arduinoid}{plantid}")
    #db.commit()
    conn.commit()


    
def addData ( arduinoid, plantid, data) :

    cr.execute(f"select data_nb from PLANTSof{arduinoid} where plant_id = {plantid}")
    newid = cr.fetchone()
    m = data["soilMoisture"]
    h = data["airHumidity"]
    t = data["temperature"]
    tt = data["time"]


    #############################
    print("inside addDAta")
    print(f"temp = {t}  humd = {h} SM = {m} time = {tt}")#####################################################################
    #############################


    cr.execute(f"insert into DATAof{arduinoid}{plantid} values ({newid[0]+1},{m},{h},{t},'{tt}')")
    cr.execute(f"update PLANTSof{arduinoid} set data_nb = {newid[0]+1} where plant_id  = {plantid}")
    #db.commit()
    conn.commit()

def getFirstDataIn ( arduinoid, plantid ):
    #get the data with its id
    try :
        cr.execute(f"select * from DATAof{arduinoid}{plantid} order by data_id limit 1")
        temp = cr.fetchone()
        dataorder = temp[0]
        data={
      "temperature": temp[3],
      "airHumidity": temp[2],
      "soilMoisture" : temp[1] ,
      "time" : temp [4]
    }
        cr.execute(f"delete from DATAof{arduinoid}{plantid} where data_id = {dataorder} ")
        #db.commit()
        conn.commit()
        return data
    except TypeError :
        return 0 #NULL

###############################################################################################



def IsConnected(host='http://google.com'):
    try:
        urllib.request.urlopen(host) #Python 3.x
        return True
    except:
        return False




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




                




                



#read data from firebase and create the arduinos and plants in our RAM and in the local database

arduinos_ids = db.child("raspberries").child("1234").child("tabArduino").shallow().get()

arduinos_ids = arduinos_ids.val()



list_arduinos = []
 
 

for id_arduino in arduinos_ids :
        
        arduino = db.child("raspberries").child("1234").child("tabArduino").child(str(id_arduino)).get()
        arduino = arduino.val()
        if(arduino["waterLevelSensor"] == False) :
                ard = Arduino( db, id_arduino , arduino["i2cAdr"], arduino["waterLevelSensor"])
        elif(arduino["waterLevelSensor"] == True):
                ard = Arduino(db, id_arduino , arduino["i2cAdr"], arduino["waterLevelSensor"], arduino["dataPinWl"], arduino["powerPinWl"])
        
        addArduino(id_arduino)

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

                addPlant(id_arduino, id_plant)
                
                ard.list_plante.append(p)

        

        list_arduinos.append(ard)

global rasp 
rasp = Raspberry(list_arduinos, configuration, 1234)


def add_arduino_stream_handler(message):
        
        
        add_arduino_stream_handler.counter += 1

        print(f"stream handler fun counter = {add_arduino_stream_handler.counter}")
        

        if(str(message["path"]) == "/"  and add_arduino_stream_handler.counter > 1 ) : # new arduino id added , cpt is for avoiding exucuting at the very first time
                # the first solution has a wikeness ( you can't detect more than 10 arduinos )
                print("inside add arduino stream  the path :")
                print(str(message["path"]))
                print(str(message["data"]))
                """ arduinos_ids = db.child("raspberries").child("1234").child("tabArduino").shallow().get()
                # get the last id added 
                list_indice_arduinos = []        

                for ard_id in arduinos_ids.val() :
                        list_indice_arduinos.append(ard_id)
                
                list_indice_arduinos.sort()

                new_ard_id = list_indice_arduinos[-1]

                new_ard_id = int(new_ard_id) +1 """
                # the second solution 

                new_ard_id = db.child("raspberries").child("1234").child("nbArduino").get()
                new_ard_id = new_ard_id.val()

                new_ard_id -= 1

                arduino = db.child("raspberries").child("1234").child("tabArduino").child(str(new_ard_id)).get()
                arduino = arduino.val()

                ard = Arduino(db,new_ard_id, arduino["i2cAdr"], arduino["waterLevelSensor"], arduino["dataPinWl"], arduino["powerPinWl"] )

                addArduino(new_ard_id)
                
                print("infos about the new arduino")
                print(ard)

                rasp.list_arduino.append(ard)
                print(rasp.list_arduino)


add_arduino_stream = db.child("raspberries").child("1234").child("tabArduino").stream(add_arduino_stream_handler)






async def boucle():
        
        while True:

                         
                
                for arduino in rasp.list_arduino:
                        if(arduino.waterLevelSensor == True):
                                arduino.recuperer_valeur_eau( arduino.pinWL, arduino.powerPinWL, rasp ) 


                                """ db.child("raspberries").child("1234").child("waterLevel").set(rasp.waterLevel) """ 

                        print(f"inside the arduino {arduino.id_arduino}")

                        for plant in arduino.list_plante:
                                print(f"inside the plant {plant.id_plante}")
                                
                                        
                                        
                                plant.linked_arduino.recuperer_valeur_temp(plant.pin_data_dht, plant.pin_power_dht, plant)

                                

                                plant.linked_arduino.recuperer_valeur_sol(plant.pin_sol_data, plant.pin_sol_power, plant)

                                
                                time.sleep(0.5)

                                plant.linked_arduino.recuperer_valeur_humid(plant.pin_data_dht, plant.pin_power_dht, plant)

                                now = datetime.now()
                                current_date = now.strftime("%d/%m/%Y")
                                current_time = now.strftime("%H:%M")

                                temps = current_date + " " + current_time

                                temps = str(temps) # convert to string
                                        
                                

                                data = {"airHumidity": plant.valeur_actuelle_humid,
                                "soilMoisture": plant.valeur_actuelle_sol ,
                                "temperature": plant.valeur_actuelle_temp,
                                "time": temps
                                }

                                # set the data to the local database 

                                addData(arduino.id_arduino, plant.id_plante, data)
                        

                                #print(f"valeur actuelle du temp plante {plant.id_plante} est {plant.valeur_actuelle_temp}")
                                #print(f"seuil temp {plant.seuille_temp}")

                                if( plant.intelligent == True) and (plant.valeur_actuelle_sol <= plant.seuille_sol): 
                                        """ or (plant.valeur_actuelle_temp >= plant.seuille_temp) """
                                        #global task 
                                        task = asyncio.create_task(arduino.actioner_vanne(plant.pin_vanne, 2))
                                        #print(f"arosage de plant {plant.id_plante}")
                                time.sleep(0.5)
       
                
                if (IsConnected() == True):
                        print("there is connection")
                        # uploading water lavel 
                        for arduino in rasp.list_arduino :
                                if(arduino.waterLevelSensor == True):
                                         
                                        db.child("raspberries").child("1234").child("waterLevel").set(rasp.waterLevel)

                                for plant in arduino.list_plante:

                                        data = getFirstDataIn(arduino.id_arduino, plant.id_plante)

                                        while (data != 0) :                                            
                                                
                                                temps = data["time"]
                                                
                                                # upload to firebase the temp, humd and soil moisture 

                                                # upload the temperature to the table 

                                                # temperature

                                                tab_temp = db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                                ).child("temperature").shallow().get()  
                                                
                                                indice_temp = []
                                                
                                                for id_last in tab_temp.val() :
                                                        id_last = id_last
                                                        indice_temp.append(id_last)

                                                indice_temp.sort()
                                                id_last = indice_temp[-1]
                                                        
                                                id_last = int(id_last) + 1
                                                print(f"id last of temperature {id_last}")

                                                dict = {"T":  temps,
                                                "V": data["temperature"]}

                                                db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                                ).child("temperature").child(str(id_last)).set(dict)

                                                # upload the soil moisture to the table 

                                                #soil moisture

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
                                                

                                                # upload the humidity to the table 

                                                # humidity 

                                                tab_hum = db.child("raspberries").child("1234").child("tabArduino").child(str(plant.linked_arduino.id_arduino)).child("plants").child(str(plant.id_plante)
                                                ).child("airHumidity").shallow().get()
                                                
                                                indice_humd = []

                                                print(tab_hum)
                                                print(tab_hum.val())

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


                                        

                                                


                                                # last instruction in the while loop
                                                data = getFirstDataIn(arduino.id_arduino, plant.id_plante)


                                        # upload the actuelle values to firebase 
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



                                         
                                        
                                        
                
                await task
                time.sleep(10)
        #await task

 
async def main():
        

        task1 = asyncio.create_task(boucle())
        await task1


add_arduino_stream_handler.counter = 0

asyncio.run(main())
                                
                                
    