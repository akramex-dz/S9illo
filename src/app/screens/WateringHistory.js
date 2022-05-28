import * as React from 'react';
import { View, Text, Modal, StyleSheet, Pressable, Image } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import ProchainsArr from '../../data/PronchainsArr'

import { useNavigation } from "@react-navigation/native";

export default function WateringHistory() {
    const navigate = useNavigation();

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10%', height: '5%', marginBottom: '5%' }}>
                <Pressable onPress={navigate.goBack} style={{ right: "160%", height: '80%', width: '10%', justifyContent: 'center', alignItems: 'center' }}  >
                    <Image source={require('../../assets/images/backArrowBlack.png')} style={{ height: "50%" }} resizeMode="contain" />

                </Pressable>
                <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 23, color: 'black', right: '50%' }}>Watering history</Text></View>

            <FlatList data={ProchainsArr}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 2,
                        width: 380,
                        height: 80,
                        backgroundColor: 'white',
                        marginVertical: 7,
                        flexDirection: 'row',
                        borderRadius: 10
                    }}>

                        <Image source={item.img} style={{ height: 70, width: 70, marginLeft: 5, marginTop: 5 }} />
                        <View style={{ marginLeft: 7 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#07D779', marginTop: 10 }}>
                                {item.name}
                            </Text>

                            <Text style={{ fontSize: 13, fontWeight: '500', color: '#00000054', marginLeft: 5 }}>
                                {item.type}
                            </Text>
                        </View>

                        <View style={{ marginLeft: 20, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, fontWeight: '500', color: '#00000055', textAlign: 'right' }}>
                                Wednesday, january 26th
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', color: '#00000055', textAlign: 'right' }}>
                                07:00
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', color: '#00000055', textAlign: 'right' }}>
                                10 min
                            </Text>
                        </View>

                    </TouchableOpacity>
                } />
        </View>
    );
}