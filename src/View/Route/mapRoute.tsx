import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    height: 800,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

type MapRouteViewProps = {
  title: string | undefined;
  onPressBackToDescription: () => void;
};

const StyledHeader = styled.View`
  height: 60px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MapRouteView: React.FC<MapRouteViewProps> = ({
  title,
  onPressBackToDescription,
}) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  return (
    <View>
      <Pressable onPress={onPressBackToDescription}>
        <StyledHeader>
          <Icon name='chevron-left' color='grey' size={40} />
          <Text h3>{title}</Text>
        </StyledHeader>
      </Pressable>

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
        />
      </View>
    </View>
  );
};
