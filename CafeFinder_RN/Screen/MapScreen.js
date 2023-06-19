import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import * as Location from 'expo-location';

const MapScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const [mapRegion, setMapRegion] = useState(null);
  const mapRef = React.useRef(null);
  const [region, setRegion] = React.useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const mapRegionChangeHandle = (region) => {
    setRegion(region);
  };

  const onMarkerPress = () => {
    if (region && item && item.latitude && item.longitude) {
      const markerLocation = {
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
      };

      navigation.dispatch(
        CommonActions.navigate({
          name: 'MarkerDistance',
          params: {
            currentLocation: region,
            markerLocation: markerLocation,
          },
        })
      );
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('위치 권한이 거부되었습니다.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('현재 위치:', location.coords.latitude, location.coords.longitude);
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  useEffect(() => {
    if (item && item.latitude && item.longitude) {
      const { latitude, longitude } = item;
      setMapRegion({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } else {
      setMapRegion((prevRegion) => ({
        ...prevRegion,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }));
    }
  }, [item]);

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          ref={mapRef}
          style={styles.map}
          region={currentLocation}
          onRegionChange={mapRegionChangeHandle}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {item && item.latitude && item.longitude && (
            <Marker
              coordinate={{
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude),
              }}
              title={item.title}
              description={item.description}
              onPress={onMarkerPress}
            >
              <Callout>
                <View>
                  <Text>{item.title}</Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;