import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Button, ScrollView } from 'react-native';
import Weatherbar from '../components/Weatherbar';
import Donutchart from '../components/Donutchart';
import { ref, onValue, set, get } from "firebase/database"
import { db } from '../../core/firebase';
import ProchainsArrosages from "../components/ProchainsArrosages"
import DerniersArrosages from "../components/DerniersArrosages"
import Header from "../components/Header"


export default function Screen1({ navigation, infos, plantSeches }) {
  const [adr, setAdr] = useState(null);
  const [waterLevel, setWaterLevel] = useState(0);
  useEffect(() => {
    get(ref(db, 'raspberries/' + infos.idRaspberry + "/waterLevel")).then((snapshot) => {
      console.log("snapshot");
      console.log(snapshot.val());
      setWaterLevel(snapshot.val());
    })
  }, [])

  get(ref(db, 'raspberries/', infos.idRaspberry)).then((snapshot) => {
    if (snapshot.exists()) {
      setAdr(snapshot.val()[infos.idRaspberry].adress);
    }
    else {
      console.log("no data");
    }
  }).catch((e) => {
    console.log(e);
  });

  return (
    <View style={styles.dashBoard}>
      <Header />
      <ScrollView >


        <Text style={styles.salutZack}>Salut {infos.displayName || "..."}</Text>

        <Text style={styles.salutMsg}>N'oubliez pas de passer du temps avec vos plantes...</Text>

        <View style={styles.Weatherbar}>
          <Weatherbar input={adr} />
        </View>

        <View style={{ flexDirection: "row", marginLeft: 22 }}>
          <Donutchart p={waterLevel} c={"#3155A1"} />
          <Donutchart p={plantSeches} c={"#07D779"} />
        </View>

        <View style={styles.cardArrosage}>
          <ProchainsArrosages />
        </View>
        <View style={styles.cardArrosage}>
          <DerniersArrosages />
        </View>

      </ScrollView>
    </View>


  );
}
const styles = StyleSheet.create({
  dashBoard: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardArrosage: {
    flexDirection: "column",
    marginLeft: 25,
    marginVertical: '2%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: '88%',
    shadowColor: '#000000',
    elevation: 5,
    borderRadius: 20,
    overflow: 'hidden'
  },
  salut: {
    //position: 'absolute',


    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',


  },
  salutZack: {
    marginTop: 30,
    marginLeft: 40,
    fontFamily: 'CircularStd-Bold',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 27,
    color: '#07D779'
  },
  salutMsg: {
    marginTop: 5,
    marginLeft: 40,
    width: "50%",
    fontFamily: 'CircularStd-Medium',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#00000065'
  },
  Weatherbar: {
    marginLeft: 20

  },
  sectionRond: {

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

  }
});