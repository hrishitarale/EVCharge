import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth method
import { auth } from "../app/firebaseConfig"; // Import your Firebase auth instance
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Firestore methods
import { Picker } from "@react-native-picker/picker";
const db = getFirestore();

export default function RegisterScreen({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // New state for Full Name
  const [vehicleType, setVehicleType] = useState("2-Wheeler");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        vehicleType,
        email,
        password,
      });
      alert("Registration successful!");
      onSwitchToLogin(); // Switch back to the Login screen
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.loginImage}
        source={require("./../assets/images/evlogo.png")}
      />

      <Text style={styles.heading}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

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
        secureTextEntry={true}
      />
      <Text style={styles.label}> Select Vehicle Type </Text>
      <Picker
        selectedValue={vehicleType}
        style={styles.input}
        onValueChange={(itemValue) => setVehicleType(itemValue)}
      >
        <Picker.Item label="2-Wheeler" value="2-Wheeler" />
        <Picker.Item label="4-Wheeler" value="4-Wheeler" />
      </Picker>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitchToLogin}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
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
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
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
  linkText: {
    color: "#0BC224",
    marginTop: 20,
    fontSize: 14,
    fontWeight: "500",
  },
});
