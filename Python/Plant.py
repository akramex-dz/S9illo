# Class plante et c'est attribut

class Plant:

    def __init__(self, id, valeur_sol, pin_vanne, seuille_temp, seuille_sol, valeur_temp, valeur_humidity_air, pin_sol_power, pin_sol_data, data_dht, power_dht, intelligent, db, arduino, id_rasp):
        self.id_plante = id                             # plant id
        self.linked_arduino = arduino                   # the arduino which the plant is connected with
        self.id_arduino = arduino.id                    # the linked arduino id
        self.id_raspberry = id_rasp                     # the raspberry id
        self.pin_vanne = pin_vanne                      # vanne pin
        self.seuille_temp = seuille_temp                # temp max
        self.seuille_sol = seuille_sol                  # soil moisture max
        self.valeur_actuelle_temp = valeur_temp
        self.valeur_actuelle_sol = valeur_sol
        self.valeur_actuelle_humid = valeur_humidity_air
        self.pin_sol_power = pin_sol_power              # le power pin de soil moisture sensor
        self.pin_sol_data = pin_sol_data                # le data pin de soil moisture sensor
        self.pin_power_dht = power_dht                  # power pin dht
        self.pin_data_dht = data_dht                    # data pin dht
        self.intelligent = intelligent                  # boolean that says if the  plat is in the intelligent mode if so when we find it true if the plant need irigation we will
                                                        # modify in firebase so the stream of manual mode will execute

        self.stream_intelligent_mode = db.child("raspberries").child(str(self.id_raspberry)).child("tabArduino").child(str(self.id_arduino)).child("plants").child(str(self.id_plante)).child("commands").child("smart").stream(self.stream_handler_intelligent_mode)

    '''def __init__(self, db, test, id1):
        self.id_plante = id1
        self.intelligent = test
        self.stream_intelligent_mode = db.child("raspberries").child("1234").child("tabArduino").child("0").child(
            "plants").child(str(id1)).child("commands").child("smart").stream(self.stream_handler_intelligent_mode)'''





    def stream_handler_intelligent_mode(self, message):
        if (message["data"] == True):
            self.intelligent = True
        else :
            self.intelligent = False 
    
    def stream_handler_manual_mode(self, message):
        if(message["data"]["active"] == True):
            self.linked_arduino.actioner_vanne(self.pin_vanne, message["data"]["duration"])
        


