import React from "react";
import { useState, useCallback, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { db, storageRef } from "../../core/firebase";
import { ref, set, get, update } from "firebase/database";
import { ScrollView } from "react-native-gesture-handler";
import COLORS from "../../data/colors";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, uploadBytes } from "firebase/storage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const items = [
  { label: "TRUE", value: true },
  { label: "FALSE", value: false },
];


const data_Pin = [
  { label: "DATA_PIN_DHT_10", value: 10 },
  { label: "DATA_PIN_DHT_13", value: 13 },
  { label: "DATA_PIN_DHT_14", value: 14 },
];

const power_pin = [
  { label: "POWER_PIN_DHT0", value: 0 },
  { label: "POWER_PIN_DHT1", value: 1 },
  { label: "POWER_PIN_DHT2", value: 2 },
  { label: "POWER_PIN_DHT3", value: 3 },
  { label: "POWER_PIN_DHT4", value: 4 },
  { label: "POWER_PIN_DHT5", value: 5 },
  { label: "POWER_PIN_DHT6", value: 6 },
  { label: "POWER_PIN_DHT7", value: 7 },
  { label: "POWER_PIN_DHT8", value: 8 },
  { label: "POWER_PIN_DHT9", value: 9 },
];

const vanne_DHT = [
  { label: "A0", value: 0 },
  { label: "A1", value: 1 },
  { label: "A2", value: 2 },
  { label: "A3", value: 3 },
  { label: "A4", value: 4 },
  { label: "A5", value: 5 },
  { label: "A6", value: 6 },
];


const cmd = {
  manual: {
    active: false,
    duration: 0,
  },
  programm: [{}, {}, {}, {}],
  smart: false,
}

