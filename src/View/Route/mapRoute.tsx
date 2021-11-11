import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { View, Text, Colors } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Seightseeing } from '../../Model/Entities/Seightseeing';

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
  seightseeing: Array<Seightseeing & { id: string }> | undefined;
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
  seightseeing,
  onPressBackToDescription,
}) => {
  const initialPosition = seightseeing
    ? seightseeing[0].points[0].position
    : { latitude: '37.78825', longitude: '-122.4324' };

  const region = {
    latitude: parseFloat(initialPosition.latitude),
    longitude: parseFloat(initialPosition.longitude),
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  return (
    <View>
      <Pressable onPress={onPressBackToDescription}>
        <StyledHeader>
          <Icon name='chevron-left' color='grey' size={40} />
          <Text h3>{title}</Text>
        </StyledHeader>
      </Pressable>

      <View style={styles.container}>
        {seightseeing && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}>
            {seightseeing[0].points.map((point, index) => {
              const { latitude, longitude } = point.position;

              return (
                <Marker
                  key={`maker_${latitude}`}
                  title={point.name}
                  pinColor={index === 0 ? Colors.mainColor : null}
                  coordinate={{
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                  }}
                />
              );
            })}
            <Polyline
              strokeColor={Colors.mainColor}
              strokeWidth={4}
              coordinates={seightseeing[0].points.map(point => ({
                latitude: parseFloat(point.position.latitude),
                longitude: parseFloat(point.position.longitude),
              }))}
            />
          </MapView>
        )}
      </View>
    </View>
  );
};
