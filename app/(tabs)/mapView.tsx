import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function MapViewPage() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user location
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location permission is required.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  // Get charger stations from Firestore
  const fetchStations = async () => {
    const snapshot = await getDocs(collection(db, "chargingStations"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStations(data);
  };

  useEffect(() => {
    const loadData = async () => {
      await getUserLocation();
      await fetchStations();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading || !currentLocation) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0BC224" />
        <Text>Loading Map...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      region={currentLocation}
      showsUserLocation={true}
    >
      {stations.map((station) => (
        <Marker
          key={station.id}
          coordinate={{
            latitude: parseFloat(station.latitude),
            longitude: parseFloat(station.longitude),
          }}
          title={station.name}
          description={station.address}
          pinColor="#0BC224"
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
