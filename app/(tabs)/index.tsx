import { StyleSheet, View } from "react-native";
import LoginRegisterManager from "../LoginRegisterManager";
import ListView from "../ListView";
import HeaderProfile from "../HeaderProfile";
import React, { useState } from "react";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Login");
  const [userEmail, setUserEmail] = useState("");

  // Handle successful login
  const handleLoginSuccess = (email: string) => {
    setUserEmail(email); // Save user email after login
    setCurrentScreen("ListView"); // Change the screen to ListView
  };

  // Handle user logout
  const handleLogout = () => {
    setUserEmail("");
    setCurrentScreen("Login"); // Go back to login screen
  };

  return (
    <View style={styles.container}>
      {currentScreen === "Login" ? (
        <LoginRegisterManager
          onLoginSuccess={handleLoginSuccess} // Pass the login success handler to LoginRegisterManager
        />
      ) : (
        <View style={styles.screenContainer}>
          <HeaderProfile onLogout={handleLogout} userEmail={userEmail} />
          <View style={styles.listContainer}>
            <ListView />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
});
