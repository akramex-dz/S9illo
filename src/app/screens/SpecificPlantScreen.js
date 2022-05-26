import { Image, Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { Switch } from "react-native-switch";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import { auth, db } from '../../core/firebase'

import { ref, onValue, set, get, update } from "firebase/database"
import { useNavigation } from "@react-navigation/native";


//dependency npm install --save react-native-switch !!
//expo install react-native-date-picker expo-dev-client


export default function SpecificPlantSceen({ route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const { plant } = route.params;
    const navigate = useNavigation();

    const [timevar1, setTimeVar1] = useState("")
    const [timevar2, setTimeVar2] = useState("")
    const [mintimevar, setMinTimeVar] = useState("")
    const [sectimevar, setSecTimeVar] = useState("")






    const weeks = [1, 2, 3, 4]
    const [hoursWeek1, setHoursWeek1] = useState([[], [], [], [], [], [], []])
    const [hoursWeek2, setHoursWeek2] = useState([[], [], [], [], [], [], []])
    const [hoursWeek3, setHoursWeek3] = useState([[], [], [], [], [], [], []])
    const [hoursWeek4, setHoursWeek4] = useState([[], [], [], [], [], [], []])
    useEffect(() => {
        get(ref(db, 'raspberries/' + plant.idRaspberry + "/tabArduino/" + plant.idArduino + "/plants/" + plant.idPlant + "/commands/programm/")).then((snapshot) => {
            if (snapshot.exists()) {
                setHoursWeek1(snapshot.val()[0]);
                setHoursWeek2(snapshot.val()[1]);
                setHoursWeek3(snapshot.val()[2]);
                setHoursWeek4(snapshot.val()[3]);

            }
            else {
                console.log("mafihach");
            }
        }).catch((e) => {
            console.log("ERR");

        });
    }, []);
    const [index, setIndex] = useState(1)
    const [daysIndex, setDaysIndex] = useState(0)

    const addTimeHandler = (day) => {
        setDaysIndex(day)
    }

    const addhandler = () => {
        let newData;
        if (index === 1) {
            newData = [...hoursWeek1];
        }
        else if (index === 2) {
            console.log("yis: ");

            newData = [...hoursWeek2];
        }
        else if (index === 3) {
            newData = [...hoursWeek3];
        }
        else {
            newData = [...hoursWeek4];
        }
        console.log(newData[daysIndex])
        // newData[daysIndex][newData[daysIndex].length] = { time: timevar1 + " : " + timevar2, minutes: mintimevar, secondes: sectimevar }

        console.log(daysIndex)
        set(ref(db, 'raspberries/' + plant.idRaspberry + "/tabArduino/" + plant.idArduino + "/plants/" + plant.idPlant + "/commands/programm/" + (index - 1) + "/" + daysIndex + "/" + ((newData[daysIndex] === undefined) ? `0` : `${newData[daysIndex].length}`)), {
            trait: false,
            time: timevar1 + " : " + timevar2,
            minutes: mintimevar,
            secondes: sectimevar,

        });
        setModalVisible(false)
    }


    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        get(ref(db, 'raspberries/' + plant.idRaspberry + "/tabArduino/" + plant.idArduino + "/plants/" + plant.idPlant + "/commands/smart")).then((snapshot) => {
            update(ref(db, 'raspberries/' + plant.idRaspberry + "/tabArduino/" + plant.idArduino + "/plants/" + plant.idPlant + "/commands/"), {
                smart: !snapshot.val(),

            });
        }).catch((e) => {
            console.log("ERR");

        });
        console.log('Value changed');

    }
    return (
        <View>
            <ScrollView style={{ height: '100%', width: '100%', backgroundColor: '#07D779' }}>


                <View style={{ backgroundColor: '#07D779', width: '100%' }}>


                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={navigate.goBack} >
                            <Image source={require('../../assets/images/backArrow.png')} style={{ marginLeft: 21.5, marginTop: 29.5, width: 40 }} resizeMode={'contain'} />

                        </Pressable>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: 'white', marginLeft: 165, marginTop: 27, position: 'absolute' }}>
                            Details
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ fontSize: 28, fontWeight: '700', color: 'white', marginTop: 60, marginLeft: 20 }}>
                                {plant.displayName}
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: 'white', marginTop: 15, marginLeft: 20 }}>
                                {plant.specie}
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '700', color: 'white', marginTop: 24, marginLeft: 20, width: 152 }}>
                                Les fraisiers ont besoin d'un sol fertile, humifère, sableux. La fraise a besoin de beaucoup de soleil pour que se développent toutes ses saveurs.
                            </Text>
                        </View>
                        <Image source={plant.picture ? { uri: plant.picture, } : require("../../assets/images/Group7.png")} style={{ height: "58%", width: "40%", marginTop: '15%', marginLeft: '5%', borderRadius: 1000 }} resizeMode='contain' />

                    </View>
                </View>

                {/* TOP VIEW */}

                <View style={{ backgroundColor: '#FFFFFF', flexDirection: 'column', width: '100%', marginTop: 50, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                        <View style={{ marginTop: 39 }}>
                            <View style={{ flexDirection: 'row', marginBottom: '5%' }}>
                                <Image source={require('../../assets/images/humidity1.png')} resizeMode='contain' style={{ height: '80%', alignSelf: 'center' }} />
                                <Text style={{ fontSize: 28, fontFamily: 'CircularStd-Bold', color: '#00000090', right: '25%' }}>
                                    {((plant.valeursActuelles).airHumidity)}%
                                </Text>
                            </View>
                            <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 13, color: '#00000090', alignSelf: 'center' }}>
                                HUMIDITY
                            </Text>


                        </View>
                        <View style={{ marginTop: 39 }}>
                            <View style={{ flexDirection: 'row', marginBottom: '5%' }}>
                                <Image source={require('../../assets/images/temp.png')} resizeMode='contain' style={{ height: '80%', alignSelf: 'center' }} />
                                <Text style={{ fontSize: 28, fontFamily: 'CircularStd-Bold', color: '#00000090', right: '5%' }}>
                                    {((plant.valeursActuelles).temperature)}°c
                                </Text>
                            </View>
                            <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 13, color: '#00000090', alignSelf: 'center' }}>
                                TEMPERATURE
                            </Text>


                        </View>

                        <View style={{ marginTop: 39 }}>
                            <View style={{ flexDirection: 'row', marginBottom: '5%' }}>
                                <Image source={require('../../assets/images/moisture.png')} resizeMode='contain' style={{ height: '80%', alignSelf: 'center' }} />
                                <Text style={{ fontSize: 28, fontFamily: 'CircularStd-Bold', color: '#00000090', right: '15%' }}>
                                    {((plant.valeursActuelles).soilMoisture)}%
                                </Text>
                            </View>
                            <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 13, color: '#00000090', alignSelf: 'center' }}>
                                MOISTURE
                            </Text>


                        </View>
                    </View>

                    {/* SWITCH SECTION */}
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Switch
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            activeText={'automatic'}
                            inActiveText={'manual'}
                            backgroundActive={'#07D779'}
                            backgroundInactive={'#E8E8E8'}
                            circleActiveColor={'white'}
                            circleInActiveColor={'white'}
                            circleBorderWidth={0}
                            switchWidthMultiplier={3.5}
                        />
                    </View>

                    {/* DERNIERS ARROSAGES */}
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 22, fontWeight: '700', color: '#000000', marginLeft: 21 }}>
                            Derniers Arrosages
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#00000055', marginLeft: 21, width: 189 }}>
                            Wednesday, january 26th
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#00000055', marginLeft: 21, width: 189 }}>
                            07:00
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#00000055', marginLeft: 21, width: 189 }}>
                            10 min
                        </Text>
                        <Text style={{ fontSize: 22, fontWeight: '700', color: '#000000', marginLeft: 21, marginTop: 22 }}>
                            Schedule
                        </Text>
                    </View>

                    {/* flatslist */}
                    <FlatList showsHorizontalScrollIndicator={false} contentContainerStyle={{}} horizontal data={weeks} keyExtractor={item => item} renderItem={({ item }) => <TouchableOpacity onPress={() => { setIndex(item) }} >
                        <View style={index === item ? styles.SelectedWeek : styles.UnSelectedWeek}>
                            <Text style={{ fontWeight: '700', fontSize: 14, color: '#595959' }}>
                                week {item}
                            </Text>
                        </View>

                    </TouchableOpacity>} />

                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} flexDirection='row' contentContainerStyle={{ justifyContent: 'space-around', marginTop: 5 }}>
                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ height: 9, width: 165, backgroundColor: '#07D779', borderRadius: 5 }} />
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 10, marginTop: 4 }} >
                                Sunday
                            </Text>
                            <View>
                                <FlatList data={(index == 1) ? hoursWeek1[0] : ((index == 2) ? hoursWeek2[0] : ((index == 3) ? hoursWeek3[0] : hoursWeek4[0]))}
                                    keyExtractor={(_, index) => index}
                                    renderItem={({ item }) => <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 7, marginTop: 4 }}>
                                            {(item === undefined) ? "" : `${item.time} for ${item.minutes} min ${item.secondes} s`}
                                        </Text>
                                    </View>} />
                                <Text onPress={() => { setModalVisible(true); addTimeHandler(0) }} style={{ fontWeight: '700', fontSize: 12, color: '#07D779', marginLeft: 7, marginTop: 4, marginBottom: 10 }} >
                                    + Add Time
                                </Text>
                            </View>


                        </View>

                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ height: 9, width: 165, backgroundColor: '#07D779', borderRadius: 5 }} />
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                                Monday
                            </Text>
                            <View>
                                <FlatList data={(index == 1) ? hoursWeek1[1] : ((index == 2) ? hoursWeek2[1] : ((index == 3) ? hoursWeek3[1] : hoursWeek4[1]))}
                                    keyExtractor={(_, index) => index}
                                    renderItem={({ item }) => <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                            {(item === undefined) ? "" : `${item.time} for ${item.minutes} min ${item.secondes} s`}

                                        </Text>
                                    </View>} />
                                <Text onPress={() => { setModalVisible(true); addTimeHandler(1) }} style={{ fontWeight: '700', fontSize: 12, color: '#07D779', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                    + Add Time
                                </Text>
                            </View>

                        </View>

                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ height: 9, width: 165, backgroundColor: '#07D779', borderRadius: 5 }} />
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                                Tuesday
                            </Text>
                            <View>
                                <FlatList data={(index == 1) ? hoursWeek1[2] : ((index == 2) ? hoursWeek2[2] : ((index == 3) ? hoursWeek3[3] : hoursWeek4[4]))}
                                    keyExtractor={(_, index) => index}
                                    renderItem={({ item }) => <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                            {(item === undefined) ? "" : `${item.time} for ${item.minutes} min ${item.secondes} s`}

                                        </Text>
                                    </View>} />
                                <Text onPress={() => { setModalVisible(true); addTimeHandler(2) }} style={{ fontWeight: '700', fontSize: 12, color: '#07D779', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                    + Add Time
                                </Text>
                            </View>

                        </View>

                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ height: 9, width: 165, backgroundColor: '#07D779', borderRadius: 5 }} />
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                                Wednesday
                            </Text>
                            <View>
                                <FlatList data={(index == 1) ? hoursWeek1[3] : ((index == 2) ? hoursWeek2[3] : ((index == 3) ? hoursWeek3[3] : hoursWeek4[3]))}
                                    keyExtractor={(_, index) => index}
                                    renderItem={({ item }) => <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                            {(item === undefined) ? "" : `${item.time} for ${item.minutes} min ${item.secondes} s`}

                                        </Text>
                                    </View>} />
                                <Text onPress={() => { setModalVisible(true); addTimeHandler(3) }} style={{ fontWeight: '700', fontSize: 12, color: '#07D779', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                    + Add Time
                                </Text>
                            </View>

                        </View>

                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ height: 9, width: 165, backgroundColor: '#07D779', borderRadius: 5 }} />
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                                Thursday
                            </Text>
                            <View>
                                <FlatList data={(index == 1) ? hoursWeek1[4] : ((index == 2) ? hoursWeek2[4] : ((index == 3) ? hoursWeek3[4] : hoursWeek4[4]))}
                                    keyExtractor={(_, index) => index}
                                    renderItem={({ item }) => <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                            {(item === undefined) ? "" : `${item.time} for ${item.minutes} min ${item.secondes} s`}

                                        </Text>
                                    </View>} />
                                <Text onPress={() => { setModalVisible(true); addTimeHandler(4) }} style={{ fontWeight: '700', fontSize: 12, color: '#07D779', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                    + Add Time
                                </Text>
                            </View>

                        </View>

                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ height: 9, width: 165, backgroundColor: '#07D779', borderRadius: 5 }} />
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                                Friday
                            </Text>
                            <View>
                                <FlatList data={(index == 1) ? hoursWeek1[5] : ((index == 2) ? hoursWeek2[5] : ((index == 3) ? hoursWeek3[5] : hoursWeek4[5]))}
                                    keyExtractor={(_, index) => index}
                                    renderItem={({ item }) => <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                            {(item === undefined) ? "" : `${item.time} for ${item.minutes} min ${item.secondes} s`}

                                        </Text>
                                    </View>} />
                                <Text onPress={() => { setModalVisible(true); addTimeHandler(5) }} style={{ fontWeight: '700', fontSize: 12, color: '#07D779', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                    + Add Time
                                </Text>
                            </View>

                        </View>

                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ height: 9, width: 165, backgroundColor: '#07D779', borderRadius: 5 }} />
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                                Saturday
                            </Text>
                            <View>
                                <FlatList data={(index == 1) ? hoursWeek1[6] : ((index == 2) ? hoursWeek2[6] : ((index == 3) ? hoursWeek3[6] : hoursWeek4[6]))}
                                    keyExtractor={(_, index) => index}
                                    renderItem={({ item }) => <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                            {(item === undefined) ? "" : `${item.time} for ${item.minutes} min ${item.secondes} s`}

                                        </Text>
                                    </View>} />
                                <Text onPress={() => { setModalVisible(true); addTimeHandler(6) }} style={{ fontWeight: '700', fontSize: 12, color: '#07D779', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                    + Add Time
                                </Text>
                            </View>
                        </View>


                    </ScrollView>





                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', paddingTop: 20, paddingBottom: 20 }}>
                    <TouchableOpacity style={{ width: 250, height: 35, backgroundColor: '#07D779', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigate.navigate('GraphicCardScreen', { plant }) }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>
                            Visualisation des données
                        </Text>
                    </TouchableOpacity>
                </View>






            </ScrollView >

            <Modal visible={modalVisible} transparent={true}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#00000070' }}>
                    <View style={{ height: 237, width: 312, backgroundColor: '#FFFFFF', borderRadius: 15, alignItems: 'center' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#00000075', marginTop: 21 }}>
                            Add Time
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: '#00000075', marginLeft: 10 }}>
                                at :
                            </Text>
                            <TextInput onChangeText={(text) => { setTimeVar1(text) }} keyboardType='number-pad' style={{ height: 29, width: 42, borderRadius: 4, borderWidth: 1, borderColor: '#E5E7F0', marginLeft: 10, paddingHorizontal: 10 }} />
                            <Text style={{ fontSize: 20, fontWeight: '500', color: '#00000075', marginLeft: 10 }}>
                                :
                            </Text>
                            <TextInput onChangeText={(text) => { setTimeVar2(text) }} keyboardType='number-pad' style={{ height: 29, width: 42, borderRadius: 4, borderWidth: 1, borderColor: '#E5E7F0', marginLeft: 10, paddingHorizontal: 10 }} />
                        </View>


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
                                    Annuler
                                </Text>
                            </Pressable>
                            <Pressable onPress={addhandler} style={{ borderRadius: 13, backgroundColor: '#07D779', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 42, width: 119, margin: 7 }}>
                                <Image source={require('../../assets/images/check.png')} />
                                <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginLeft: 5 }}>
                                    Confirmer
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

        </View >






    )

}
const styles = StyleSheet.create({

    SelectedWeek: {
        margin: 10, height: 34, width: 86, backgroundColor: '#07D779', alignItems: 'center', justifyContent: 'center', borderRadius: 5
    },
    UnSelectedWeek: {
        margin: 10, height: 34, width: 86, backgroundColor: '#E8E8E8', alignItems: 'center', justifyContent: 'center', borderRadius: 5
    },

});


