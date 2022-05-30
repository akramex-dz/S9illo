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