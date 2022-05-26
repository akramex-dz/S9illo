import { Image, Pressable, Text, View } from "react-native";
import { tintColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import COLORS from "../../data/colors";

export default function ArrosageCard({ id, name, img, date, time, water }) {
  return (
    <View
      style={{
        maxHeight: 170,
        width: 310,
        backgroundColor: "#FFFFFF",
        marginTop: 7,
        marginHorizontal: 17,
        borderRadius: 15,
        flexDirection: 'row',
      }}
    >
      <Image source={img} style={{ height: '100%', width: '50%', }} resizeMode='contain' />

      <View>
        <Text style={{
          color: COLORS.GREEN, fontFamily: 'CircularStd-Bold',
          fontSize: 18, marginTop: 27, marginBottom: 12
        }}>
          {name}
        </Text>
        <View>

          <View style={{ flexDirection: 'row', marginLeft: 2 }}>
            <Image source={require('../../assets/images/calendar.png')} tintColor={'#00000070'} style={{ height: '90%' }} resizeMode="contain" />
            <Text style={{
              fontFamily: 'CircularStd-Medium', color: "black", marginBottom: 7, marginLeft: '8%', color: '#00000070'
            }}>{date}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginLeft: 2 }}>
            <Image source={require('../../assets/images/clock.png')} tintColor={'#00000070'} style={{ height: '90%' }} resizeMode="contain" />
            <Text style={{ fontFamily: 'CircularStd-Medium', color: "black", marginBottom: 7, marginLeft: '8%', color: '#00000070' }}>{time}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginLeft: 4 }}>
            <Image source={require('../../assets/images/dro.png')} tintColor={'#00000070'} style={{ height: '110%', right: '17%' }} resizeMode="contain" />
            <Text style={{ fontFamily: 'CircularStd-Medium', color: "black", marginLeft: '8%', color: '#00000070' }}>{water}</Text>
          </View>



        </View>

      </View>

    </View>
  );
}