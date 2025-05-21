// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";

// export default function AdminLogin({ onLoginSuccess }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = () => {
//     if (email === "admin@admin.com" && password === "admin") {
//       onLoginSuccess(); // Call the passed function after successful login
//     } else {
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Admin Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   input: {
//     width: "80%",
//     marginVertical: 10,
//     padding: 10,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   button: {
//     marginTop: 10,
//     padding: 12,
//     backgroundColor: "#4CAF50",
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 16,
//   },
//   error: {
//     color: "red",
//     marginTop: 10,
//   },
// });
