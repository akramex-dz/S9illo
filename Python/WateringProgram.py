#Connecter DataBase 
from ast import Return
from asyncio.windows_events import NULL
import sqlite3

db2 = sqlite3.connect("schedule.db")
cr2 = db2.cursor()
cr2.execute("create table if not exists waterprog(id integer,duration integer)")

#adds prog to waterprog table
def addProg (id, duration ) :
    cr2.execute(f"insert into waterprog(id, duration) values ({id}, {duration})")
    db2.commit()

#gets first prog in dict{ "id" , "duration"} without deleting 
def getProg () :
    try :
        cr2.execute("select * from waterprog order by id limit 1")
        temp = cr2.fetchone()
        instruction = {
            "id": temp[0],
            "duration":temp[1]
        }
        return instruction
    except TypeError as Er :
        return NULL

#deletes first prog in
def delProg() :
    temp = getProg()
    if temp != NULL :
        id = temp["id"]
        cr2.execute(f"delete from waterprog where id = {id}")
        db2.commit()     