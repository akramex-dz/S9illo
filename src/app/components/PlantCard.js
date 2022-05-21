import { Image, Pressable, Text, View } from "react-native";
import COLORS from "../../data/colors";
import { useState } from "react";

import CheckBox from "./checkBox";
export default function PlantCard({
  name,
  img,
  etat,
  display,
  id,
  setPlantToDelete,
  plantToDelete,
}) {
  const [check, setCheck] = useState(false);
  const checkHandler = () => {
    const plants = [...plantToDelete];
    if (check) {
      setCheck(false);
      const index = plants.indexOf((item) => item === id);
      plants.splice(index, 1);
      setPlantToDelete(plants);
    } else {
      setCheck(true);
      plants.push(id);
      setPlantToDelete(plants);
    }
  };
  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        width: '48%',
        height: '85%',
        shadowColor: '#000000',
        elevation: 5,
        borderRadius: 20,
        margin: '5%',
        overflow: 'hidden'
      }}
    >
      <Pressable
        android_ripple={{ color: "#000" }}
        style={{
          alignItems: "center",
          backgroundColor: "white",
          padding: 5,
        }}
      >
        <Image
          resizeMode="contain"
          style={{ width: "100%", height: 100 }}
          source={{
            uri: img,
          }}
        />
        <Text style={{ color: COLORS.GREEN, fontWeight: "bold", fontSize: 16 }}>
          {name}
        </Text>
        <Text style={{ color: COLORS.GRAY, fontWeight: "600" }}>{etat}</Text>
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
