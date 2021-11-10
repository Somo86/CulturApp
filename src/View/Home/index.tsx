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

export type HomeViewProps = {
  routes: Array<Route & { id: string }>;
  onPressCard: onPressType;
  onPressCategory: onPressCategoryType;
  onChangeSelectCity: (x: SelectedCityType) => void;
  selectedCity?: SelectedCityType;
};

export const HomeView: React.FC<HomeViewProps> = ({
  routes,
  selectedCity,
  onPressCard,
  onPressCategory,
  onChangeSelectCity,
}) => {
  return (
    <AppLayout showActionBar>
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
