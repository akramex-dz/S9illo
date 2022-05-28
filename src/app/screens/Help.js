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
export default function Help() {
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
                alignItems: 'center',
                alignContent: 'center'
            }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10%', height: '5%' }}>
                <Pressable onPress={navigate.goBack} style={{ right: "300%", height: '80%', width: '10%', justifyContent: 'center', alignItems: 'center' }}  >
                    <Image source={require('../../assets/images/backArrowBlack.png')} style={{ height: "50%" }} resizeMode="contain" />

                </Pressable>
                <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 23, color: 'black', right: '50%' }}>Help</Text>
            </View>
            <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 17, color: 'black', marginTop: '25%', }}>-  The main controller -</Text>
            <Image source={require('../../assets/images/raspberry.png')} resizeMode='contain' style={{ height: '42%', marginBottom: '15%' }} />
            <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 15, color: 'black', marginHorizontal: '8%', textAlign: 'center', marginBottom: '30%' }} >Make sure just to connect the cables to the components after making the choices from the plants addition screen and we will handle all the rest!</Text>
            <Text style={{ fontFamily: 'CircularStd-Book', fontSize: 14, color: 'black', marginHorizontal: '2%', textAlign: 'center' }} >-  Don’t hesitate to contact us if you still having issues -</Text>

        </View>
    );
}
