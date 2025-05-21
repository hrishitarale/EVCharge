import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 40, height: 40, borderRadius: 99, marginLeft: 15 }}
      />
      <Image
        source={require("./../assets/images/evlogo.png")}
        style={{ width: 180, height: 80, marginRight: 90 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff87",
  },
});
