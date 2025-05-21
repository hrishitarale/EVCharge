import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "./MapViewStyle.json";
import { UserLocationContext } from "./context/UserLocationContext";

export default function AppMapView() {
  const { location } = useContext(UserLocationContext);

  const markers = [
    {
      id: 1,
      title: "EV Dock Charging Station",
      coordinates: {
        latitude: 18.52850644563214,
        longitude: 73.8774118360739,
      },
    },
    {
      id: 2,
      title: "Synergy Charging Station",
      coordinates: {
        latitude: 18.511950151646122,
        longitude: 73.802667728993,
      },
    },
    {
      id: 3,
      title: "Bijlify Charging Station",
      coordinates: {
        latitude: 18.502710335125947, //   ,
        longitude: 73.80796067992733,
      },
    },
    {
      id: 4,
      title: "Würth Charging Station",
      coordinates: {
        latitude: 18.496498531007703, //,    ,
        longitude: 73.87230079015453,
      },
    },
    {
      id: 5,
      title: "Tata Power Charging Station",
      coordinates: {
        latitude: 18.52997271760576, // ,
        longitude: 73.86550942408444,
      },
    },
    {
      id: 6,
      title: "Ather Grid Charging Station",
      coordinates: {
        latitude: 18.50332289017635, //,  ,
        longitude: 73.81490550905734,
      },
    },
  ];
  return (
    location?.latitude && (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0121,
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinates}
              title={marker.title}
            >
              {/* <Image source={require('./../assets/images/car.png')} style={{width:50, height:100}} /> */}
            </Marker>
          ))}
        </MapView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
