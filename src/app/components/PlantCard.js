import { Image, Pressable, Text, View } from "react-native";
import COLORS from "../../data/colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


import CheckBox from "./CheckBox";
export default function PlantCard({
  plant,
  etat,
  moisture,
  display,
  setPlantToDelete,
  plantToDelete, navigation
}) {
  console.log("moisture");
  console.log(moisture);
  const navigate = useNavigation();
  const [check, setCheck] = useState(false);
  const checkHandler = () => {
    const plants = [...plantToDelete];
    if (check) {
      setCheck(false);
      const index = plants.indexOf((item) => item === plant.id);
      plants.splice(index, 1);
      setPlantToDelete(plants);
    } else {
      setCheck(true);
      plants.push(plant.id);
      setPlantToDelete(plants);
    }
  };
  return (
    <View
      style={{
        width: "48%",
        position: "relative",
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: "1%",
        overflow: "hidden",
        shadowColor: '#000000',
        elevation: 5,
      }}
    >
      <Pressable
        android_ripple={{ color: "#000" }}
        style={{
          alignItems: "center",
          backgroundColor: "white",
          padding: 5,
        }}
        onPress={() => {
          navigate.navigate('SpecificPlantScreen', { plant });
        }}
      >
        <Image
          resizeMode="contain"
          style={{ width: "90%", height: 100, borderRadius: 15 }}
          source={
            plant.picture
              ? {
                uri: plant.picture,
              }
              : require("../../assets/Group.png")
          }
        />
        <Text style={{ color: COLORS.GREEN, fontWeight: "bold", fontSize: 16 }}>
          {plant.displayName}
        </Text>
        <Text style={{ color: COLORS.GRAY, fontWeight: "600" }}>{((moisture) > 20 && (moisture) < 60) ? "Bon état" : "Click!"}</Text>
        {display && (
          <View
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              height: 25,
              width: 25,
            }}
          >
            <CheckBox
              onPress={() => checkHandler()}
              title="Check"
              isChecked={check}
            ></CheckBox>
          </View>
        )}
      </Pressable>
    </View>
  );
}