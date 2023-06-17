import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = ({ route }) => {
  const { item } = route.params;

  const [mapRegion, setMapRegion] = useState({
    latitude: 36.7987869,
    longitude: 127.0757584,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const mapRef = React.useRef(null);

  const [region, setRegion] = React.useState(null);

  const mapRegionChangeHandle = (region) => {
    setRegion(region);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  useEffect(() => {
    if (item) {
      const { latitude, longitude } = item;
      setMapRegion({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [item]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={mapRegion}
        onRegionChange={mapRegionChangeHandle}
        showsUserLocation={true}
        followsUserLocation={false} // 수정: followsUserLocation 속성을 false로 설정
      >
        {item && item.latitude && item.longitude && (
          <Marker
            coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            }}
          >
            <Callout>
              <View>
                <Text>{item.name}</Text>
                <Text>{item.brand}</Text>
                <Text>{item.price}</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;