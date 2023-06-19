import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

const MarkerDistanceScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [distance, setDistance] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('위치 권한이 거부되었습니다.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setCurrentLocation({ latitude, longitude });
      } catch (error) {
        console.log('위치 정보를 가져올 수 없습니다:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    calculateDistance();
  }, [currentLocation]);

  const calculateDistance = () => {
    if (currentLocation && item && item.latitude && item.longitude) {
      const { latitude: lat1, longitude: lon1 } = currentLocation;
      const { latitude: lat2, longitude: lon2 } = item;

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
    }
  };

  const goToMapScreen = () => {
    navigation.navigate('MapScreen', { item });
  };

  const goToTMap = () => {
    const tmapUrl = `tmap://route?goalx=${item.longitude}&goaly=${item.latitude}&appname=com.example.app`;

    Linking.openURL(tmapUrl).catch(() => {
      console.log('T맵 앱이 설치되어 있지 않은 경우 다른 액션을 수행할 수 있습니다.');
    });
  };

  const goToAppleMap = () => {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const destination = `${item.latitude},${item.longitude}`;
    const appleMapUrl = `https://maps.apple.com/?saddr=${origin}&daddr=${destination}`;

    Linking.openURL(appleMapUrl).catch(() => {
      console.log('애플 맵 앱이 설치되어 있지 않은 경우 다른 액션을 수행할 수 있습니다.');
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#9acd32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.distanceText2}>
        길찾기 {'\n'}
      </Text>
      <Text style={styles.distanceText}>
        현위치부터 목적지까지 벡터거리: {distance} km {'\n\n\n\n\n\n'}
      </Text>

      <Text style={styles.buttonText}>지도 화면으로 이동 ↓ </Text>
      <TouchableOpacity style={styles.button} onPress={goToMapScreen}>
        <Image
          style={styles.imageButton}
          source={require("../assets/mapscreen.png")}
        />
      </TouchableOpacity>
      <Text style={styles.buttonText}>(차량 탑승 길찾기) T맵 으로 이동 ↓ </Text>
      <TouchableOpacity style={styles.button} onPress={goToTMap}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.imageButton}
            source={require("../assets/drive.png")}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.buttonText}>(도보 이동 길찾기) 애플 맵으로 이동 ↓</Text>
      <TouchableOpacity style={styles.button} onPress={goToAppleMap}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.imageButton}
            source={require("../assets/walk.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Added horizontal padding for spacing
  },
  distanceText: {
    fontSize: 15,
    marginTop: 20,
  },
  distanceText2:{
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 50, // Added margin bottom for spacing
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#9acd32',
  },
  buttonText: {
    color: 'green',
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButton: {
    width: 50,
    height: 50
  },
});

export default MarkerDistanceScreen;