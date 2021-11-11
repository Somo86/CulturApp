import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Image, Text, View } from 'react-native-ui-lib';
import styled from 'styled-components';
import { Route } from '../../Model/Entities/Route';
import { avarage } from '../../utils/maths';
import { minutesToHours } from '../../utils/time';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RouteViewProps = {
  route: Route | undefined;
  onPressViewMap: () => void;
};

const copies = {
  mapButton: 'Veure itinerari',
};

const FloatingText = styled(Text)`
  position: absolute;
  bottom: 10px;
  left: 30px;
  font-size: 32px;
  color: white;
`;

export const IntroRouteView: React.FC<RouteViewProps> = ({
  route,
  onPressViewMap,
}) => {
  return (
    <View>
      <ScrollView>
        <View>
          <Image
            height={200}
            source={{
              uri: route?.image,
            }}
          />
          <FloatingText>{route?.title}</FloatingText>
        </View>
        <View paddingH-20 paddingV-20 flex>
          <View>
            <Button outline label={copies.mapButton} onPress={onPressViewMap} />
          </View>
          <View paddingV-20>
            <Text>{route?.introduction}</Text>
            <View row centerV marginT-20>
              <Text>
                {`Durada aprox. ${minutesToHours(
                  route?.duration,
                )} hores | ${avarage(route?.votes)}`}{' '}
              </Text>
              <Icon name='star-rate' color='#fdd835' size={20} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
