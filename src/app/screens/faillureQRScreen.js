import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";


export default function FaillureQR({ navigation, route }) {
  const { user } = route.params;
  const navigate = useNavigation();

  return (

    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: '100%' }}>

      <Image source={require('../../assets/images/faillureQRcode.png')} style={{ marginLeft: '19%' }} />
      <TouchableOpacity
        style={{
          backgroundColor: "#FF5454",
          width: '50%',
          margin: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => { navigate.replace('QRcodeScanner', { user }) }}

      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            padding: 10,
            color: "white",
          }}
        >Retry</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

});