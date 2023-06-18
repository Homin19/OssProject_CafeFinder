import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const MarkerDistanceScreen = ({ route }) => {
  const route = useRoute();
  const { currentLocation, markerLocation } = route.params;
  const navigation = useNavigation();

  // 거리 계산 함수
  const calculateDistance = () => {
    const lat1 = currentLocation.latitude;
    const lon1 = currentLocation.longitude;
    const lat2 = markerLocation.latitude;
    const lon2 = markerLocation.longitude;

    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance.toFixed(2); // 소수점 두 자리까지 표시
  };

  // 네이버지도로 이동하는 함수
  const goToNaverMap = () => {
    const naverMapUrl = `nmap://route/public?slat=${currentLocation.latitude}&slng=${currentLocation.longitude}&dlat=${markerLocation.latitude}&dlng=${markerLocation.longitude}&appname=com.example.app`;

    Linking.openURL(naverMapUrl).catch(() => {
      // 네이버지도 앱이 설치되어 있지 않은 경우, 웹 버전을 열거나 다른 액션을 수행할 수 있습니다.
      // 예: Linking.openURL(`https://map.naver.com/?dlevel=12&slat=${currentLocation.latitude}&slng=${currentLocation.longitude}&stext=출발지&elat=${markerLocation.latitude}&elng=${markerLocation.longitude}&etext=도착지`);
    });
  };

  // T맵으로 이동하는 함수
  const goToTMap = () => {
    const tmapUrl = `tmap://route?goalx=${markerLocation.longitude}&goaly=${markerLocation.latitude}&appname=com.example.app`;

    Linking.openURL(tmapUrl).catch(() => {
      // T맵 앱이 설치되어 있지 않은 경우, 웹 버전을 열거나 다른 액션을 수행할 수 있습니다.
      // 예: Linking.openURL(`https://apis.openapi.sk.com/tmap/app/routes?appKey=YOUR_APP_KEY&name=도착지&lon=${markerLocation.longitude}&lat=${markerLocation.latitude}`);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.distanceText}>
        현재 위치부터 마커까지의 거리: {calculateDistance()} km
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="네이버지도로 이동" onPress={goToNaverMap} />
        <Button title="T맵으로 이동" onPress={goToTMap} />
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
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default MarkerDistanceScreen;