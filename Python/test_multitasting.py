import multiprocessing as mp
from pickletools import read_uint1
import time
import sched, webbrowser
import threading, pyrebase
from datetime import date, datetime

import asyncio

class A:
    def __init__(self):
        print("constructor")

    async def fetching_data():              #la fonction li tetrana lwla             
        print("Strat fetching data")
        await asyncio.sleep(2)              #hada houwa sleep li ghady 3la jaleh nranou fonctions whdokhra
        print("Done fetching data")
        return {"data" : 2}

    async def printing_listing_instead_of_waiting():        #la fonction li tetrana en paralele
        for i in range(10):
            print(i)
            await asyncio.sleep(0.25)       


    async def main():
        task1 = asyncio.create_task(A.fetching_data())                          #la variable li tkhali la fonction hadi tetrana lwla
        task2 = asyncio.create_task(A.printing_listing_instead_of_waiting())    #la variable li tkhali la fonction hadi tetrana zwja


        value = await task1                                                     #hadi la valeur te3 return te3 la fonction lwla
        print(value)
        await task2                                             #hna tgoul l programe mthabesch hta tekmel la fonction zwja

asyncio.run(A.main())                                           #hadi run t3na