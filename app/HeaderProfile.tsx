import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../app/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HeaderProfileProps {
  onLogout: () => void;
}

export default function HeaderProfile({ onLogout }: HeaderProfileProps) {
  useEffect(() => {
    // Get user from localStorage
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("loggedInUserEmail");
      if (email) {
        setUserEmail(email);
      }
    };
    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("loggedInUserEmail");
      onLogout();
    } catch (err: any) {
      console.error("Logout failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.profileText}>Welcome, {userEmail}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 50,
    paddingHorizontal: 15,
    elevation: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  profileSection: {
    flex: 1,
  },
  profileText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#0BC224",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});
