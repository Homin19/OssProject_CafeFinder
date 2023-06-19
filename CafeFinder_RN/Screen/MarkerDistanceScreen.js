import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// npm install expo-linking
import * as Linking from 'expo-linking';
//npm install expo-location
import * as Location from 'expo-location';

const MarkerDistanceScreen = ({ route }) => {
  const { currentLocation, markerLocation } = route.params;
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    calculateDistance();
  }, []);

  const calculateDistance = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('위치 권한이 거부되었습니다.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const lat1 = location.coords.latitude;
      const lon1 = location.coords.longitude;
      const lat2 = markerLocation.latitude;
      const lon2 = markerLocation.longitude;

      if (lat1 === lat2 && lon1 === lon2) {
        setDistance(0);
        return;
      }

      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const calculatedDistance = R * c;

      setDistance(calculatedDistance.toFixed(2));
    } catch (error) {
      console.log('위치 정보를 가져올 수 없습니다:', error);
    }
  };

  const goToTMap = () => {
    const tmapUrl = `tmap://route?goalx=${markerLocation.longitude}&goaly=${markerLocation.latitude}&appname=com.example.app`;

    Linking.openURL(tmapUrl).catch(() => {
      console.log('T맵 앱이 설치되어 있지 않은 경우 다른 액션을 수행할 수 있습니다.');
    });
  };

  const goToAppleMap = () => {
    

    
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const destination = `${markerLocation.latitude},${markerLocation.longitude}`;
    const appleMapUrl = `https://maps.apple.com/?saddr=${origin}&daddr=${destination}`;
    console.log('현재 위치:', currentLocation.latitude, currentLocation.longitude);

    Linking.openURL(appleMapUrl).catch(() => {
      console.log('애플 맵 앱이 설치되어 있지 않은 경우 다른 액션을 수행할 수 있습니다.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.distanceText}>
        현재 위치부터 마커까지의 거리: {distance} km
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="(차량 탑승) T맵으로 이동" onPress={goToTMap} />
        <Text> </Text>
        <Button title="(도보 이동) 애플 맵으로 이동" onPress={goToAppleMap} />
        <Text> </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default MarkerDistanceScreen;