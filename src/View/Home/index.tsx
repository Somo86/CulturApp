import React from 'react';
import { View, Picker } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { onPressType, RouteWithUserId } from '../../ViewController/Home';
import { AppLayout } from '../components/Layout';
import { RouteCard } from './components/RouteCard';
import cities from '../../assets/json/cities.json';

type HomeViewProps = {
  routes: RouteWithUserId[];
  onPressCard: onPressType;
  onChangeSelectCity: (x: string) => void;
  selectedCity?: string;
};

export const HomeView: React.FC<HomeViewProps> = ({
  routes,
  selectedCity,
  onPressCard,
  onChangeSelectCity,
}) => {
  return (
    <AppLayout showActionBar>
      <View>
        <View paddingH-15>
          <Picker
            placeholder='Favorite Language'
            showSearch
            value={selectedCity}
            onChange={onChangeSelectCity}
            floatingPlaceholder
            rightIconSource={Icon.getImageSourceSync('expand-more', 25)}>
            {cities.list.map(city => (
              <Picker.Item key={`option_${city}`} value={city} label={city} />
            ))}
          </Picker>
        </View>
        <View marginH-15>
          {routes.map(route => (
            <RouteCard
              key={`card_${route.routeId}`}
              onPressCard={onPressCard}
              {...route}
            />
          ))}
        </View>
      </View>
    </AppLayout>
  );
};
