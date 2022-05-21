import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../data/colors";

const CheckBoxW = (props) => {
  const iconName = props.isChecked
    ? "checkbox-marked-outline"
    : "checkbox-blank-outline";

  return (
    <View>
      <Pressable onPress={props.onPress}>
        <MaterialCommunityIcons name={iconName} size={30} color={COLORS.GREEN} />
      </Pressable>
    </View>
  );
};

export default CheckBoxW;
