from Plant import Plant
from Raspberry import Raspberry
from Arduino import Arduino
import pyrebase
import time

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


""" while True :
    time.sleep(5)
    smart = db.child("raspberries").child("1234").child("tabArduino").child("0").child(
            "plants").child("0").child("commands").child("smart").get()
    print("firebase = " + str(smart.val()))
    print(f"object = {p1.intelligent}")
    #print(p1.intelligent) """

""" p1 = Plant(1, 12, 0, 15)
p2 = Plant(2, 16, 1, 15)
p3= Plant(3, 18, 2, 15)
p4 = Plant(4, 9, 3, 15)
p5 = Plant(5, 8, 4, 15)
l1 = [p1, p2, p3, p4, p5]

p6 = Plant(6, 25, 0, 15)
p7 = Plant(7, 26, 1, 15)
p8 = Plant(8, 10, 2, 15)
p9 = Plant(9, 9, 3, 15)
p10 = Plant(10, 30, 4, 15)
l2 = [p6, p7, p8, p9, p10]

ard1 = Arduino(1, False, l1)
ard2 = Arduino(2, True, l2)
l3 = [ard1, ard2] """

p1 = Plant(db, True, 0)
p2 = Plant(db, False, 1)
l1 = [p1, p2]

print(l1[0].id_plante)

ard = Arduino(0, True, l1, 8)
l2 = [ard]



bleutooth = "hey"

rasp = Raspberry(l2, configuration, bleutooth, 1234)


while True:
    for arduino in rasp.list_arduino:
        for plant in arduino.list_plante:
            if(plant.intelligent == True):
                data = {"active" : True, "duration" : 30}           # 30 second pour le test de demain
                db.child("raspberries").child(str(rasp.id_raspberry)).child("tabArduino").child(str(arduino.id_arduino)).child("plants").child(str(plant.id_plante)).child("commands").child("manual").set(data)