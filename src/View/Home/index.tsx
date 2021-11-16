import React from 'react';
import { View } from 'react-native-ui-lib';
import {
  onPressCategoryType,
  onPressType,
  SelectedCityType,
} from '../../ViewController/Home';
import { AppLayout } from '../components/Layout';
import { RouteCard } from './components/RouteCard';
import { Route } from '../../Model/Entities/Route';
import { EmptyResults } from './components/EmptyResults';
import { FilterSection } from './components/FilterSection';
import { UserTypeEnum } from '../../Model/Entities/User';

export type HomeViewProps = {
  routes: Array<Route & { id: string }>;
  onPressCard: onPressType;
  onPressCategory: onPressCategoryType;
  onChangeSelectCity: (x: SelectedCityType) => void;
  onCreationPress: () => void;
  selectedCity?: SelectedCityType;
  userType?: number;
};

export const HomeView: React.FC<HomeViewProps> = ({
  routes,
  selectedCity,
  userType,
  onPressCard,
  onPressCategory,
  onChangeSelectCity,
  onCreationPress,
}) => {
  return (
    <AppLayout
      showActionBar
      showCreationButton={userType === UserTypeEnum.ENTITY}
      onCreationPress={onCreationPress}>
      <View>
        <FilterSection
          onPressCategory={onPressCategory}
          onChangeSelectCity={onChangeSelectCity}
          selectedCity={selectedCity}
        />
      </View>
      <View>
        <View marginH-15>
          {routes.length ? (
            routes.map(route => (
              <RouteCard
                key={`card_${route.id}`}
                onPressCard={onPressCard}
                {...route}
              />
            ))
          ) : (
            <EmptyResults />
          )}
        </View>
      </View>
    </AppLayout>
  );
};
