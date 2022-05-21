import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import COLORS from "../../data/colors";

const CheckBox = (props) => {
  const iconName = props.isChecked
    ? "checkbox-marked-circle-outline"
    : "checkbox-blank-circle-outline";

  return (
    <View>
      <Pressable onPress={props.onPress}>
        <MaterialCommunityIcons name={iconName} size={24} color={COLORS.RED} />
      </Pressable>
    </View>
  );
};

export default CheckBox;
