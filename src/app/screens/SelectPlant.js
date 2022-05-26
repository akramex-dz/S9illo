import {
    View,
    FlatList,
    Image, Text,
    Dimensions,
    TextInput, TouchableOpacity,
    Pressable,
    StyleSheet, Modal
} from "react-native";
import { ref, onValue, set, get, update } from "firebase/database"
import { db } from "../../core/firebase"

import COLORS from "../../data/colors";
import { useEffect, useState } from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import PlantCardSelect from "../components/PlantCardSelect";

export default function SelectPlant({ route, index }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [mintimevar, setMinTimeVar] = useState("")
    const [sectimevar, setSecTimeVar] = useState("")
    const [displayDelete, setDisplayDelete] = useState(false);
    const [value, setValue] = useState("");
    const [plantToIrregate, setPlantToIrregate] = useState([]);
    useEffect(() => {
        console.log(plants);
    }, []);
    useEffect(() => {
        console.log("tabirregate");
        console.log(plantToIrregate);
    }, [plantToIrregate]);

    const { plants } = route.params;
    const irregateNow = () => {
        get(ref(db, "raspberries/" + plants[0].idRaspberry.toString() + "/tabArduino")).then((snapshot) => {
            if (snapshot.exists()) {

                snapshot.val().forEach((childSnapshot) => {
                    childSnapshot["plants"].forEach((childChildSnapshot) => {
                        console.log("plantstoirregate  " + plantToIrregate);
                        console.log("child  " + childChildSnapshot);
                        if (plantToIrregate.includes(childChildSnapshot.idPlant)) {
                            update(ref(db, "raspberries/" + childChildSnapshot.idRaspberry + "/tabArduino/" + childChildSnapshot.idArduino + "/plants/" + childChildSnapshot.idPlant + "/commands/manual"), {
                                active: true,
                                duration: parseInt(mintimevar) * 60 + parseInt(sectimevar),
                            });

                        }
                    })
                });
            }
            else {
                console.log("no data");
            }
        }).catch((e) => {
            console.log(e)
        }).finally(() => {
            console.log("DONE")
            setModalVisible(false)

        })


    };
    // const addhandler = () => {
    //     console.log(newData[daysIndex])
    //     // newData[daysIndex][newData[daysIndex].length] = { time: timevar1 + " : " + timevar2, minutes: mintimevar, secondes: sectimevar }
    //     set(ref(db, 'raspberries/' + plant.idRaspberry + "/tabArduino/" + plant.idArduino + "/plants/" + plant.idPlant + "/commands/programm/" + (index - 1) + "/" + daysIndex + "/" + ((newData[daysIndex] === undefined) ? `0` : `${newData[daysIndex].length}`)), {
    //         trait: false,
    //         time: timevar1 + " : " + timevar2,
    //         minutes: mintimevar,
    //         secondes: sectimevar,

    //     });
    //     // if (index === 1) {
    //     //     setHoursWeek1(newData)
    //     // }
    //     // if (index === 2) {
    //     //     setHoursWeek2(newData)
    //     // }
    //     // if (index === 3) {
    //     //     setHoursWeek3(newData)

    //     // }
    //     // if (index === 4) {
    //     //     setHoursWeek4(newData)
    //     // }
    //     setModalVisible(false)
    // }
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
                        <PlantCardSelect
                            plant={item}
                            id={index}
                            display={displayDelete}
                            setPlantToIrregate={setPlantToIrregate}
                            plantToIrregate={plantToIrregate}
                        />
                    )}
                />
            </View>





        </View>
    );
}
