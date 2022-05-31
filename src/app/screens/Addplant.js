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
import { ref, set, get } from "firebase/database";
import { ref as refStorage } from "firebase/storage"
import { ScrollView } from "react-native-gesture-handler";
import COLORS from "../../data/colors";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, uploadBytes } from "firebase/storage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const data_Pin = [
  { label: "DATA_PIN_A0", value: 0 },
  { label: "DATA_PIN_A1", value: 1 },
  { label: "DATA_PIN_A2", value: 2 },
  { label: "DATA_PIN_A3", value: 3 },
  { label: "DATA_PIN_A4", value: 4 },
  { label: "DATA_PIN_A5", value: 5 },
  { label: "DATA_PIN_A6", value: 6 },
];

const power_pin = [
  { label: "POWER_PIN_0", value: 0 },
  { label: "POWER_PIN_1", value: 1 },
  { label: "POWER_PIN_2", value: 2 },
  { label: "POWER_PIN_3", value: 3 },
  { label: "POWER_PIN_4", value: 4 },
  { label: "POWER_PIN_5", value: 5 },
  { label: "POWER_PIN_6", value: 6 },
  { label: "POWER_PIN_7", value: 7 },
  { label: "POWER_PIN_8", value: 8 },
  { label: "POWER_PIN_9", value: 9 },
];



const vanne_DHT = [
  { label: "VANNE_0", value: 0 },
  { label: "VANNE_1", value: 1 },
  { label: "VANNE_2", value: 2 },
  { label: "VANNE_3", value: 3 },
  { label: "VANNE_4", value: 4 },
  { label: "VANNE_5", value: 5 },
  { label: "VANNE_6", value: 6 },
  { label: "VANNE_7", value: 7 },
  { label: "VANNE_8", value: 8 },
  { label: "VANNE_9", value: 9 },
];
const cmd = {
  manual: {
    active: false,
    duration: 0,
  },
  programm: ["", "", "", ""],
  smart: false,
}

