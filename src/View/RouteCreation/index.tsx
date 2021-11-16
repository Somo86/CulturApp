import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import { Button, Picker, Text, TextField, View } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import categories from '../../assets/json/categories.json';
import cities from '../../assets/json/cities.json';
import { ErrorsEnum } from '../../ViewController/RouteCreation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const copies = {
  // eslint-disable-next-line quotes
  titlePage: "Detalls de l'itinerari",
  // eslint-disable-next-line quotes
  titlePlaceholder: "Títol de l'itinerari",
  introductionPlaceholder: 'Introducció',
  // eslint-disable-next-line quotes
  descriptionPlaceholder: "Descripció de l'itinerari",
  lengthPlaceholder: 'Duració aproximada en minuts',
  placePlaceholder: 'Localitat',
  categoryPlaceholder: 'Categoria',
  buttonLabel: 'Següent',
  error: {
    title: 'El títol és un camp obligatori',
    introduction: 'La introducció és un camp obligatori',
    description: 'La descripció és un camp obligatori',
    place: 'Has de seleccionar una localitat',
    category: 'Has de seleccionar una categoria',
  },
};

type RouteCreationViewType = {
  onTitleChange: (x: string) => void;
  onIntroductionChange: (x: string) => void;
  onDescriptionChange: (x: string) => void;
  onLenghtChange: (x: number) => void;
  onPlaceChange: (x: { label: string; value: string }) => void;
  onCategoryChange: (x: { label: string; value: number }) => void;
  onPressCloseView: () => void;
  onSubmit: () => void;
  selectedPlace: string;
  selectedCategory: number;
  errors: ErrorsEnum | undefined;
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

const StyledHeader = styled.View`
  height: 60px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

export const RouteCreationView: React.FC<RouteCreationViewType> = ({
  onTitleChange,
  onIntroductionChange,
  onDescriptionChange,
  onLenghtChange,
  onPlaceChange,
  onCategoryChange,
  onPressCloseView,
  onSubmit,
  selectedPlace,
  selectedCategory,
  errors,
}) => {
  return (
    <View>
      <Pressable onPress={onPressCloseView}>
        <StyledHeader>
          <Text h3>{copies.titlePage}</Text>
          <Icon name='close' color='grey' size={40} />
        </StyledHeader>
      </Pressable>
      <ScrollView>
        <Container>
          <View paddingT-40>
            <TextField
              placeholder={copies.titlePlaceholder}
              onChangeText={onTitleChange}
              error={errors === ErrorsEnum.TITLE ? copies.error.title : null}
            />
          </View>
          <View>
            <TextField
              expandable
              placeholder={copies.introductionPlaceholder}
              onChangeText={onIntroductionChange}
              error={
                errors === ErrorsEnum.INTRODUCTION
                  ? copies.error.introduction
                  : null
              }
            />
          </View>
          <View>
            <TextField
              expandable
              placeholder={copies.descriptionPlaceholder}
              onChangeText={onDescriptionChange}
              error={
                errors === ErrorsEnum.DESCRIPTION
                  ? copies.error.description
                  : null
              }
            />
          </View>
          <View>
            <TextField
              placeholder={copies.lengthPlaceholder}
              onChangeText={onLenghtChange}
            />
          </View>
          <View>
            <Picker
              placeholder={copies.placePlaceholder}
              value={selectedPlace}
              error={errors === ErrorsEnum.PLACE ? copies.error.place : null}
              onChange={onPlaceChange}>
              {cities.list.map(city => (
                <Picker.Item key={`option_${city}`} value={city} label={city} />
              ))}
            </Picker>
          </View>
          <View>
            <Picker
              placeholder={copies.categoryPlaceholder}
              value={selectedCategory}
              error={
                errors === ErrorsEnum.CATEGORY ? copies.error.category : null
              }
              onChange={onCategoryChange}>
              {categories.list.map(category => (
                <Picker.Item
                  key={`option_${category.label}`}
                  value={category.id}
                  label={category.label}
                />
              ))}
            </Picker>
          </View>
          <View marginT-30>
            <Button label={copies.buttonLabel} onPress={onSubmit} />
          </View>
        </Container>
      </ScrollView>
    </View>
  );
};
