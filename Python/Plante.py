# Class plante et c'est attribut

class Plante:
    
    def __init__(self, id, valeur_sol, pin, seuille_temp, seuille_sol, valeur_temp, pin_power, pin_data, data_dht, power_dht):
        self.id_plante = id
        self.pin_vanne = pin
        self.seuille_temp = seuille_temp
        self.seuille_sol = seuille_sol
        self.valeur_actuelle_temp = valeur_temp
        self.valeur_actuelle_sol = valeur_sol
        self.pin_sol_power = pin_power
        self.pin_sol_data = pin_data
        self.pin_power_dht = power_dht
        self.pin_data_dht = data_dht
