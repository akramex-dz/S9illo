import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../data/colors";

export default function Erreur() {
  const navigate = useNavigation();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Image
        source={require("../../assets/error.png")}
        resizeMode="contain"
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "25%",
        }}
      />
      <Text
        style={{
          fontSize: 34,
          textAlign: "center",
          color: "#7B7B7B",
          fontFamily: "CircularStd-Bold",
          lineHeight: 43,
          marginTop: "15%",
        }}
      >
        Error
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          marginTop: 15,
          fontFamily: "CircularStd-Medium",
          lineHeight: 28,
          color: COLORS.GRAY,
          fontWeight: "700",
          marginHorizontal: '5%'
        }}
      >
        This feature is under developement, Stay tuned for the next update!
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#FF5454",
          width: "50%",
          top: "15%",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigate.goBack();
        }}
      >
        <Text
          style={{
            fontFamily: "CircularStd-Medium",
            fontSize: 16,
            padding: 10,
            color: "white",
          }}
        >
          Return
        </Text>
      </TouchableOpacity>
    </View>
  );
}