export default function AddController({ navigation, route }) {
  const { idRaspberry } = route.params;

  const [nbArduino, setNbArduino] = useState(0);
  useEffect(() => {
    get(ref(db, "raspberries/" + idRaspberry + "/nbArduino")).then(
      (snapshot) => {
        setNbArduino(snapshot.val())
      }
    )
  }, [])
  const tabNumberArduino = []
  for (let i = 0; i < + 1; i++) {
    tabNumberArduino[i] = { label: i, value: i }


  }

  const navigate = useNavigation();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);

  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);
  const [value6, setValue6] = useState(null);

  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const onFitemOpen = useCallback(() => {
    setOpen1(false);
  }, []);

  const onSitemOpen = useCallback(() => {
    setOpen(false);
  }, []);

  const AddController = async () => {
    console.log("raspberries/" +
      idRaspberry +
      "/tabArduino/" + nbArduino);
    try {
      await set(
        ref(
          db,
          "raspberries/" +
          idRaspberry +
          "/tabArduino/" + nbArduino
        ),
        {
          i2cAdr: parseInt(text),
          waterLevelSensor: value2,
          powerPinDht: value3,

          dataPinDht: value4,
          powerPinWl: value5,
          dataPinWl: value6,

          idArduino: nbArduino.toString(),
          plants: "",

        }
      );
      await update(
        ref(
          db,
          "raspberries/" +
          idRaspberry
        ),
        {
          nbArduino: nbArduino + 1,
        }
      );

    } catch (e) {
      console.log(e)
    }

    navigation.goBack();

  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10%', height: '5%' }}>
        <TouchableOpacity onPress={navigate.goBack} style={{ right: "210%", height: '80%', width: '10%', justifyContent: 'center', alignItems: 'center' }}  >
          <Image source={require('../../assets/images/backArrowBlack.png')} style={{ height: "50%" }} resizeMode="contain" />

        </TouchableOpacity>
        <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 23, color: 'black', right: '50%' }}>Add controller</Text></View>

      <ScrollView style={{ height: "100%", width: "100%" }}>


        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              margin: 5,
              marginTop: "10%",
              marginLeft: (windowWidth * 5) / 100,
            }}
          >
            Warning!
          </Text>
          <Text style={{
            marginLeft: "8%",
            color: "#000",
            marginBottom: '5%',
            opacity: 0.7,
            fontSize: 14,
            fontWeight: "500",
          }}>This would be the controller number {nbArduino + 1}</Text>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              margin: 5,
              marginLeft: (windowWidth * 5) / 100,
            }}
          >
            Hardware
          </Text>
          <View style={{}}>
            <Text style={styles.title}>I2C ADRESS</Text>
            <TextInput
              onChangeText={(text) => setText(text.trimStart())}
              value={text}
              style={{
                height: 50,
                width: (windowWidth * 90) / 100,
                borderWidth: 1,
                backgroundColor: "white",
                borderColor: "#E3E3E3",
                borderRadius: 10,
                marginTop: 3,
                margin: (windowWidth * 5) / 100,
                paddingHorizontal: 15,
              }}
              underlineColorAndroid="transparent"
              autoCapitalize={true}
              keyboardType={"numeric"}
              placeholder="Between 8 and 128"
              placeholderTextColor={"#00000070"}
              listMode="SCROLLVIEW"
              multiline={false}
              textAlign="left"
              textBreakStrategy="highQuality"
              maxLength={30}
            />

          </View>
          <View style={{}}>
            <Text style={styles.title}>WATER LEVEL SENSOR</Text>
            <DropDownPicker
              style={{
                marginTop: 3,
                borderColor: "#E3E3E3",
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
              }}
              listMode="SCROLLVIEW"
              open={open2}
              placeholder="TRUE / FALSE"
              dropDownContainerStyle={{
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
                maxHeight: (windowHeight * 14) / 100,
                marginTop: 0,
                borderColor: "#E3E3E3",
              }}
              value={value2}
              items={items}
              setOpen={setOpen2}
              setValue={setValue2}
            />
          </View>


          <View style={{}}>
            <Text style={styles.title}>POWER PIN DHT</Text>
            <DropDownPicker
              style={{
                marginTop: 10,
                borderColor: "#E3E3E3",
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
              }}
              dropDownContainerStyle={{
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
                maxHeight: (windowHeight * 10) / 100,
                marginTop: 0,
                borderColor: "#E3E3E3",
              }}
              scrollViewProps={{
                decelerationRate: "fast",
              }}
              modalContentContainerStyle={{
                backgroundColor: COLORS.RED,
              }}
              listMode="SCROLLVIEW"
              dropDownDirection="BOTTOM"
              onOpen={onSitemOpen}
              placeholder="Power pin dht"
              open={open3}
              value={value3}
              items={power_pin}
              setOpen={setOpen3}
              setValue={setValue3}
              zIndex={1000}
            />
          </View>
          <View style={{}}>
            <Text style={styles.title}>DATA PIN DHT </Text>
            <DropDownPicker
              style={{
                marginTop: 10,
                borderColor: "#E3E3E3",
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
              }}
              dropDownContainerStyle={{
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
                maxHeight: (windowHeight * 10) / 100,
                marginTop: 0,
                borderColor: "#E3E3E3",
              }}
              scrollViewProps={{
                decelerationRate: "fast",
              }}
              modalContentContainerStyle={{
                backgroundColor: COLORS.RED,
              }}
              listMode="SCROLLVIEW"
              dropDownDirection="BOTTOM"
              onOpen={onSitemOpen}
              placeholder="Data pin dht"
              open={open4}
              value={value4}
              items={data_Pin}
              setOpen={setOpen4}
              setValue={setValue4}
              zIndex={1000}
            />
          </View>
          <View style={{}}>
            <Text style={styles.title}>POWER PIN WATER LEVEL</Text>
            <DropDownPicker
              style={{
                marginTop: 10,
                borderColor: "#E3E3E3",
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
              }}
              dropDownContainerStyle={{
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
                maxHeight: (windowHeight * 10) / 100,
                marginTop: 0,
                borderColor: "#E3E3E3",
              }}
              scrollViewProps={{
                decelerationRate: "fast",
              }}
              modalContentContainerStyle={{
                backgroundColor: COLORS.RED,
              }}
              listMode="SCROLLVIEW"
              dropDownDirection="BOTTOM"
              onOpen={onSitemOpen}
              placeholder="Water level power"
              open={open5}
              value={value5}
              items={power_pin}
              setOpen={setOpen5}
              setValue={setValue5}
              zIndex={1000}
            />
          </View>
          <View style={{}}>
            <Text style={styles.title}>DATA PIN WATER LEVEL</Text>
            <DropDownPicker
              style={{
                marginTop: 10,
                borderColor: "#E3E3E3",
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
              }}
              dropDownContainerStyle={{
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
                maxHeight: (windowHeight * 10) / 100,
                marginTop: 0,
                borderColor: "#E3E3E3",
              }}
              scrollViewProps={{
                decelerationRate: "fast",
              }}
              modalContentContainerStyle={{
                backgroundColor: COLORS.RED,
              }}
              listMode="SCROLLVIEW"
              dropDownDirection="BOTTOM"
              onOpen={onSitemOpen}
              placeholder="Water level data"
              open={open6}
              value={value6}
              items={vanne_DHT}
              setOpen={setOpen6}
              setValue={setValue6}
              zIndex={1000}
            />
          </View>












        </View>

        <View style={{ height: 150 }}>
          <TouchableOpacity>
            <Text
              style={{
                color: COLORS.RED,
                fontSize: 16,
                fontWeight: "700",
                textAlign: "right",
                textDecorationLine: 'underline',
                marginHorizontal: 30,
              }}
              onPress={() => navigate.navigate('Help')}
            >
              help?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadiusTopRight: 5,
            borderRadiusTopLeft: 5,
            backgroundColor: "rgba(12, 12, 12, 0.6)",
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => AddController()}
            style={{
              backgroundColor: COLORS.GREEN,
              margin: 10,
              width: (windowWidth * 38) / 100,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "bold",
                padding: 10,
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              width: (windowWidth * 38) / 100,
              margin: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                padding: 10,
                color: "white",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  title: {
    marginLeft: 20,
    color: "#000",
    opacity: 0.7,
    fontSize: 14,
    fontWeight: "500",
  },
});
