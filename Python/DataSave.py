from asyncio.windows_events import NULL
import sqlite3

 
def addArduino ( arduinoid ) :
    cr.execute(f"insert into arduino(arduino_id) values ({arduinoid})") 
    cr.execute(f"create table if not exists PLANTSof{arduinoid} (plant_id integer, data_nb integer)")
    db.commit()

def delArduino ( arduinoid ) :
    cr.execute(f"delete from arduino where arduino_id = {arduinoid} ")
    cr.execute(f"select plant_id from PLANTSof{arduinoid}")
    plantids = cr.fetchall()
    for plantid in plantids :
        cr.execute(f"DROP TABLE DATAof{arduinoid}{plantid[0]}")
    cr.execute(f"drop table PLANTSof{arduinoid} ")
    db.commit()


    
def addPlant ( arduinoid, plantid ) :
    cr.execute(f"insert into PLANTSof{arduinoid} values ({plantid},0)")
    cr.execute(f"create table if not exists DATAof{arduinoid}{plantid}(data_id integer, moisture float, humidity float, temperature float)")
    db.commit()
    
def delPlant ( arduinoid, plantid ) :
    cr.execute(f"delete from PLANTSof{arduinoid} where plant_id = {plantid} ")
    cr.execute(f"DROP TABLE DATAof{arduinoid}{plantid}")
    db.commit()


    
def addData ( arduinoid, plantid, data) :
    cr.execute(f"select data_nb from PLANTSof{arduinoid} where plant_id = {plantid}")
    newid = cr.fetchone()
    m = data["moisture"]
    h = data["humidity"]
    t = data["temperature"]
    cr.execute(f"insert into DATAof{arduinoid}{plantid} values ({newid[0]+1},{m},{h},{t})")
    cr.execute(f"update PLANTSof{arduinoid} set data_nb = {newid[0]+1} where plant_id  = {plantid}")
    db.commit()

def getFirstDataIn ( arduinoid, plantid ):
    #get the data with its id
    try :
        cr.execute(f"select * from DATAof{arduinoid}{plantid} order by data_id limit 1")
        temp = cr.fetchone()
        dataorder = temp[0]
        data={
      "temperature": temp[1],
      "humidity": temp[2],
      "moisture" : temp[3] 
    }
        cr.execute(f"delete from DATAof{arduinoid}{plantid} where data_id = {dataorder} ")
        db.commit()
        return data
    except TypeError :
        return NULL



#Connection à la DataBase Obligatoire
db = sqlite3.connect("s9illo.db")
cr = db.cursor()
cr.execute("create table if not exists arduino(arduino_id integer)")