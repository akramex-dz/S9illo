import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";

import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from "../../core/firebase"


export default function QRcodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('not yet scanned');
  const navigate = useNavigation();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

  //Request Camera permission

  useEffect(() => {
    askForCameraPermission();
  }, []);


  //What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log(type + "\n" + data);
    get(ref(db, 'raspberries/' + data)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        navigate.replace("successQR")
      }
      else {
        navigate.replace("faillureQR")
        console.log("mafihach");
      }
    }).catch((e) => {
      console.log();
      navigate.replace("faillureQR");
    });

  }

  //Check permissions and return the screens

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }


  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    )
  }


  //Return the View

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Scan the QR code{"\n"}at the back of your controller</Text>
      <View style={styles.barcodebox}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.70)",
          width: '60%',
          margin: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 60,
          marginBottom: 130,
        }}
        onPress={() => { }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            padding: 10,
            color: "white",
          }}
        >
          Problem scanning?
        </Text>
      </TouchableOpacity>
      {/* <Text style={styles.maintext}>{text}</Text> */}
      {/* {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />} */}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000010',
    alignItems: 'center',
    justifyContent: 'center',
  }, barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 4,
    borderColor: '#07D779',
    backgroundColor: 'tomato',
    margin: 30,

  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  titleText: {
    fontFamily: 'CircularStd-Medium',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 120,
    marginBottom: 60,
    width: 216,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }
})

