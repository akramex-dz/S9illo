import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { auth, db } from "../../core/firebase";
import { doc, setDoc } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import COLORS from "../../data/colors";
import { set } from "firebase/database";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(false);
  const iconNameEye = hidden ? "eye" : "eye-off";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigation();

  const handleLogIn = () => {
    setLoading(true);
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUser(user);
        navigate.replace("Main");
      })
      .catch((e) => setError(e.code))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require("../../assets/logoGroup.png")}
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
          resizeMode="contain"
        ></Image>
        <View>
          <MaterialCommunityIcons
            name={"email"}
            color={COLORS.GRAY}
            size={25}
            style={{ position: "absolute", left: 17, top: 11, zIndex: 1 }}
          ></MaterialCommunityIcons>
          <TextInput
            placeholder="E-mail Adress"
            autoCapitalize="none"
            value={email}
            keyboardType={"email-address"}
            onChangeText={(text) => setEmail(text.trim())}
            style={styles.inputEmail}
          />
        </View>
        <View>
          <MaterialCommunityIcons
            name={"lock"}
            color={COLORS.GRAY}
            size={25}
            style={{ position: "absolute", left: 17, top: 19, zIndex: 1 }}
          ></MaterialCommunityIcons>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            style={{
              backgroundColor: "#F2F2F2",
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 10,
              paddingLeft: 60,
              fontWeight: "700",
              fontSize: 14,
              lineHeight: 18,
            }}
            secureTextEntry={!hidden ? true : false}
          />
          <Pressable
            onPress={() => {
              setHidden(!hidden);
            }}
          >
            <MaterialCommunityIcons
              name={iconNameEye}
              color={COLORS.GRAY}
              size={25}
              style={{ position: "absolute", right: 17, bottom: 11, zIndex: 1 }}
            ></MaterialCommunityIcons>
          </Pressable>
        </View>
        <Text
          style={{ color: "red", fontFamily: "CircularStd-Book", marginLeft: 10 }}
        >
          {error}
        </Text>
      </View>

      <View style={styles.buttonCountainer}>
        <TouchableOpacity onPress={handleLogIn} style={styles.button}>
          <Text style={styles.buttonText}>
            {loading ? "loading ..." : "Log In"}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "110%",
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1.2,
              backgroundColor: "black",
            }}
          />
          <View>
            <Text
              style={{
                color: COLORS.GRAY,
                width: 50,
                textAlign: "center",
                fontWeight: "700",
                fontSize: 14,
                lineHeight: 18,
              }}
            >
              or
            </Text>
          </View>
          <View style={{ flex: 1, height: 1.2, backgroundColor: "black" }} />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigate.navigate("Register");
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "80%",
  },
  inputEmail: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingLeft: 60,
    borderRadius: 10,
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
  },
  buttonCountainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    width: "120%",
    backgroundColor: COLORS.GREEN,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    width: "100%",
    backgroundColor: "#00000090",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
