import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminDashboard() {
  const [stations, setStations] = useState([]);
  const [users, setUsers] = useState([]);
  const [newStationName, setNewStationName] = useState("");
  const [newStationAddress, setNewStationAddress] = useState("");
  const [newStationPrice, setNewStationPrice] = useState("");
  const [newStationChargers, setNewStationChargers] = useState("");
  const [newStationLatitude, setNewStationLatitude] = useState("");
  const [newStationLongitude, setNewStationLongitude] = useState("");

  const [showUsers, setShowUsers] = useState(false);
  const [showStations, setShowStations] = useState(false);
  const [showAddStationForm, setShowAddStationForm] = useState(false);

  const fetchData = async () => {
    const stationSnapshot = await getDocs(collection(db, "chargingStations"));
    const stationData = stationSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStations(stationData);

    const userSnapshot = await getDocs(collection(db, "users"));
    const userData = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(userData);
  };

  const handleAddStation = async () => {
    if (
      newStationName &&
      newStationAddress &&
      newStationPrice &&
      newStationChargers &&
      newStationLatitude &&
      newStationLongitude
    ) {
      const newStation = {
        name: newStationName,
        address: newStationAddress,
        pricePerKilowatt: parseFloat(newStationPrice),
        charger: parseInt(newStationChargers),
        latitude: parseFloat(newStationLatitude),
        longitude: parseFloat(newStationLongitude),
      };
      await addDoc(collection(db, "chargingStations"), newStation);
      fetchData();
      setNewStationName("");
      setNewStationAddress("");
      setNewStationPrice("");
      setNewStationChargers("");
      setNewStationLatitude("");
      setNewStationLongitude("");
      setShowAddStationForm(false);
    } else {
      alert("Please fill in all fields for the new station.");
    }
  };

  const handleRemoveStation = async (id) => {
    await deleteDoc(doc(db, "chargingStations", id));
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Admin Dashboard</Text>

        {/* Button to Show Users */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowUsers(!showUsers)}
        >
          <Text style={styles.buttonText}>Retrieve User Data</Text>
        </TouchableOpacity>
        {showUsers && (
          <View style={styles.section}>
            <Text style={styles.subHeading}>User Management</Text>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.fullName}</Text>
                  <Text>Email: {item.email}</Text>
                  <Text>Vehicle Type: {item.vehicleType}</Text>
                </View>
              )}
            />
          </View>
        )}

        {/* Button to Show Charging Stations */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowStations(!showStations)}
        >
          <Text style={styles.buttonText}>View Charging Stations</Text>
        </TouchableOpacity>
        {showStations && (
          <View style={styles.section}>
            <Text style={styles.subHeading}>Charging Stations</Text>
            <FlatList
              data={stations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text>Address: {item.address}</Text>
                  <Text>Price per kW: ₹{item.pricePerKilowatt}</Text>
                  <Text>Chargers: {item.charger}</Text>
                  <Text>Latitude: {item.latitude}</Text>
                  <Text>Longitude: {item.longitude}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveStation(item.id)}
                  >
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}

        {/* Button to Show Add Station Form */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowAddStationForm(!showAddStationForm)}
        >
          <Text style={styles.buttonText}>Add New Station</Text>
        </TouchableOpacity>
        {showAddStationForm && (
          <View style={styles.section}>
            <Text style={styles.subHeading}>Add Charging Station</Text>
            <TextInput
              style={styles.input}
              placeholder="Station Name"
              value={newStationName}
              onChangeText={setNewStationName}
            />
            <TextInput
              style={styles.input}
              placeholder="Station Address"
              value={newStationAddress}
              onChangeText={setNewStationAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Price per kW"
              keyboardType="numeric"
              value={newStationPrice}
              onChangeText={setNewStationPrice}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Chargers"
              keyboardType="numeric"
              value={newStationChargers}
              onChangeText={setNewStationChargers}
            />
            <TextInput
              style={styles.input}
              placeholder="Latitude"
              keyboardType="numeric"
              value={newStationLatitude}
              onChangeText={setNewStationLatitude}
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude"
              keyboardType="numeric"
              value={newStationLongitude}
              onChangeText={setNewStationLongitude}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddStation}>
              <Text style={styles.buttonText}>Submit Station</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 80,
  },
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#eef6f9",
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1e3d59",
    marginBottom: 20,
  },
  section: {
    width: "100%",
    marginTop: 20,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#00796b",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0b8e4f",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#e53935",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
});
