import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Animated } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import COLORS from "../../data/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
const buttonSize = 50;

const FloatingActionButton = ({ navigation, setDisplayDelete, index, idRaspberry }) => {
  const [pressed, setPressed] = useState(false);
  const [active, setActive] = useState(false);
  const [animation] = useState(new Animated.Value(1));
  const navigate = useNavigation();
  const actions = [
    {
      title: "Add",
      onPress: () => {
        navigation.navigate("Addplant", { index, idRaspberry });
      },
      nameIcon: "plus",
    },
    {
      title: "Delete",
      onPress: () => {
        setActive(false);
        // setDisplayDelete(true);
        navigate.navigate("Erreur");
      },
      nameIcon: "delete",
    },
  ];

  useEffect(() => {
    active ? animateTiming(0) : animateTiming(1);
  }, [active]);

  const animateTiming = (toValue) => {
    Animated.spring(animation, {
      toValue: toValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const opacityAnimation = () => {
    return animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
  };

  const actionTranslateY = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [1, 2],
          outputRange: [0, 100],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {actions.map((action, index) => {
        return (
          <Animated.View
            key={index}
            style={[
              styles.actionContainer,
              { opacity: opacityAnimation() },
              actionTranslateY,
            ]}
          >
            <TouchableOpacity onPress={action.onPress} style={styles.action}>
              <Icon
                color={"white"}
                name={action.nameIcon}
                size={25}
                style={{ alignItems: "center", justifyContent: "center" }}
              ></Icon>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      <TouchableOpacity
        style={{
          position: "absolute",
          height: buttonSize,
          width: buttonSize,
          borderRadius: buttonSize / 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: !active ? COLORS.GREEN : 'white',
          shadowOpacity: 0.25,
          shadowOffset: { height: 0.5, width: 0.5 },
          elevation: 5,
        }}
        onPress={() => {
          setActive(!active);
        }}
      >
        <Icon color={"black"} name={!active ? "plus" : "close"} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -50,
    right: 30,
  },
  actionContainer: {
    height: buttonSize,
    width: buttonSize,
    borderRadius: buttonSize / 2,
    marginBottom: 10,
    bottom: buttonSize,
  },

  action: {
    position: "absolute",
    height: buttonSize,
    width: buttonSize,
    borderRadius: buttonSize / 7,
    backgroundColor: COLORS.GREEN,
    justifyContent: "center",
    shadowOpacity: 0.25,
    padding: 12,
    shadowOffset: { height: 0.5, width: 0.5 },
  },
  text: {
    textAlign: "center",
  },
});

export default FloatingActionButton;
