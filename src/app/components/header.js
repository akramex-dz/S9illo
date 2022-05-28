import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationEvents } from 'react-navigation'
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigate = useNavigation();

  return (
    <View style={{
      flexDirection: 'row', marginTop: '10%', marginBottom: '5%', marginHorizontal: '5%', height: "5%",
    }} >
      <TouchableOpacity style={{ marginRight: '34%', justifyContent: 'center' }
      } onPress={() => { navigate.navigate('DrawerScreen') }}>
        <Image source={require("../../assets/myPlants/menu.png")} resizeMode="contain" style={{ height: "80%" }} />

      </ TouchableOpacity>
      <TouchableOpacity style={{ marginLeft: '34%', justifyContent: 'center' }} >
        <Image source={require("../../assets/myPlants/logo.png")} resizeMode="contain" style={{ height: "80%" }} />

      </TouchableOpacity>


      <Image />
    </View>
  )
}
