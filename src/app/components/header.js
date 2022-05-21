import { View, Text,Image } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={{justifyContent:'space-between'}}>
        <Image source={require("../../assets/myPlants/menu.png")} style={{width:31.25, height:31.5}}/>
        <Image source={require("../../assets/myPlants/logo.png")} style={{width:24.32, height:30}}/>
        <Image/>
      </View>
  )
}
