import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native'
// import { collection, where, getDocs, onSnapshot } from "firebase/firestore";

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { auth, db } from "../../core/firebase"
import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
import { child, getDatabase, onValue, ref, get } from 'firebase/database';

//Screens 
import DashBoard from '../screens/dashBoard'
import Screen2 from '../screens/Screen2'
import MyPlants from '../screens/myPlants'


const Tab = createBottomTabNavigator();

export default function MainContainer() {
    const [user, setUser] = useState(null);
    const [plants, setPlants] = useState([]);
    const [infos, setInfos] = useState({});

    const getPlants = async (idRaspBerry) => {
        const plants = [];
        const dbRef = ref(getDatabase());
        try {

            const snapshot = await get(ref(db, "raspberries/" + idRaspBerry, "data/"))
            if (snapshot.exists()) {

                snapshot.val()["data"].forEach((childSnapshot, index) => {
                    plants.push({ id: index, ...childSnapshot });
                });

                setPlants(plants);
            }
            else {
                console.log("no data");
            }
        } catch (e) {
            console.log(e)
        }
        // const plants = [];
        // const plantsRef = ref(db, 'raspberries/' + idRaspBerry + 'data/', plant.uid);
        // const querySnapshot = await getDocs(collection(db, "raspberries", idRaspBerry, "data"));
        // onValue(plantsRef, (snapshot) => {
        //     snapshot.forEach(childSnapshot => {
        //         plants.push({ id: childSnapshot.id, ...childSnapshot.data() }); console.log(childSnapshot.data().displayName)
        //         setPlants(plants);

        //     });
        // });
        // querySnapshot.forEach((doc) => { plants.push({ id: doc.id, ...doc.data() }); console.log(doc.data().displayName) });
    };

    const getInfos = (currentUser) => {
        const dbRef = ref(getDatabase());
        get(ref(db, "users/", currentUser.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                setInfos(snapshot.val()[currentUser.uid]);
                getPlants(snapshot.val()[currentUser.uid].idRaspBerry);
                console.log(snapshot.val()[currentUser.uid].idRaspBerry);


            }
            else {
                console.log("no data");
            }
        }).catch((e) => {
            console.log(e);
        });

    }










    useEffect(() => {
        if (infos.idRaspBerry) {
            const plantsRef = ref(db, "raspberries/" + infos.idRaspBerry, "data/");
            const unsub = onValue(plantsRef, (querySnapshot) => {
                const plants = [];
                querySnapshot.forEach((childSnapshot) => {
                    plants.push({ id: childSnapshot.id, ...childSnapshot.val() });
                })
                setPlants(plants);
            })
            return () => unsub();
        }
    }, [infos.idRaspBerry])



    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                getInfos(currentUser);
            } else {
                navigation.replace("Login")
            }
        })
    }, [])

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: { height: 80, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#0c0c0c', opacity: 0.6 }
            }}>


            <Tab.Screen name={'Screen1'} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Image source={require('../../assets/dashboard.png')} resizeMode='contain' style={{ tintColor: focused ? '#07D779' : '#FFFFFF', marginTop: 17 }} />
                        <Text style={{ color: focused ? '#07D779' : '#FFFFFF', fontSize: 12, paddingTop: 4 }}>DashBoard</Text>
                        <Image source={require('../../assets/Ellipse.png')} resizeMode='contain' style={{ tintColor: focused ? '#07D779' : '#00FF0000', marginTop: 'auto' }} />
                    </View>
                )
            }} >
                {props => <DashBoard {...props} user={user} infos={infos} />}
            </Tab.Screen>

            <Tab.Screen name={'Screen2'} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Image source={require('../../assets/drop.png')} resizeMode='contain' style={{ tintColor: focused ? '#07D779' : '#FFFFFF', marginTop: 17 }} />
                        <Text style={{ color: focused ? '#07D779' : '#FFFFFF', fontSize: 12, paddingTop: 4 }}>Water</Text>
                        <Image source={require('../../assets/Ellipse.png')} resizeMode='contain' style={{ tintColor: focused ? '#07D779' : '#00FF0000', marginTop: 'auto' }} />
                    </View>
                )
            }}>
                {props => <Screen2 {...props} plants={plants} />}
            </Tab.Screen>

            <Tab.Screen name={'My Plants'} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Image source={require('../../assets/plant.png')} resizeMode='contain' style={{ tintColor: focused ? '#07D779' : '#FFFFFF', marginTop: 17 }} />
                        <Text style={{ color: focused ? '#07D779' : '#FFFFFF', fontSize: 12, paddingTop: 4 }}>My Plants</Text>
                        <Image source={require('../../assets/Ellipse.png')} resizeMode='contain' style={{ tintColor: focused ? '#07D779' : '#00FF0000', marginTop: 'auto' }} />
                    </View>
                )
            }} >
                {props => <MyPlants {...props} plants={plants} />}
            </Tab.Screen>

        </Tab.Navigator>

    )
}
