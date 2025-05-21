// // Import necessary libraries and components
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";

// export default function ChargingStation() {
//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const [stations, setStations] = useState([
//     {
//       id: "1",
//       name: "Station A",
//       location: "Location 1",
//       pricePerKW: "0.5",
//       bookings: [],
//     },
//     {
//       id: "2",
//       name: "Station B",
//       location: "Location 2",
//       pricePerKW: "0.7",
//       bookings: [],
//     },
//   ]);
//   const [selectedStation, setSelectedStation] = useState(null);

//   // Dummy function for signing in (in a real app, integrate authentication)
//   const handleSignIn = () => {
//     setIsSignedIn(true);
//   };

//   // Station management function
//   const handleStationSelect = (station) => {
//     setSelectedStation(station);
//   };

//   const handleStationUpdate = () => {
//     alert("Station details updated!");
//   };

//   // Render Booking List for selected station
//   const renderBookings = ({ item }) => (
//     <View style={styles.bookingItem}>
//       <Text>{`Booking ID: ${item.id}, Time Slot: ${item.timeSlot}`}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {isSignedIn ? (
//         selectedStation ? (
//           // Station and Booking Management view
//           <View>
//             <Text style={styles.title}>
//               Manage Station: {selectedStation.name}
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Price per kW"
//               value={selectedStation.pricePerKW}
//               onChangeText={(text) =>
//                 setSelectedStation({ ...selectedStation, pricePerKW: text })
//               }
//             />
//             <Button title="Update Station" onPress={handleStationUpdate} />

//             <Text style={styles.title}>Bookings</Text>
//             {selectedStation.bookings.length > 0 ? (
//               <FlatList
//                 data={selectedStation.bookings}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderBookings}
//               />
//             ) : (
//               <Text>No Bookings Available</Text>
//             )}

//             <TouchableOpacity onPress={() => setSelectedStation(null)}>
//               <Text style={styles.backButton}>Back to Dashboard</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           // Dashboard view
//           <View>
//             <Text style={styles.title}>Charging Station Dashboard</Text>
//             {stations.map((station) => (
//               <TouchableOpacity
//                 key={station.id}
//                 onPress={() => handleStationSelect(station)}
//               >
//                 <View style={styles.stationItem}>
//                   <Text>{station.name}</Text>
//                   <Text>{station.location}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )
//       ) : (
//         // Sign-In Page
//         <View>
//           <Text style={styles.title}>Operator Sign In</Text>
//           <TextInput style={styles.input} placeholder="Username" />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//           />
//           <Button title="Sign In" onPress={handleSignIn} />
//         </View>
//       )}
//     </View>
//   );
// }

// // Styles for dashboard
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     marginTop: 50,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   stationItem: {
//     padding: 15,
//     backgroundColor: "#f2f2f2",
//     borderRadius: 5,
//     marginVertical: 10,
//   },
//   bookingItem: {
//     padding: 10,
//     backgroundColor: "#e0f7fa",
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   backButton: {
//     color: "blue",
//     marginTop: 10,
//     textDecorationLine: "underline",
//   },
// });
