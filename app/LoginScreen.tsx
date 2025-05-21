import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase methods
import { auth } from "../app/firebaseConfig"; // Firebase auth instance

export default function LoginRegisterScreen({
  onLoginSuccess,
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userEmail = userCredential.user.email; // Get logged-in user's email
      await AsyncStorage.setItem("loggedInUserEmail", userEmail);

      onLoginSuccess(userEmail); // Call success callback
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.loginImage}
        source={require("./../assets/images/evlogo.png")}
      />
      <Text style={styles.heading}>EV Charging Station App</Text>
      <Text style={styles.desc}>
        Find EV charging stations near you, and much more!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>Don't have an account? </Text>
      <TouchableOpacity
        onPress={onSwitchToRegister} // This triggers the screen switch
        style={styles.registerButton}
      >
        <Text style={styles.linkText}>Register Here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  loginImage: {
    width: 300,
    height: 150,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 25,
  },
  desc: {
    fontSize: 17,
    fontWeight: "300",
    textAlign: "center",
    marginTop: 15,
    color: "#898989",
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0BC224",
    padding: 16,
    borderRadius: 8,
    marginTop: 30,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  bottomText: {
    marginTop: 20,
    fontSize: 14,
    color: "#898989",
    textAlign: "center",
  },
  registerButton: {
    marginTop: 10,
  },
  linkText: {
    color: "#0BC224",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
