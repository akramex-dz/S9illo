import { Image, Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { Switch } from "react-native-switch";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import { auth, db } from '../../core/firebase'
import COLORS from "../../data/colors";

import { ref, onValue, set, get, update } from "firebase/database"
import { useNavigation } from "@react-navigation/native";


export default function WateringSettings({ navigation, route }) {
    const { plant } = route.params;
    const navigate = useNavigation();

    const [text, setText] = useState('Set a detailed Schedule')
    const [img, setImg] = useState(require('../../assets/images/ManSchedule.png'))
    const [modalVisible, setModalVisible] = useState(false);


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
        setIsEnabled(o => !o)
        setText(isEnabled ? 'Set a detailed Schedule' : 'Our smart system will handle Watering')
        setImg(isEnabled ? require('../../assets/images/ManSchedule.png') : require('../../assets/images/ManPhone.png'))
        get(ref(db, 'raspberries/' + plant.idRaspberry + "/tabArduino/" + plant.idArduino + "/plants/" + plant.idPlant + "/commands/smart")).then((snapshot) => {
            update(ref(db, 'raspberries/' + plant.idRaspberry + "/tabArduino/" + plant.idArduino + "/plants/" + plant.idPlant + "/commands/"), {
                smart: !snapshot.val(),

            });
        }).catch((e) => {
            console.log("ERR");

        });
        console.log('Value changed')
    }



    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 4,
                    width: 300,
                    height: 300,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginTop: 50,
                    alignItems: 'center'
                }}>
                    <Image source={img} resizeMode={'contain'} style={{ marginTop: 30 }} />
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#00000050', marginTop: 17 }}>
                        {text}
                    </Text>
                    <View style={{ marginTop: 20 }}>
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
                </View>

                <View style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 3,
                    width: 350,
                    height: 80,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginTop: 30,
                    flexDirection: 'row'
                }}>
                    <Image
                        resizeMode="contain"
                        style={{ height: 50, width: 50, borderRadius: 10, marginLeft: '5%', alignSelf: 'center' }}
                        source={plant.picture ? {
                            uri: plant.picture,
                        } : require('../../assets/myPlants/plants/plant1.png')}
                    />
                    <View style={{ flex: 1, left: '20%', alignSelf: 'center' }}>
                        <Text style={{
                            color: COLORS.GREEN, fontFamily: 'CircularStd-Bold', fontSize: 17
                        }}>
                            {plant.displayName}
                        </Text>
                        <Text style={{ color: COLORS.GRAY, fontFamily: 'CircularStd-Medium', }}>{plant.specie}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate.goBack()} style={{ width: 110, height: 30, borderRadius: 10, backgroundColor: !isEnabled ? '#07D779' : '#00000025', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginRight: 20 }}>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: 'white' }}>
                            Select plant
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 22, fontWeight: '700', color: '#00000075', marginRight: 250, marginTop: 20, marginBottom: 15 }}>
                    Schedule
                </Text>

                <FlatList showsHorizontalScrollIndicator={false} contentContainerStyle={{}} horizontal data={weeks} keyExtractor={item => item} renderItem={({ item }) => <TouchableOpacity onPress={() => { setIndex(item) }} >
                    <View style={index === item ? { margin: 10, height: 34, width: 86, backgroundColor: !isEnabled ? '#07D779' : '#00000025', alignItems: 'center', justifyContent: 'center', borderRadius: 5 } : { margin: 10, height: 34, width: 86, backgroundColor: !isEnabled ? '#E8E8E8' : '#00000025', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                        <Text style={{ fontWeight: '700', fontSize: 14, color: !isEnabled ? '#595959' : 'white' }}>
                            week {item}
                        </Text>
                    </View>

                </TouchableOpacity>} />

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} flexDirection='row' contentContainerStyle={{ justifyContent: 'space-around', marginTop: 5 }}>
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ height: 9, width: 165, backgroundColor: !isEnabled ? '#07D779' : '#00000025', borderRadius: 5 }} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 10, marginTop: 4 }} >
                            Sunday
                        </Text>
                        <View>
                            <FlatList data={(index == 1) ? hoursWeek1[0] : ((index == 2) ? hoursWeek2[0] : ((index == 3) ? hoursWeek3[0] : hoursWeek4[0]))}
                                keyExtractor={(_, index) => index}
                                renderItem={({ item }) => <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 7, marginTop: 4 }}>
                                        {item.time} for {item.minutes} min {item.secondes} s
                                    </Text>
                                </View>} />
                            <Text onPress={() => { setModalVisible(true); addTimeHandler(0) }} style={{ fontWeight: '700', fontSize: 12, color: !isEnabled ? '#07D779' : '#00000025', marginLeft: 7, marginTop: 4, marginBottom: 10 }} >
                                + Add Time
                            </Text>
                        </View>


                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ height: 9, width: 165, backgroundColor: !isEnabled ? '#07D779' : '#00000025', borderRadius: 5 }} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                            Monday
                        </Text>
                        <View>
                            <FlatList data={(index == 1) ? hoursWeek1[1] : ((index == 2) ? hoursWeek2[1] : ((index == 3) ? hoursWeek3[1] : hoursWeek4[1]))}
                                keyExtractor={(_, index) => index}
                                renderItem={({ item }) => <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                        {item.time} for {item.minutes} min {item.secondes} s
                                    </Text>
                                </View>} />
                            <Text onPress={() => { setModalVisible(true); addTimeHandler(1) }} style={{ fontWeight: '700', fontSize: 12, color: !isEnabled ? '#07D779' : '#00000025', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                + Add Time
                            </Text>
                        </View>

                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ height: 9, width: 165, backgroundColor: !isEnabled ? '#07D779' : '#00000025', borderRadius: 5 }} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                            Tuesday
                        </Text>
                        <View>
                            <FlatList data={(index == 1) ? hoursWeek1[2] : ((index == 2) ? hoursWeek2[2] : ((index == 3) ? hoursWeek3[3] : hoursWeek4[4]))}
                                keyExtractor={(_, index) => index}
                                renderItem={({ item }) => <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                        {item.time} for {item.minutes} min {item.secondes} s
                                    </Text>
                                </View>} />
                            <Text onPress={() => { setModalVisible(true); addTimeHandler(2) }} style={{ fontWeight: '700', fontSize: 12, color: !isEnabled ? '#07D779' : '#00000025', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                + Add Time
                            </Text>
                        </View>

                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ height: 9, width: 165, backgroundColor: !isEnabled ? '#07D779' : '#00000025', borderRadius: 5 }} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                            Wednesday
                        </Text>
                        <View>
                            <FlatList data={(index == 1) ? hoursWeek1[3] : ((index == 2) ? hoursWeek2[3] : ((index == 3) ? hoursWeek3[3] : hoursWeek4[3]))}
                                keyExtractor={(_, index) => index}
                                renderItem={({ item }) => <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                        {item.time} for {item.minutes} min {item.secondes} s
                                    </Text>
                                </View>} />
                            <Text onPress={() => { setModalVisible(true); addTimeHandler(3) }} style={{ fontWeight: '700', fontSize: 12, color: !isEnabled ? '#07D779' : '#00000025', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                + Add Time
                            </Text>
                        </View>

                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ height: 9, width: 165, backgroundColor: !isEnabled ? '#07D779' : '#00000025', borderRadius: 5 }} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                            Thursday
                        </Text>
                        <View>
                            <FlatList data={(index == 1) ? hoursWeek1[4] : ((index == 2) ? hoursWeek2[4] : ((index == 3) ? hoursWeek3[4] : hoursWeek4[4]))}
                                keyExtractor={(_, index) => index}
                                renderItem={({ item }) => <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                        {item.time} for {item.minutes} min {item.secondes} s
                                    </Text>
                                </View>} />
                            <Text onPress={() => { setModalVisible(true); addTimeHandler(4) }} style={{ fontWeight: '700', fontSize: 12, color: !isEnabled ? '#07D779' : '#00000025', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                + Add Time
                            </Text>
                        </View>

                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ height: 9, width: 165, backgroundColor: !isEnabled ? '#07D779' : '#00000025', borderRadius: 5 }} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                            Friday
                        </Text>
                        <View>
                            <FlatList data={(index == 1) ? hoursWeek1[5] : ((index == 2) ? hoursWeek2[5] : ((index == 3) ? hoursWeek3[5] : hoursWeek4[5]))}
                                keyExtractor={(_, index) => index}
                                renderItem={({ item }) => <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                        {item.time} for {item.minutes} min {item.secondes} s
                                    </Text>
                                </View>} />
                            <Text onPress={() => { setModalVisible(true); addTimeHandler(5) }} style={{ fontWeight: '700', fontSize: 12, color: !isEnabled ? '#07D779' : '#00000025', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                + Add Time
                            </Text>
                        </View>

                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ height: 9, width: 165, backgroundColor: !isEnabled ? '#07D779' : '#00000025', borderRadius: 5 }} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }} >
                            Saturday
                        </Text>
                        <View>
                            <FlatList data={(index == 1) ? hoursWeek1[6] : ((index == 2) ? hoursWeek2[6] : ((index == 3) ? hoursWeek3[6] : hoursWeek4[6]))}
                                keyExtractor={(_, index) => index}
                                renderItem={({ item }) => <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000055', marginLeft: 12, marginTop: 4 }}>
                                        {item.time} for {item.minutes} min {item.secondes} s
                                    </Text>
                                </View>} />
                            <Text onPress={() => { setModalVisible(true); addTimeHandler(6) }} style={{ fontWeight: '700', fontSize: 12, color: !isEnabled ? '#07D779' : '#00000025', marginLeft: 10, marginTop: 4, marginBottom: 10 }}>
                                + Add Time
                            </Text>
                        </View>
                    </View>


                </ScrollView>
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
                                        Anuler
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








            </View>
        </ScrollView>

    );



}

