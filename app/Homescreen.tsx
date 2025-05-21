import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import AppMapView from "./AppMapView";
import Header from "./Header";
import ListView from "./ListView";
import { UserLocationContext } from "./context/UserLocationContext";
import GlobalAPI from "./GlobalAPI";
import BookingPage from "./BookCharger";

export default function Homescreen({ navigation }) {
  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    location && GetNearByPlace();
  }, [location]);

  const GetNearByPlace = () => {
    const data = {
      includedTypes: ["electric_vehicle_charging_station"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 500.0,
        },
      },
    };
    GlobalAPI.NewNearByPlace(data).then((resp) => {
      console.log(resp.data);
    });
  };

  return (
    <View style={{ marginTop: 30 }}>
      <View>
        <Text>
          <ListView />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
});
