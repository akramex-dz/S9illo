import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth, db } from '../../core/firebase'
import { ref, onValue, set } from "firebase/database"
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header"

export default function Screen2({ navigation, plants, idRaspberry }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigation();
    useEffect(() => {
        console.log(plants);
    }, []);

    //FIREBASE bUTTON
    // const updateCommandTest = async (allum, temps) => {
    //     try {
    //         setLoading(true);
    //         setError("");
    //         await set(ref(db, 'commandes/'), {
    //             allum: allum,
    //             temps: temps,
    //         });
    //     } catch (error) {
    //         setError(error.code)
    //     }
    //     finally {
    //         setLoading(false)

    //     }

    // }


    return (
        // <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
        //     <TouchableOpacity onPress={() => updateCommandTest(1, 30)}
        //         style={[styles.button, styles.buttonOutline]}
        //     >
        //         <Text style={styles.buttonOutlineText}>{loading ? "Loading..." : "SEND TO FIRE"}</Text>
        //     </TouchableOpacity>
        //     <Text style={{ color: "red", marginLeft: 10 }}>{error}</Text>
        // </View>


        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
            <Header idRaspberry={idRaspberry} />

            <View style={styles.card}>

                <Image source={require('../../assets/images/wateringSettings.png')} resizeMode="contain" style={{ left: '5%', height: '60%', marginTop: "10%" }} />
                <TouchableOpacity onPress={() => { navigate.navigate('SelectPlant', { plants }); }}
                    style={styles.button}
                >
                    {props => <Watering {...props} plants={plants} />}
                    <Text style={styles.buttonText}>{loading ? "Loading..." : "Watering settings"}</Text>
                    <Image source={require('../../assets/images/VectorConfirm.png')} style={{ left: '50%' }} />
                </TouchableOpacity>
            </View>
            <View style={styles.card}>

                <Image source={require('../../assets/images/viewHistory.png')} resizeMode="contain" style={{ left: '5%', height: '60%', marginTop: "10%" }} />
                <TouchableOpacity onPress={() => { navigate.navigate('WateringHistory') }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>{loading ? "Loading..." : "View history"}</Text>
                    <Image source={require('../../assets/images/VectorConfirm.png')} style={{ left: '100%' }} />

                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => { navigate.navigate('ManualWatering', { plants }) }}
                style={styles.buttonOut}
            >
                <Text style={styles.buttonText}>{loading ? "Loading..." : "Water Now"}</Text>
                <Image source={require('../../assets/images/VectorConfirm.png')} style={{ left: '100%' }} />

            </TouchableOpacity>
            <Text style={{ color: "red", marginLeft: 10 }}>{error}</Text>

        </View>


    );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#00000070",
        width: '80%',
        height: '14%',
        marginTop: "10%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
    },
    buttonOut: {
        backgroundColor: "#07D779",
        width: '55%',
        height: '5%',
        marginTop: "10%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
    },

    buttonText: {
        color: 'white',
        fontFamily: 'CircularStd-Bold',
        fontSize: 16,
    },
    card: {
        alignSelf: 'center',
        backgroundColor: "#EFEFEF",
        width: '75%',
        height: '35%',
        shadowColor: '#000000',
        elevation: 5,
        borderRadius: 15,
        overflow: 'hidden',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: "3%"

    }

})
