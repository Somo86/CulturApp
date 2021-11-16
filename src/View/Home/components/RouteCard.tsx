import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, View, Text } from 'react-native-ui-lib';
import { avarage } from '../../../utils/maths';
import { onPressType } from '../../../ViewController/Home';
import { Route } from '../../../Model/Entities/Route';
import { minutesToHours } from '../../../utils/time';
import { toCategoryName } from '../../../utils/pipe';

type RouteCardProps = Route & { id: string } & { onPressCard: onPressType };

export const RouteCard: React.FC<RouteCardProps> = ({
  id,
  title,
  image,
  creatorName,
  place,
  duration,
  categoryId,
  votes = [],
  onPressCard,
}) => {
  const imageSource = image
    ? { uri: image }
    : require('../../../assets/images/empty.jpeg');
  return (
    <Card height={210} marginV-15 onPress={() => onPressCard({ routeId: id })}>
      <Card.Section
        imageSource={imageSource}
        imageStyle={{ width: '100%', height: 70 }}
      />
      <View padding-20>
        <Text>{title}</Text>
        <Text>{creatorName}</Text>
        <View row centerV paddingV-4>
          <Icon name='info' size={20} />
          <Text marginL-5>{place} | </Text>
          <Text>{toCategoryName(categoryId) || null}</Text>
        </View>
        <View row centerV paddingV-4>
          <Icon name='alarm-on' size={20} />
          <Text marginL-5>
            Durada aprox. {minutesToHours(duration)} hores |{' '}
          </Text>
          <Text>{avarage(votes)}</Text>
          <Icon name='star-rate' color='#fdd835' size={20} />
        </View>
      </View>
    </Card>
  );
};
