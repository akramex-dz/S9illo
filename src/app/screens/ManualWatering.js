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
import PlantCardWatering from "../components/PlantCardWatering";

export default function ManualWatering({ navigation, route, index }) {
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
                        <PlantCardWatering
                            plant={item}
                            id={index}
                            display={displayDelete}
                            setPlantToIrregate={setPlantToIrregate}
                            plantToIrregate={plantToIrregate}
                        />
                    )}
                />
            </View>





            {/* 2BUTTONS */}
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
                    onPress={() => { }}
                    style={{
                        backgroundColor: "#00000035",
                        margin: 10,
                        width: "38%",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: 'row',

                    }}
                >
                    <Image
                        source={require("../../assets/images/settings.png")}
                        style={{ width: "15%" }}
                        resizeMode={"contain"}
                    />
                    <Text
                        style={{
                            color: "white",
                            fontFamily: 'CircularStd-Medium',
                            padding: "10%",
                        }}
                    >
                        Settings
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#00000035",
                        width: "38%",
                        margin: 10,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: 'row',
                    }}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                >
                    <Image
                        source={require("../../assets/images/irregateNow.png")}
                        style={{ width: "15%" }}
                        resizeMode={"contain"}
                    />
                    <Text
                        style={{
                            color: "white",
                            fontFamily: 'CircularStd-Medium',
                            padding: "10%",

                        }}
                    >
                        Irregate now!
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal visible={modalVisible} transparent={true}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#00000070' }}>
                    <View style={{ height: 237, width: 312, backgroundColor: '#FFFFFF', borderRadius: 15, alignItems: 'center' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#00000075', marginTop: 21 }}>
                            Add Time
                        </Text>


                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: '#00000075', marginLeft: 10 }}>
                                for :
                            </Text>
                            <TextInput onChangeText={(text) => { setMinTimeVar(text) }} keyboardType='number-pad' style={{ height: 29, width: 42, borderRadius: 4, borderWidth: 1, borderColor: '#E5E7F0', marginLeft: 10, paddingHorizontal: 10 }} />
                            <Text style={{ fontSize: 20, fontWeight: '500', color: '#00000075', marginLeft: 10 }}>
                                min
                            </Text>
                            <TextInput onChangeText={(text) => { setSecTimeVar(text) }} keyboardType='number-pad' style={{ height: 29, width: 42, borderRadius: 4, borderWidth: 1, borderColor: '#E5E7F0', marginLeft: 10, paddingHorizontal: 10 }} />
                            <Text style={{ fontSize: 20, fontWeight: '500', color: '#00000075', marginLeft: 10 }}>
                                s
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ borderRadius: 13, backgroundColor: '#00000070', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 42, width: 119, margin: 7 }}>
                                <Image source={require('../../assets/images/x-circle.png')} />
                                <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginLeft: 5 }}>
                                    Anuler
                                </Text>
                            </Pressable>
                            <Pressable onPress={irregateNow} style={{ borderRadius: 13, backgroundColor: '#07D779', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 42, width: 119, margin: 7 }}>
                                <Image source={require('../../assets/images/check.png')} />
                                <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginLeft: 5 }}>
                                    Confirmer
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* 
            <FloatingActionButton
                setDisplayDelete={setDisplayDelete}
                navigation={navigation}
            ></FloatingActionButton> */}
        </View>
    );
}
