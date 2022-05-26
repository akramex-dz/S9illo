import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import plants from '../../data/plants';
import ProchainsArr from '../../data/PronchainsArr';
import ArrosageCard from './ArrosageCard';


export default function ProchainsArrosages() {
  return (
    <View style={{ height: 264, width: 345, backgroundColor: '#EFEFEF', borderRadius: 15 }}>
      <Text style={{
        fontSize: 30, fontFamily: 'CircularStd-Bold', marginLeft: 20, marginTop: 15, color: '#00000070'
      }}>
        Prochains Arrosages
      </Text>
      <FlatList
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        data={ProchainsArr}
        style={{ showsVerticalScrollIndicator: false }}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}


        renderItem={({ item, index }) => (
          <ArrosageCard
            name={item.name}
            img={item.img}
            id={item.id}
            time={item.time}
            water={item.water}
            date={item.date}
          />
        )}
      />
    </View>
  )
}






