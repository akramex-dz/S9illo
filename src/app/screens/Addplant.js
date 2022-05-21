import React from "react";
import { useState, useCallback } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Pressable,
  Picker,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
];

export default function AddPlant({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

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
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const [state, setState] = useState("");
  const onFitemOpen = useCallback(() => {
    setOpen1(false);
  }, []);

  const onSitemOpen = useCallback(() => {
    setOpen(false);
  }, []);

  const confirmHandler = () => {
    const data = {
      controller: value,
      displayName: text,
      humidity: 22,
      moisture: 11,
      picture: "",
      specie: "typePlant",
      temperature: 40,
      picture:
        "https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1645689423/vendor/8567/catalog/product/2/0/20200304122155_file_5e5ef4a3ccb60_5e5ef7b7cd5fa.jpg",
    };
    // ajouter a data base
  };
  return (
    <View style={{ height: "100%", width: "100%" }}>
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
            backgroundColor: "#",
            borderRadius: 50,
            width: 25,
            height: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Image
            source={require("../../assets/select.png")}
            resizeMode="contain"
          ></Image> */}
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
          <Text style={{ marginLeft: 20 }}>Name</Text>
          <TextInput
            onChangeText={(text) => setText(text.trim())}
            value={text}
            style={{
              height: 50,
              width: (windowWidth * 90) / 100,
              borderWidth: 1,
              borderColor: "#E3E3E3",
              borderRadius: 10,
              marginTop: 3,
              margin: (windowWidth * 5) / 100,
              paddingHorizontal: 15,
            }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Lorem Ipsum"
            multiline={false}
            textAlign="left"
            textBreakStrategy="highQuality"
          />
        </View>
        <View>
          <Text style={{ marginLeft: 20 }}>Specie</Text>
          <TextInput
            onChangeText={(text1) => setText1(text1.trim())}
            value={text1}
            style={{
              height: 50,
              width: (windowWidth * 90) / 100,
              borderWidth: 1,
              borderColor: "#E3E3E3",
              borderRadius: 10,
              marginTop: 3,
              margin: (windowWidth * 5) / 100,
              paddingHorizontal: 15,
            }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Lorem Ipsum"
            multiline={false}
            textAlign="left"
            textBreakStrategy="highQuality"
          />
        </View>
        {console.log(text)}
        {console.log(text1)}
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
          <Text style={{ marginLeft: 20 }}>Controller</Text>
          <DropDownPicker
            style={{
              marginTop: 3,
              borderColor: "#E3E3E3",
              width: (windowWidth * 90) / 100,
              margin: (windowWidth * 5) / 100,
            }}
            open={open}
            zIndex={3000}
            zIndexInverse={1000}
            onOpen={onFitemOpen}
            dropDownContainerStyle={{
              width: (windowWidth * 90) / 100,
              margin: (windowWidth * 5) / 100,
              maxHeight: (windowHeight * 10) / 100,
              marginTop: 0,
              borderColor: "#E3E3E3",
            }}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
          />
        </View>

        <View style={{}}>
          <Text style={{ marginLeft: 20 }}>Moisture Sensor</Text>
          <DropDownPicker
            style={{
              marginTop: 3,
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
              backgroundColor: "#f80000",
            }}
            dropDownDirection="BOTTOM"
            listMode="FLATLIST"
            onOpen={onSitemOpen}
            open={open1}
            value={value1}
            items={items}
            setOpen={setOpen1}
            setValue={setValue1}
            zIndex={2000}
            zIndexInverse={2000}
          />
        </View>

        {/* <View>
          <Text style={{marginLeft: 20}}>Pin Number</Text>
          <DropDownPicker
            style={{
              borderColor: "#E3E3E3",
              marginTop: 3,
              width: (windowWidth * 90) / 100,
              margin: (windowWidth * 5) / 100,
            }}
            open={open2}
            value={value2}
            items={items}
            setOpen={setOpen2}
            setValue={setValue2}
            dropDownContainerStyle={{
              width: (windowWidth * 90) / 100,
              margin: (windowWidth * 5) / 100,
              maxHeight: (windowHeight * 10) / 100,
              marginTop: 0,
              borderColor: "#E3E3E3",
            }}
            zIndex={1000}
            zIndexInverse={3000}
          />
        </View> */}
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
          style={{
            backgroundColor: "rgba(7, 215, 121, 0.5)",
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});