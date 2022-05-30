import sqlite3

# Connection Ã  la DataBase Obligatoire
conn = sqlite3.connect("s9illo.db")
cr = conn.cursor()
cr.execute("create table if not exists arduino(arduino_id integer)")


def addArduino(arduinoid):
    cr.execute(f"insert into arduino(arduino_id) values ({arduinoid})")
    cr.execute(f"create table if not exists PLANTSof{arduinoid} (plant_id integer, data_nb integer)")
    conn.commit()


def delArduino(arduinoid):
    cr.execute(f"delete from arduino where arduino_id = {arduinoid} ")
    cr.execute(f"select plant_id from PLANTSof{arduinoid}")
    plantids = cr.fetchall()
    for plantid in plantids:
        cr.execute(f"DROP TABLE DATAof{arduinoid}{plantid[0]}")
        cr.execute(f"DROP TABLE WATERPROGof{arduinoid}{plantid}")
    cr.execute(f"drop table PLANTSof{arduinoid} ")
    conn.commit()


def addPlant(arduinoid, plantid):
    cr.execute(f"insert into PLANTSof{arduinoid} values ({plantid},0)")
    cr.execute(f"create table if not exists DATAof{arduinoid}{plantid}(data_id integer, moisture float, humidity float, temperature float, time text)")
    cr.execute(f"create table if not exists WATERPROGof{arduinoid}{plantid}(id integer,duration integer)")
    conn.commit()


def delPlant(arduinoid, plantid):
    cr.execute(f"delete from PLANTSof{arduinoid} where plant_id = {plantid} ")
    cr.execute(f"DROP TABLE DATAof{arduinoid}{plantid}")
    cr.execute(f"DROP TABLE WATERPROGof{arduinoid}{plantid}")
    conn.commit()


def addData(arduinoid, plantid, data):

    cr.execute(
        f"select data_nb from PLANTSof{arduinoid} where plant_id = {plantid}")
    newid = cr.fetchone()
    m = data["soilMoisture"]
    h = data["airHumidity"]
    t = data["temperature"]
    tt = data["time"]

    #############################
    print("inside addDAta")
    print(f"temp = {t}  humd = {h} SM = {m} time = {tt}")
    #############################

    cr.execute(
        f"insert into DATAof{arduinoid}{plantid} values ({newid[0]+1},{m},{h},{t},'{tt}')")
    cr.execute(
        f"update PLANTSof{arduinoid} set data_nb = {newid[0]+1} where plant_id  = {plantid}")
    # db.commit()
    conn.commit()


def getFirstDataIn(arduinoid, plantid):
    # get the data with its id
    try:
        cr.execute(
            f"select * from DATAof{arduinoid}{plantid} order by data_id limit 1")
        temp = cr.fetchone()
        dataorder = temp[0]
        data = {
            "temperature": temp[3],
            "airHumidity": temp[2],
            "soilMoisture": temp[1],
            "time": temp[4]
        }
        cr.execute(
            f"delete from DATAof{arduinoid}{plantid} where data_id = {dataorder} ")
        conn.commit()
        return data
    except TypeError:
        return 0  # NULL

def addProg (arduinoid, plantid, id, duration ) :
    cr.execute(f"insert into WATERPROGof{arduinoid}{plantid}(id, duration) values ({id}, {duration})")
    conn.commit()
    
#gets first prog in dict{ "id" , "duration"} with deleting it
def getProg (arduinoid, plantid) :
    try :
        cr.execute(f"select * from WATERPROGof{arduinoid}{plantid} order by id limit 1")
        temp = cr.fetchone()
        instruction = {
            "id": temp[0],
            "duration":temp[1]
        }
        #cr.execute(f"delete from WATERPROGof{arduinoid}{plantid} where id = {instruction['id']} ")
        conn.commit()
        return instruction
    except TypeError as Er :
        return 0

def delProg(arduinoid, plantid) :
    try : 
        cr.execute(f"select id from WATERPROGof{arduinoid}{plantid} order by id limit 1")
        id = cr.fetchone()
        cr.execute(f"delete from WATERPROGof{arduinoid}{plantid} where id = {id[0]} ")
        conn.commit()
    except :
        return 0