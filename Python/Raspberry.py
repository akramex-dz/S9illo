from Plant import Plant
from Arduino import Arduino
import pyrebase
import asyncio
from datetime import date, datetime



class Raspberry:

   
    def __init__(self, list_arduino, firebase, id_rasp):
        self.list_arduino = list_arduino
        self.configuration = firebase
        self.id_raspberry = id_rasp
        self.waterLevel = 0

    def arrosage_automatic(self, plant):
        
        #task = asyncio.create_task( plant.linked_arduino.recuperer_valeur_sol(plant.pin_sol_data, plant.pin_sol_power) )
        plant.linked_arduino.recuperer_valeur_sol(plant.pin_sol_data, plant.pin_sol_power)

        """ task1 = asyncio.create_task( plant.linked_arduino.recuperer_valeur_temp(plant.pin_data_dht, plant.pin_power_dht) ) """
        plant.linked_arduino.recuperer_valeur_temp(plant.pin_data_dht, plant.pin_power_dht)

        """ await asyncio.sleep(0.1) """

        """ task2 = asyncio.create_task( plant.linked_arduino.recuperer_valeur_humid(plant.pin_data_dht, plant.pin_power_dht) ) """
        plant.linked_arduino.recuperer_valeur_humid(plant.pin_data_dht, plant.pin_power_dht)

        if((plant.valeur_actuelle_sol >= plant.seuille_sol) or (plant.valeur_actuelle_temp >= plant.seuille_temp)):
            """ task3 = asyncio.create_task( plant.linked_arduino.actioner_vanne(plant.id_plante, 10) ) """  # 10 secondes pour le test
            plant.linked_arduino.actioner_vanne(plant.id_plante, 10)

        """ await task
        await task1
        await task2
        await task3 """
            
        
                

    def arrosage_manuelle(self, id_plante, temp):
        for arduino in self.list_arduino:
            for plante in arduino.list_plante:
                if(plante.id_plante == id_plante):
                    self.arduino.actioner_vanne(sda, scl, freq, self.plant.pin_vanne, temp)
                    

    def arrosage_programmable(self, list_arduino ): 
        firebase = pyrebase.initialize_app(self.configuration)
        db =  firebase.database()
        arrosage_programable = db.child("Arrosage_Programable").get()
        for arrosage in arrosage_programable.each():
            id = arrosage.val()["id_plante"]
            time = arrosage.val()["Time"]
            day = arrosage.val()["Day"]
            month = arrosage.val()["Month"]
            year = arrosage.val()["Years"]
            now = datetime.now()
            current_date = now.strftime("%m/%d/%Y")
            current_time = now.strftime("%H:%M")
            print(current_time == time)
            
            for arduino in list_arduino:
                for plante in arduino.list_plante:                 
                    if(id == str(plante.id_plante)):
                        
                        print(f"la plante numero {plante.id_plante} il fault l'arroser a {time} le {day}/{month}/{year}")
                    





""" p1 = Plante(1, 12, 0, 15)
p2 = Plante(2, 16, 1, 15)
p3= Plante(3, 18, 2, 15)
p4 = Plante(4, 9, 3, 15)
p5 = Plante(5, 8, 4, 15)
l1 = [p1, p2, p3, p4, p5]

p6 = Plante(6, 25, 0, 15)
p7 = Plante(7, 26, 1, 15)
p8 = Plante(8, 10, 2, 15)
p9 = Plante(9, 9, 3, 15)
p10 = Plante(10, 30, 4, 15)
l2 = [p6, p7, p8, p9, p10]

ard1 = Arduino(1, False, l1)
ard2 = Arduino(2, True, l2)
l3 = [ard1, ard2] """


#ras.arrosage_manuelle(2, 3)
#ras.arrosage_automatic(l3)


firebaseConfig = { 
    "apiKey": "AIzaSyCckkna78etd_-0yZssFCnoGZ8D5LKRzho",
    "authDomain": "testfirebase-77fff.firebaseapp.com",
    "databaseURL": "https://testfirebase-77fff-default-rtdb.firebaseio.com",
    "projectId": "testfirebase-77fff",
    "storageBucket": "testfirebase-77fff.appspot.com",
    'messagingSenderId': "684570169052",
    "appId": "1:684570169052:web:5153490d3ac5b1114fae19",
    "measurementId": "G-3JD1DYSP7T"}

firebase = pyrebase.initialize_app(firebaseConfig)

db =  firebase.database()

""" data = {"id_plante" : "2", "valeur_actuelle" : "11", "pin_vanne" : "1", "seuille": "15"}
db.push(data) """

""" nb_plante = 6
data = {"id_plante" : str(nb_plante), "Years" : "2022", "Month" : "05", "Day": "17", "Time" : "20:45"}
db.child("Arrosage_Programable").child("Plante_arrosage" + str(nb_plante)).set(data) """

""" ras = Raspberry(l3, firebaseConfig, "Bleutooth")
ras.arrosage_programmable(l3) """


""" now = datetime.now()
current_date = now.strftime("%m/%d/%Y")
current_time = now.strftime("%H:%M:%S")

print(datetime.today().weekday()) """