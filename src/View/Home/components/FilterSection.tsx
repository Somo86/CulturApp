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
  Colors,
} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeViewProps } from '..';

export const copies = {
  buttonLabel: 'Filtres',
  selectPlace: 'Selecciona ubicació',
};

export const FilterSection: React.FC<
  Pick<HomeViewProps, 'onPressCategory' | 'selectedCity' | 'onChangeSelectCity'>
> = ({ onPressCategory, onChangeSelectCity, selectedCity }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [pressedCategoy, setPressedCategoy] = useState<number | null>(null);

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
          {categories.list.map((category, index) => {
            const color =
              pressedCategoy === index ? Colors.mainColor : '#494949';

            return (
              <Pressable
                testID='category_filter'
                key={`category_${category.id}`}
                onPress={() => {
                  setPressedCategoy(index);
                  onPressCategory(category.id);
                }}>
                <View flex centerH paddingV-15 paddingH-15>
                  <Icon name={category.icon} size={25} color={color} />
                  <Text style={{ color }}>{category.label}</Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
        <View paddingH-15>
          <Picker
            testID='picker'
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
