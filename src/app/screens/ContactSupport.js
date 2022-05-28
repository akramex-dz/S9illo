import {
    View,
    FlatList,
    Image, Text,
    Dimensions,
    TextInput, TouchableOpacity,
    Pressable, Clipboard,
    StyleSheet, Modal
} from "react-native";
import { ref, onValue, set, get, update } from "firebase/database"
import { db } from "../../core/firebase"
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../data/colors";
import { useEffect, useState } from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import PlantCardSelect from "../components/PlantCardSelect";
export default function ContactSupport() {
    const navigate = useNavigation();
    const [copiedText, setCopiedText] = useState('')


    const fetchCopiedText = async () => {
        const text = await Clipboard.getString()
        setCopiedText(text)
    }

    return (
        <View
            style={{
                backgroundColor: "#fff",
                height: "100%",
            }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10%', height: '5%' }}>
                <Pressable onPress={navigate.goBack} style={{ right: "170%", height: '80%', width: '10%', justifyContent: 'center', alignItems: 'center' }}  >
                    <Image source={require('../../assets/images/backArrowBlack.png')} style={{ height: "50%" }} resizeMode="contain" />

                </Pressable>
                <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 23, color: 'black', right: '50%' }}>Contact support</Text>
            </View>
            <Image source={require('../../assets/images/contactSupport.png')} resizeMode="contain" style={{ height: "30%", alignSelf: 'center', marginVertical: '12%' }} />
            {/* Lewla */}
            <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginLeft: '13%', marginVertical: '5%' }} >
                <Text style={{ fontFamily: 'CircularStd-Medium', fontSize: 22 }}>
                    Phone number
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'CircularStd-Medium', fontSize: 18, marginTop: '3%' }}>
                        05-40-34-82-71
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: '#07D779', width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: '25%', height: 30 }} onPress={() => Clipboard.setString('05-40-34-82-71')} >
                        <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 14, color: 'white' }}>Copy</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* zawja */}

            <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginLeft: '13%', marginVertical: '5%' }} >
                <Text style={{ fontFamily: 'CircularStd-Medium', fontSize: 22 }}>
                    Email Adress
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'CircularStd-Medium', fontSize: 18, marginTop: '3%' }}>
                        S9illo.IOP@gmail.com
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: '#07D779', width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: '8%', height: 30 }} onPress={() => Clipboard.setString('S9illo.IOP@gmail.com')}>
                        <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 14, color: 'white' }}>Copy</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* talta */}

            <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginLeft: '13%', marginVertical: '5%' }} >
                <Text style={{ fontFamily: 'CircularStd-Medium', fontSize: 22 }}>
                    Facebook
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'CircularStd-Medium', fontSize: 18, marginTop: '3%' }}>
                        S9illo IOP Technologies
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: '#07D779', width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: '5%', height: 30 }} onPress={() => Clipboard.setString('S9illo IOP Technologies')}>
                        <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 14, color: 'white' }}>Copy</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* rab3a */}

            <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginLeft: '13%', marginVertical: '5%' }} >
                <Text style={{ fontFamily: 'CircularStd-Medium', fontSize: 22 }}>
                    LinkedIn
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'CircularStd-Medium', fontSize: 18, marginTop: '3%' }}>
                        S9illo IOP Technologies
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: '#07D779', width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: '5%', height: 30 }} onPress={() => Clipboard.setString('S9illo IOP Technologies')}>
                        <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 14, color: 'white' }}>Copy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
