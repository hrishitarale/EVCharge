import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import { db } from "../app/firebaseConfig"; // Firebase config to access the Firestore instance

// Component to render each charging station as a card
const ChargingStationCard = ({ station }) => (
  <Link
    href={{
      pathname: "/BookCharger",
      params: {
        id: station.id,
        name: station.name,
        address: station.address,
        price: station.pricePerKilowatt,
        latitude: station.latitude,
        longitude: station.longitude,
      },
    }}
  >
    <View style={styles.card}>
      <Text style={styles.name}>{station.name}</Text>
      <Text style={styles.address}>{station.address}</Text>
      <Text style={styles.price}>Price per kW: {station.pricePerKilowatt}</Text>
    </View>
  </Link>
);

export default function ListView() {
  const [chargingStations, setChargingStations] = useState([]); // State to store fetched charging stations

  useEffect(() => {
    // Fetch charging stations data from Firestore
    const fetchChargingStations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chargingStations"));
        const stationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fettched stations:", stationsData);
        setChargingStations(stationsData);
      } catch (err) {
        console.error("Error fetching charging stations: ", err.message);
      }
    };

    fetchChargingStations(); // Call the function to fetch data
  }, []); // Empty dependency array to run only once on component mount

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Available Charging Stations</Text>
      </View>
      <FlatList
        data={chargingStations} // Data is now fetched from Firestore
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChargingStationCard station={item} />}
        showsVerticalScrollIndicator={true} // Ensure the scrollbar appears
        contentContainerStyle={[styles.listContent, { paddingBottom: 100 }]} // Ensures full flex usage
      />
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1, // Ensures the FlatList can grow and take full screen
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },

  listContent: {
    padding: 20, // Ensures proper padding inside the list
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    width: "100%",
    height: 100,
    marginBottom: 30,
    marginRight: 40,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
    flexShrink: 1, // Ensures text doesn't overflow
    width: "100%", // Text wraps within the card
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
});