export default function AddPlant({ navigation, route }) {

  const { index, idRaspberry } = route.params;
  const [dwnUrl, setDwnUrl] = useState("");
  const [nbArduino, setNbArduino] = useState(0);
  const [lengthTest, SetLenghthTest] = useState(0);
  useEffect(() => {
    get(ref(db, "raspberries/" + idRaspberry + "/nbArduino")).then(
      (snapshot) => {
        setNbArduino(snapshot.val())
      }
    )


  }, [])
  const valueInitial = { T: "", V: "" };
  const tabNumberArduino = []
  for (let i = 0; i < nbArduino; i++) {
    tabNumberArduino[i] = { label: i + 1, value: i + 1 }


  }
  console.log("tabnumber");
  console.log(tabNumberArduino);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigation();
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (pickerResult.cancelled === true) {
      return;
    }
    if (!pickerResult.cancelled) {
      setSelectedImage(pickerResult.uri);




    }
  };
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);

  const [text, setText] = useState("");
  const [text1, setText1] = useState("");

  const onFitemOpen = useCallback(() => {
    setOpen1(false);
  }, []);

  const onSitemOpen = useCallback(() => {
    setOpen(false);
  }, []);

  const AddPlant = async () => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", selectedImage, true);
        xhr.send(null);
      });
      const fileRef = refStorage(storageRef, text + ".png")
      console.log("first")
      const result = await uploadBytes(fileRef, blob);
      blob.close();
      const dwnUrl = await getDownloadURL(fileRef)
      get(ref(db, "raspberries/" + idRaspberry + "/tabArduino/" + (value2 - 1).toString() + "/plants/")).then(
        (snapshot) => {
          SetLenghthTest(snapshot.val().length());
        }
      )
      await set(
        ref(
          db,
          "raspberries/" +
          idRaspberry +
          "/tabArduino/" + (value2 - 1).toString() +
          "/plants/" +
          (index - 1).toString()
        ),
        {
          airHumidity: [valueInitial],
          temperature: [valueInitial],
          soilMoisture: [valueInitial],
          commands: cmd,
          displayName: text,
          specie: text1,
          idArduino: value2,
          dataPinSM: value3,
          pinVanne: value4,
          picture: "",
          idRaspberry: idRaspberry,
          smMax: 60,
          smMin: 20,
          supprim: false,
          picture: dwnUrl,
          tMax: 25,
          tMin: 20,
          idPlant: index,
          valeursActuelles: {
            airHumidity: 0,
            soilMoisture: 0,
            temperature: 0,
          },
        }
      );
      navigation.goBack();
      console.log("added")
      console.log(plants);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10%', height: '5%' }}>
        <TouchableOpacity onPress={navigate.goBack} style={{ right: "240%", height: '80%', width: '10%', justifyContent: 'center', alignItems: 'center' }}  >
          <Image source={require('../../assets/images/backArrowBlack.png')} style={{ height: "50%" }} resizeMode="contain" />

        </TouchableOpacity>
        <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 23, color: 'black', right: '50%' }}>Add plant</Text></View>

      <ScrollView style={{ height: "100%", width: "100%" }}>
        <View
          style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#E3E3E3",
              borderRadius: 50,
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={openImagePickerAsync}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={{ borderRadius: 50, width: 100, height: 100 }}
                resizeMode="contain"
              />
            ) : (
              <Image source={require("../../assets/Group.png")} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.GREEN,
              position: "absolute",
              bottom: "10%",
              right: "38%",
              borderRadius: 50,
              width: 25,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={openImagePickerAsync}
          >
            <Image source={require("../../assets/select.png")}></Image>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              margin: 5,
              marginLeft: (windowWidth * 5) / 100,
            }}
          >
            General
          </Text>
          <View>
            <Text style={styles.title}>NAME</Text>
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
              placeholder="Enter your name"
              placeholderTextColor={"#00000070"}
              listMode="SCROLLVIEW"
              multiline={false}
              textAlign="left"
              textBreakStrategy="highQuality"
              maxLength={30}
            />
          </View>
          <View>
            <Text style={styles.title}>SPECIE</Text>
            <TextInput
              onChangeText={(text1) => setText1(text1.trimStart())}
              value={text1}
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
              placeholder="Enter your specie"
              placeholderTextColor={"#00000070"}
              listMode="SCROLLVIEW"
              multiline={false}
              textAlign="left"
              textBreakStrategy="highQuality"
              maxLength={30}
            />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              margin: 5,
              marginLeft: (windowWidth * 5) / 100,
            }}
          >
            Soil Moisture
          </Text>
          <View style={{}}>
            <Text style={styles.title}>POWER_PIN</Text>
            <DropDownPicker
              style={{
                marginTop: 3,
                borderColor: "#E3E3E3",
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
              }}
              open={open}
              onOpen={onFitemOpen}
              placeholder="POWER_PIN"
              dropDownContainerStyle={{
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
                maxHeight: (windowHeight * 13.1) / 100,
                marginTop: 0,
                borderColor: "#E3E3E3",
                paddingBottom: 5,
              }}
              listMode="SCROLLVIEW"
              value={value}
              items={power_pin}
              setOpen={setOpen}
              setValue={setValue}
              zIndex={10000}
            />
          </View>

          <View style={{}}>
            <Text style={styles.title}>DATA_PIN</Text>
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
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              onOpen={onSitemOpen}
              placeholder="DATA_PIN"
              open={open1}
              value={value1}
              items={data_Pin}
              setOpen={setOpen1}
              setValue={setValue1}
            />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              margin: 5,
              marginLeft: (windowWidth * 5) / 100,
            }}
          >
            Controller
          </Text>
          <View style={{}}>
            <Text style={styles.title}>Arduino number</Text>
            <DropDownPicker
              style={{
                marginTop: 3,
                borderColor: "#E3E3E3",
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
              }}
              listMode="SCROLLVIEW"
              open={open2}
              placeholder="Arduino number"
              dropDownContainerStyle={{
                width: (windowWidth * 90) / 100,
                margin: (windowWidth * 5) / 100,
                maxHeight: (windowHeight * 14) / 100,
                marginTop: 0,
                borderColor: "#E3E3E3",
              }}
              value={value2}
              items={tabNumberArduino}
              setOpen={setOpen2}
              setValue={setValue2}
            />
          </View>


          <View style={{}}>
            <Text style={styles.title}>Faucet</Text>
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
              placeholder="Faucet"
              open={open4}
              value={value4}
              items={vanne_DHT}
              setOpen={setOpen4}
              setValue={setValue4}
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
              onPress={() => navigate.navigate('Help')}            >
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
            onPress={() => AddPlant()}
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
