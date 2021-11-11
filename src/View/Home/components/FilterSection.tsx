import React, { useState } from 'react';
import categories from '../../../assets/json/categories.json';
import cities from '../../../assets/json/cities.json';
import { Pressable, ScrollView } from 'react-native';
import {
  View,
  Text,
  Button,
  Picker,
  ExpandableSection,
} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeViewProps } from '..';

const copies = {
  buttonLabel: 'Filtres',
  selectPlace: 'Selecciona ubicació',
};

export const FilterSection: React.FC<
  Pick<HomeViewProps, 'onPressCategory' | 'selectedCity' | 'onChangeSelectCity'>
> = ({ onPressCategory, onChangeSelectCity, selectedCity }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <View centerH marginV-20>
        <Button
          label={copies.buttonLabel}
          iconSource={Icon.getImageSource('expand-more', 25)}
          outline={showFilters ? true : false}
          style={{ width: 170 }}
          onPress={() => setShowFilters(!showFilters)}
        />
      </View>
      <ExpandableSection expanded={showFilters}>
        <ScrollView horizontal={true}>
          {categories.list.map(category => {
            return (
              <Pressable
                key={`category_${category.id}`}
                onPress={() => onPressCategory(category.id)}>
                <View flex centerH paddingV-15 paddingH-15>
                  <Icon name={category.icon} size={25} />
                  <Text>{category.label}</Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
        <View paddingH-15>
          <Picker
            placeholder={copies.selectPlace}
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
      </ExpandableSection>
    </>
  );
};
