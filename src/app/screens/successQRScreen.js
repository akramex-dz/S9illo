import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SuccessQR({ navigation }) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: '100%' }}>

      <Image source={require('../../assets/images/successQRcode.png')} style={{ marginLeft: '19%' }} />
      <TouchableOpacity
        style={{
          backgroundColor: "#07D779",
          width: '50%',
          margin: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: 'row'
        }}
        onPress={() => { navigation.replace('Main') }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            padding: 10,
            color: "white",
          }}
        >Continue</Text>
        <Image source={require('../../assets/images/VectorConfirm.png')} style={{ left: '70%' }} />
      </TouchableOpacity>
    </View>
  )
}

