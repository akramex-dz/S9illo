import { Dimensions } from 'react-native'
import React from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import { Image, Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { Switch } from "react-native-switch";
import { tintColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { useState } from "react";
import COLORS from "../../data/colors";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";



//dependency npm install --save react-native-switch !!
//expo install react-native-date-picker expo-dev-client


export default function GraphCardScreen({ navigation, route }) {
  const { plant } = route.params;
  const navigate = useNavigation();
  var hActuelle = new Date().getHours();

  const labelHeures = [((hActuelle + 12) % 24).toString() + "H", ((hActuelle + 14) % 24).toString() + "H", ((hActuelle + 16) % 24).toString() + "H", ((hActuelle + 18) % 24).toString() + "H", ((hActuelle + 20) % 24).toString() + "H", ((hActuelle + 22) % 24).toString() + "H", hActuelle + "H",]
  const mLength = plant.soilMoisture.length;
  const hLength = plant.airHumidity.length;
  // ON PREND 6 DONNEES
  const dataHumidity = [plant.airHumidity[hLength - 6].V, plant.airHumidity[hLength - 5].V, plant.airHumidity[hLength - 4].V, plant.airHumidity[hLength - 3].V, plant.airHumidity[hLength - 2].V, plant.airHumidity[hLength - 1].V]
  const dataMoisture = [plant.soilMoisture[mLength - 6].V, plant.soilMoisture[mLength - 5].V, plant.soilMoisture[mLength - 4].V, plant.soilMoisture[mLength - 3].V, plant.soilMoisture[mLength - 2].V, plant.soilMoisture[mLength - 1].V]

  return (
    <View>
      <ScrollView style={{ height: '100%', width: '100%', backgroundColor: '#07D779' }}>
        <View style={{ backgroundColor: '#07D779', width: '100%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10%', height: '10%' }}>
            <Pressable onPress={navigate.goBack} style={{ right: "150%", height: '80%', width: '10%', justifyContent: 'center', alignItems: 'center' }}  >
              <Image source={require('../../assets/images/backArrow.png')} style={{ height: "50%" }} resizeMode="contain" />

            </Pressable>
            <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 23, color: 'white', right: '50%' }}>Graphical data</Text></View>

          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={{ fontSize: 28, fontWeight: '700', color: 'white', marginTop: 60, marginLeft: 20 }}>
                {plant.displayName}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: '700', color: 'white', marginTop: 15, marginLeft: 20 }}>
                {plant.specie}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: 'white', marginTop: 24, marginLeft: 20, width: 152 }}>
                Les fraisiers ont besoin d'un sol fertile, humifère, sableux. La fraise a besoin de beaucoup de soleil pour que se développent toutes ses saveurs.
              </Text>
            </View>
            <Image source={plant.picture ? { uri: plant.picture, } : require("../../assets/images/Group7.png")} style={{ height: "58%", width: "40%", marginTop: '15%', marginLeft: '5%', borderRadius: 1000 }} resizeMode='contain' />

          </View>
        </View>


        {/* LES GRAPHS */}
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: 50, borderTopRightRadius: 50, borderTopLeftRadius: 50 }}>
          <Text style={{ fontWeight: '700', fontSize: 28, color: '#00000075', marginTop: 25 }}>
            Schemas d'evolution
          </Text>


          <View style={{
            width: 350,
            justifyContent: 'center',
            marginTop: 40,
            backgroundColor: 'white',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            borderRadius: 8,
          }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '##00000075', marginLeft: 30, marginBottom: 10, marginTop: 20 }} >Soil Moisture</Text>
            <LineChart
              withDots={false}
              withShadow={false}
              data={{
                labels: labelHeures,
                datasets: [
                  {
                    data: dataMoisture
                  }
                ]
              }}
              width={350} // from react-native
              height={250}
              yAxisLabel=""
              yAxisSuffix=" %"
              yAxisInterval={1} // optional, defaults to 1

              chartConfig={{
                barRadius: 8,
                backgroundColor: "#000000",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `#0574B973`,
                labelColor: (opacity = 1) => `#000000`,
                style: {
                  borderRadius: 8
                },
                propsForLabels: {
                  fontSize: 11,
                  fontWeight: '500',
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}


            />
          </View>


          <View style={{
            width: 350,
            justifyContent: 'center',
            marginTop: 40,
            backgroundColor: 'white',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            borderRadius: 8,
          }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '##00000075', marginLeft: 30, marginBottom: 10, marginTop: 20 }} >Humidity</Text>
            <LineChart
              withDots={false}
              withShadow={false}
              data={{
                labels: labelHeures,
                datasets: [
                  {
                    data: dataHumidity
                  }
                ]
              }}
              width={350} // from react-native
              height={250}
              yAxisLabel=""
              yAxisSuffix=" %"
              yAxisInterval={1} // optional, defaults to 1

              chartConfig={{
                barRadius: 8,
                backgroundColor: "#000000",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `#21B792`,
                labelColor: (opacity = 1) => `#000000`,
                style: {
                  borderRadius: 8
                },
                propsForLabels: {
                  fontSize: 11,
                  fontWeight: '500',
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}


            />
          </View>

          <View style={{
            width: 350,
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 30,
            backgroundColor: 'white',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            borderRadius: 8,
          }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '##00000075', marginLeft: 30, marginBottom: 10, marginTop: 20 }} >Temperature</Text>
            <LineChart
              withDots={false}
              withShadow={false}
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ]
                  }
                ]
              }}
              width={350} // from react-native
              height={250}
              yAxisLabel=""
              yAxisSuffix=" C"
              yAxisInterval={1} // optional, defaults to 1

              chartConfig={{
                barRadius: 8,
                backgroundColor: "#000000",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `#0574B973`,
                labelColor: (opacity = 1) => `#000000`,
                style: {
                  borderRadius: 8
                },
                propsForLabels: {
                  fontSize: 11,
                  fontWeight: '500',
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}


            />
          </View>

        </View>



        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 40 }}>
          <TouchableOpacity style={{ width: 250, height: 35, backgroundColor: '#07D779', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigate.goBack() }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>
              Paramettres de la plante
            </Text>
          </TouchableOpacity>
        </View>






      </ScrollView >



    </View >






  )

}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})



