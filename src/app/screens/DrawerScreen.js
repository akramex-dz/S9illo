import * as React from 'react';
import { View, Text, Modal, StyleSheet, Pressable, Image } from 'react-native';
import { useState, useCallback } from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import ProchainsArr from '../../data/PronchainsArr'
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

export default function DrawerScreen() {
    const navigate = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const addhandler = () => {
        //Here we will change the language
        setModalVisible(false)
    }
    const items = [
        { label: "English", value: "En" },
        { label: "Français", value: "Fr" },
    ];
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const onFitemOpen = useCallback(() => {
        setOpen1(false);
    }, []);
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={navigate.goBack} style={{ height: '4%', width: '18%', alignItems: 'center', alignSelf: 'flex-end', marginTop: '25%' }}   >
                <Image source={require('../../assets/images/backArrowGreen.png')} style={{ height: "100%" }} resizeMode="contain" />
            </TouchableOpacity>
            <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginTop: '30%' }} >
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: '1%', marginVertical: "3%" }} onPress={() => { }}>
                    <Image source={require('../../assets/images/profile.png')} style={{ height: "100%", }} resizeMode="contain" />
                    <Text style={{ color: '#53535380', fontFamily: 'CircularStd-Medium', fontSize: 18 }}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: '2%', marginVertical: "3%" }} onPress={() => { }}>
                    <Image source={require('../../assets/images/user.png')} style={{ height: "100%", }} resizeMode="contain" />
                    <Text style={{ color: '#53535380', fontFamily: 'CircularStd-Medium', fontSize: 18 }}>Manage Users</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: "3%" }} onPress={() => { }}>
                    <Image source={require('../../assets/images/controller.png')} style={{ height: "100%", }} resizeMode="contain" />
                    <Text style={{ color: '#53535380', fontFamily: 'CircularStd-Medium', fontSize: 18 }}>Controllers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: "3%" }} onPress={() => { setModalVisible(true); }}>
                    <Image source={require('../../assets/images/language.png')} style={{ height: "100%", }} resizeMode="contain" />
                    <Text style={{ color: '#53535380', fontFamily: 'CircularStd-Medium', fontSize: 18 }}>Language</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: "3%" }} onPress={() => { navigate.navigate("ContactSupport") }}>
                    <Image source={require('../../assets/images/contact.png')} style={{ height: "100%", }} resizeMode="contain" />
                    <Text style={{ color: '#53535380', fontFamily: 'CircularStd-Medium', fontSize: 18 }}>Contact support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: "3%" }} onPress={() => { }}>
                    <Image source={require('../../assets/images/logout.png')} style={{ height: "100%", }} resizeMode="contain" />
                    <Text style={{ color: '#53535380', fontFamily: 'CircularStd-Medium', fontSize: 18 }}>Log-Out</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center' }}>
                <Image source={require('../../assets/images/iopTechnologies.png')} style={{ height: "30%", }} resizeMode="contain" />
            </View>
            <Modal visible={modalVisible} transparent={true}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#00000070' }}>
                    <View style={{ height: 237, width: 312, backgroundColor: '#FFFFFF', borderRadius: 15, alignItems: 'center' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#00000075', marginTop: 21 }}>
                            Select language
                        </Text>
                        <DropDownPicker
                            style={{
                                alignSelf: 'center',
                                width: '50%',
                                marginTop: "10%",
                                borderColor: "#E3E3E3",

                            }}
                            open={open}
                            zIndex={3000}
                            zIndexInverse={1000}
                            onOpen={onFitemOpen}
                            dropDownContainerStyle={{
                                width: '50%',
                                alignSelf: 'center',
                                maxHeight: '100%',
                                marginTop: 0,
                                borderColor: "#E3E3E3",
                            }}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                        />
                        {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                        </View> */}

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
    );
}