import {
    View,
    FlatList,
    Image,
    Dimensions,
    TextInput,
    Pressable,
    StyleSheet
} from "react-native";

import COLORS from "../../data/colors";
import { useEffect, useState } from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import PlantCardWatering from "../components/PlantCardWatering";

export default function Watering({ navigation, route }) {
    const [displayDelete, setDisplayDelete] = useState(false);
    const [value, setValue] = useState("");
    const [plantToDelete, setPlantToDelete] = useState([]);
    useEffect(() => {
        console.log(plants);
    }, []);
    useEffect(() => {
        console.log(plantToDelete);
    }, [plantToDelete]);

    const { plants } = route.params;
    return (
        <View
            style={{
                alignItems: "center",
                backgroundColor: "#fff",
                height: "100%",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    width: "85%",
                    marginTop: 10,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderColor: "#00000025",
                        borderWidth: 1,
                        borderRadius: 20,
                        flex: 1,
                        marginRight: 5,
                    }}
                >
                    <Image
                        source={require("../../assets/myPlants/search.png")}
                        style={{}}
                        resizeMode={"contain"}
                    />
                    <TextInput
                        placeholder="Search"
                        value={value}
                        onChangeText={setValue}
                        style={{ flex: 1 }}
                    />
                </View>
            </View>
            <View style={{ marginTop: '5%', width: "100%", }}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    style={{ height: "100%", width: "100%" }}
                    data={plants}
                    renderItem={({ item, index }) => (
                        <PlantCardWatering
                            name={item.displayName}
                            img={item.picture}
                            type={item.specie}
                            id={item.id}
                            display={displayDelete}
                            setPlantToDelete={setPlantToDelete}
                            plantToDelete={plantToDelete}
                            actualMoisture={item.moisture.length !== 0 ? item.moisture[item.moisture.length - 1].V : 0}


                        />
                    )}
                />
            </View>
            <FloatingActionButton
                setDisplayDelete={setDisplayDelete}
                navigation={navigation}
            ></FloatingActionButton>
        </View>
    );
}
