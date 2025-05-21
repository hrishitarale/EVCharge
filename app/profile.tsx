import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";

export default function profile() {
  const [bookingHistory, setBookingHistory] = useState([]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      {/* User Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}></Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}></Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}></Text>
      </View>

      {/* Booking History */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Booking History</Text>
        {bookingHistory.length > 0 ? (
          bookingHistory.map((booking, index) => (
            <View key={index} style={styles.bookingCard}>
              <Text style={styles.bookingText}>
                Charger: {booking.chargerName}
              </Text>
              <Text style={styles.bookingText}>Date: {booking.date}</Text>
              <Text style={styles.bookingText}>
                Duration: {booking.duration} hour(s)
              </Text>
              <Text style={styles.bookingText}>Status: {booking.status}</Text>
            </View>
          ))
        ) : (
          <Text>No booking history found.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bookingCard: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  bookingText: {
    fontSize: 14,
    marginBottom: 5,
  },
});
