import { StyleSheet, Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';


const Weatherbar = (input) => {
  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  const [hmdt, setHmdt] = useState(0);
  const [dscr, setDscr] = useState('');
  useEffect(() => {


    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.input + '&appid=50a7aa80fa492fa92e874d23ad061374')
      .then(response => response.json())
      .then(data => {
        setDscr(data['weather'][0]['main']);

        setHmdt(data['main']['humidity']);
        setTemp(data['main']['temp'] - 273);
        setWind(data['wind']['speed']);

      })

    // .catch(err => alert("Wrong city name!"));
  })
  return (
    <View style={wstyle.wb}>
      <View style={wstyle.wbelem}>
        <Image source={require('../../assets/images/sun.png')} style={{ width: 29, height: 29, marginBottom: 5 }} />
        <Text style={wstyle.wbtxt}>{dscr}</Text>
      </View>
      <View style={wstyle.wbelem}>
        <Image source={require('../../assets/images/humidity.png')} style={{ width: 29, height: 29, marginBottom: 5 }} />
        <Text style={wstyle.wbtxt}>{hmdt}%</Text>
      </View>
      <View style={wstyle.wbelem}>
        <Image source={require('../../assets/images/temperature.png')} style={{ width: 29, height: 29, marginBottom: 5 }} />
        <Text style={wstyle.wbtxt}>{Math.round(temp)}°C</Text>
      </View>
      <View style={wstyle.wbelem}>
        <Image source={require('../../assets/images/wind.png')} style={{ width: 29, height: 29, marginBottom: 5 }} />
        <Text style={wstyle.wbtxt}>{wind}MPH</Text>
      </View>
    </View>
  )
}
const wstyle = StyleSheet.create({
  wb: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',

    flexDirection: 'row',
    position: 'absolute',
    width: 290,
    height: 50,
    top: 107,

    /*INSIDE*/
    alignSelf: 'stretch',
    marginVertical: 15,
  },
  wbelem: {
    display: 'flex',
    width: 60,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,

  },
  wbtxt: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 13,
    lineHeight: 16,
    textAlign: 'center',
    color: '#00000070',



  }
})

export default Weatherbar