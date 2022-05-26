import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { auth, db } from "../../core/firebase";
import { ref, onValue, set } from "firebase/database";
import COLORS from "../../data/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const iconNameEye = hidden ? "eye" : "eye-off";
  const iconNameEye1 = hidden1 ? "eye" : "eye-off";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [age, setAge] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [hidden, setHidden] = useState(false);
  const [hidden1, setHidden1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigation();

  const checkInput = () => { };

  const writeUserData = (userId, fname, lname, age) => {
    set(ref(db, "users/" + userId), {
      displayName: fname,
      displayLastName: lname,
      age: age,
      idRaspberry: 0,
    });
  };

  const handleRegister = () => {
    console.log("handlit");
    setLoading(true);
    setError("");
    if (password == confirmedPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          writeUserData(user.uid, fname, lname, age);
          navigate.replace("QRcodeScanner", { user });
        })
        .catch((e) => setError(e.code))
        .finally(() => setLoading(false));
    } else {
      console.log("password mistmatch... re-insert your data!")
      setError("password mistmatch... re-insert your data!")
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logoRegister.png")}
        resizeMode="contain"
        style={{ alignSelf: "center" }}
      ></Image>
      <View style={styles.inputContainer}>
        <View style={{ marginTop: "30%", marginBottom: "5%" }}>
          <MaterialCommunityIcons
            name={"contacts"}
            color={COLORS.GRAY}
            size={25}
            style={{ position: "absolute", left: "5%", top: "20%", zIndex: 1 }}
          ></MaterialCommunityIcons>
          <TextInput
            placeholder="First Name"
            autoCapitalize="none"
            value={fname}
            keyboardType={"email-address"}
            onChangeText={(text) => setFname(text.trim())}
            style={styles.inputButton}
          />
        </View>
        <View style={{ marginBottom: "5%" }}>
          <MaterialCommunityIcons
            name={"contacts"}
            color={COLORS.GRAY}
            size={25}
            style={{ position: "absolute", left: "5%", top: "20%", zIndex: 1 }}
          ></MaterialCommunityIcons>
          <TextInput
            placeholder="Last Name"
            autoCapitalize="none"
            value={lname}
            keyboardType={"default"}
            onChangeText={(text) => setLname(text.trim())}
            style={styles.inputButton}
          />
        </View>
        <View style={{ marginBottom: "5%" }}>
          <MaterialCommunityIcons
            name={"email"}
            color={COLORS.GRAY}
            size={25}
            style={{ position: "absolute", left: "5%", top: "20%", zIndex: 1 }}
          ></MaterialCommunityIcons>
          <TextInput
            placeholder="Email Adress"
            autoCapitalize="none"
            value={email}
            keyboardType={"email-address"}
            onChangeText={(text) => setEmail(text.trim())}
            style={styles.inputButton}
          />
        </View>
        <View style={{ marginBottom: "5%" }}>
          <MaterialCommunityIcons
            name={"clock-time-seven"}
            color={COLORS.GRAY}
            size={25}
            style={{ position: "absolute", left: "5%", top: "20%", zIndex: 1 }}
          ></MaterialCommunityIcons>
          <TextInput
            placeholder="Age"
            autoCapitalize="none"
            value={age}
            keyboardType={"number-pad"}
            onChangeText={(text) => setAge(text.trim())}
            style={styles.inputButton}
          />
        </View>
        <View style={{ marginBottom: "5%" }}>
          <MaterialCommunityIcons
            name={"lock"}
            color={COLORS.GRAY}
            size={25}
            style={{ position: "absolute", left: "5%", top: "20%", zIndex: 1 }}
          ></MaterialCommunityIcons>
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            value={password}
            keyboardType={"default"}
            onChangeText={(text) => setPassword(text.trim())}
            style={styles.inputButton}
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
              style={{
                position: "absolute",
                right: "5%",
                bottom: 11,
                zIndex: 1,
              }}
            ></MaterialCommunityIcons>
          </Pressable>
        </View>
        <View style={{ marginBottom: "5%" }}>
          <MaterialCommunityIcons
            name={"lock"}
            color={COLORS.GRAY}
            size={25}
            style={{ position: "absolute", left: "5%", top: "20%", zIndex: 1 }}
          ></MaterialCommunityIcons>
          <TextInput
            placeholder="Confirm Password"
            autoCapitalize="none"
            value={confirmedPassword}
            secureTextEntry={!hidden1 ? true : false}
            keyboardType={"default"}
            onChangeText={(text) => setConfirmedPassword(text.trim())}
            style={styles.inputButton}
          />
          <Pressable
            onPress={() => {
              setHidden1(!hidden1);
            }}
          >
            <MaterialCommunityIcons
              name={iconNameEye1}
              color={COLORS.GRAY}
              size={25}
              style={{ position: "absolute", right: "5%", bottom: 11, zIndex: 1 }}
            ></MaterialCommunityIcons>
          </Pressable>
        </View>
        <Text style={{ color: "red", marginFLeft: 10 }}>{error}</Text>
      </View>

      <View style={styles.buttonCountainer}>
        <TouchableOpacity
          onPress={
            handleRegister
          }
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>
            {loading ? "Loading..." : "Confirm"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonCountainer: {
    width: "120%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    alignContent: "center",
    width: "60%",
    textAlign: "center",
    backgroundColor: COLORS.GREEN,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: COLORS.GREEN,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.GREEN,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  HeaderText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  inputButton: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingLeft: 60,
    borderRadius: 10,
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
  },
});
