import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const DistanceScreen = ({ route }) => {
  const { item } = route.params;

  // 거리를 표시할 상태 변수
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (item) {
      // 현위치와 마커의 위치 정보를 이용하여 거리 계산
      const { latitude, longitude } = item;
      // 현위치와 마커의 위도, 경도 값을 활용한 거리 계산 로직을 구현해야 합니다.
      // 여기에서는 임의의 예시 코드를 작성하였습니다.
      const calculatedDistance = calculateDistance(latitude, longitude);
      setDistance(calculatedDistance);
    }
  }, [item]);

  const calculateDistance = (latitude, longitude) => {
    // 실제 거리 계산 로직을 작성해야 합니다.
    // 예시로는 간단하게 두 지점 간의 직선 거리를 계산하는 예시 코드 작성
    const currentLocation = getCurrentLocation();
    const distance = Math.sqrt(
      Math.pow(latitude - currentLocation.latitude, 2) +
      Math.pow(longitude - currentLocation.longitude, 2)
    );
    return distance;
  };

  const getCurrentLocation = () => {
    // 현재 위치 정보를 가져오는 로직을 작성해야 합니다.
    // 예시로는 임의의 현재 위치를 반환하는 예시 코드 작성
    return {
      latitude: 37.1234,
      longitude: 127.5678
    };
  };

  return (
    <View>
      {distance !== null ? (
        <Text>현위치부터 마커까지의 거리: {distance} km</Text>
      ) : (
        <Text>거리 계산 중...</Text>
      )}
    </View>
  );
};

export default DistanceScreen;