import {
  View,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";

import COLORS from "../../data/colors";
import { useEffect, useState } from "react";
import PlantCard from "../components/PlantCard";
import FloatingActionButton from "../components/FloatingActionButton";
import CheckBox from "../components/CheckBox";
import Header from "../components/Header"

export default function MyPlants({ plants, navigation, idRaspberry, index }) {
  console.log("plants: " + plants)
  const [displayDelete, setDisplayDelete] = useState(false);
  const [value, setValue] = useState("");
  const [plantToDelete, setPlantToDelete] = useState([]);
  useEffect(() => {
    console.log(plants);
  }, []);
  useEffect(() => {
    console.log(plantToDelete);
  }, [plantToDelete]);
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <Header idRaspberry={idRaspberry} />

      <View
        style={{
          height: (75 * Dimensions.get("screen").height) / 100,
          width: "80%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#00000025",
              borderWidth: 2,
              borderRadius: 20,
              flex: 1,
              marginRight: 5,
            }}
          >
            <Image
              source={require("../../assets/myPlants/search.png")}
              style={{ height: 40, width: 40 }}
              resizeMode={"contain"}
            />
            <TextInput
              placeholder="Search"
              value={value}
              onChangeText={setValue}
              style={{ flex: 1 }}
            />
          </View>
          <Pressable
            android_ripple={{
              color: "#00000025",
            }}
          >
            <Image source={require("../../assets/myPlants/sliders.png")} />
          </Pressable>
        </View>
        <View style={{ marginTop: 10, flex: 1, width: "100%" }}>
          <FlatList
            keyExtractor={(_, index) => index}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={plants}
            renderItem={({ item, index }) => (
              <PlantCard
                plant={item}
                moisture={item.valeursActuelles?.soilMoisture || ""}
                display={displayDelete}
                setPlantToDelete={setPlantToDelete}
                plantToDelete={plantToDelete}
              />
            )}
          />
        </View>
      </View>
      {console.log("id: ")}
      {console.log(idRaspberry)}
      <FloatingActionButton
        idRaspberry={idRaspberry}
        index={plants.length}
        setDisplayDelete={setDisplayDelete}
        navigation={navigation}
      ></FloatingActionButton>
    </View>
  );
}



