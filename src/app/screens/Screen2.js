import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../../core/firebase'
import { ref, onValue, set } from "firebase/database"
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Watering from './Watering';

export default function Screen2({ navigation, plants }) {
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


        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>

            <TouchableOpacity onPress={() => { navigate.navigate('Manual Watering', { plants }) }}
                style={[styles.button, styles.buttonOutline]}
            >
                {props => <Watering {...props} plants={plants} />}
                <Text style={styles.buttonOutlineText}>{loading ? "Loading..." : "Manage Watering"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateCommandTest(1, 30)}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>{loading ? "Loading..." : "View history"}</Text>
            </TouchableOpacity>
            <Text style={{ color: "red", marginLeft: 10 }}>{error}</Text>

        </View>


    );
}
const styles = StyleSheet.create({
    button: {
        width: 200,
        backgroundColor: '#0782f9',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#0782f9',
    },
    buttonOutlineText: {

        color: '#0782f9',
        fontWeight: '700',
        fontSize: 16,
    },
})
