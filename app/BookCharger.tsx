import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";

const BookingPage = () => {
  const { id, name, address, price, latitude, longitude } =
    useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require("./../assets/images/evlogo.png")}
      />

      <Text style={styles.title}>Charging Station Details</Text>

      <View style={styles.stationCard}>
        <Text style={styles.stationName}>🔌 {name}</Text>
        <Text style={styles.stationDetail}>📍 {address}</Text>
        <Text style={styles.stationDetail}>💰 ₹{price}/kWh</Text>
        <Text style={styles.stationDetail}>🕒 Open 24/7</Text>
        <Text style={styles.stationDetail}>
          📶 Fast & Regular Chargers Available
        </Text>
      </View>

      <Text style={styles.mapTitle}>📍 Station Location</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            }}
            title={name}
            description={address}
          />
        </MapView>
      </View>

      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>🚀 Start Booking</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F8F8",
    padding: 15,
  },
  headerImage: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    color: "#2D2D2D",
  },
  stationCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  stationName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2C3E50",
  },
  stationDetail: {
    fontSize: 16,
    marginBottom: 4,
    color: "#555",
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2C3E50",
  },
  mapContainer: {
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: "#0BC224",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookingPage;
