import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import Weatherbar from '../components/Weatherbar';
import Donutchart from '../components/Donutchart';
import { ref, onValue, set, get } from "firebase/database"
import { db } from '../../core/firebase';

export default function Screen1({ navigation, infos }) {
  const [adr, setAdr] = useState(null);
  get(ref(db, 'raspberries/', infos.idRaspBerry)).then((snapshot) => {
    if (snapshot.exists()) {
      setAdr(snapshot.val()[infos.idRaspBerry].adress);
    }
    else {
      console.log("no data");
    }
  }).catch((e) => {
    console.log(e);
  });

  return (
    <View style={styles.dashBoard}>
      <View style={styles.salut}>
        <Text style={styles.salutZack}>Salut {infos.displayName || "..."}</Text>
        <Text style={styles.salutMsg}>N'oubliez pas de passer du temps avec vos plantes...</Text>
        <Weatherbar input={adr} style={styles.Weatherbar} />
        <View style={styles.sectionRond}>
          <Donutchart />
          <Donutchart />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dashBoard: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  salut: {
    position: 'absolute',
    top: 72.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 310,

  },
  salutZack: {
    position: 'absolute',
    left: 5,
    top: 10,
    fontFamily: 'CircularStd-Bold',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 27,
    color: '#07D779'
  },
  salutMsg: {
    position: 'absolute', width: 205,
    left: 5,
    top: 37,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#00000065'
  },
  Weatherbar: {
  },
  sectionRond: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 342,
    top: 195,
  }
});