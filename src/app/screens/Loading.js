import { View, Text } from 'react-native'
import React,{useEffect} from 'react'

export default function Loading({navigation}) {
    useEffect(()=>{
        setTimeout(()=>{
            navigation.replace("Home");
        },5000)
    },[])

  return (
    <View>
      <Text style={{justifyContent:'center', alignItems:'center'}}>Loading</Text>
    </View>
  )
}

