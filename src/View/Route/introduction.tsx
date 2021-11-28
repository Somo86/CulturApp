import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import { Button, Image, Text, View } from 'react-native-ui-lib';
import styled from 'styled-components';
import { Route } from '../../Model/Entities/Route';
import { avarage } from '../../utils/maths';
import { minutesToHours } from '../../utils/time';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RouteViewProps = {
  route: Route | undefined;
  onPressViewMap: () => void;
  onPressStart: () => void;
  onPressBackToHome: () => void;
};

export const copies = {
  mapButton: 'Veure itinerari',
  startButton: 'Comença',
};

const FloatingText = styled(Text)`
  position: absolute;
  bottom: 0px;
  left: 20px;
  font-size: 32px;
  color: white;
`;

const StyledView = styled(View)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FloatingIcon = styled(Pressable)`
  position: absolute;
  top: 5px;
  left: 0;
  z-index: 3;
`;

const IntroductionText = styled(Text)`
  font-style: italic;
  color: #9e9e9e;
  margin-bottom: 10px;
`;

export const IntroRouteView: React.FC<RouteViewProps> = ({
  route,
  onPressViewMap,
  onPressStart,
  onPressBackToHome,
}) => {
  return (
    <StyledView>
      <ScrollView>
        <View>
          <FloatingIcon onPress={onPressBackToHome}>
            <Icon name='chevron-left' color='white' size={40} />
          </FloatingIcon>
          <Image
            style={{ height: 200 }}
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
            <IntroductionText>{route?.introduction}</IntroductionText>
            <Text>{route?.description}</Text>
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
      <Button margin-20 label={copies.startButton} onPress={onPressStart} />
    </StyledView>
  );
};
