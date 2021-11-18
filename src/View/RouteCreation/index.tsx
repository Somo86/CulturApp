import React, { useEffect } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { Button, Picker, Text, TextField, View } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import categories from '../../assets/json/categories.json';
import cities from '../../assets/json/cities.json';
import { ErrorsEnum, LoadingStates } from '../../ViewController/RouteCreation';
import { ToastTypes, useToast } from '../hooks/useToast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import addImage from '../../assets/images/file-image-plus-outline.png';

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
  uploading: {
    loading: 'Guardant la image...',
    done: 'Feina feta!',
    // eslint-disable-next-line quotes
    error: "S'ha produït un error al guardar l'arxiu",
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
  onPickImage: () => void;
  onSubmit: () => void;
  selectedPlace: string;
  selectedCategory: number;
  errors: ErrorsEnum | undefined;
  loadingImage: LoadingStates;
};

const Container = styled.ScrollView`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px;
  height: 800px;
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

const MultilineView = styled(View)`
  max-height: 70px;
`;

export const RouteCreationView: React.FC<RouteCreationViewType> = ({
  onTitleChange,
  onIntroductionChange,
  onDescriptionChange,
  onLenghtChange,
  onPlaceChange,
  onCategoryChange,
  onPressCloseView,
  onPickImage,
  onSubmit,
  selectedPlace,
  selectedCategory,
  errors,
  loadingImage,
}) => {
  const { Toast, createToast } = useToast();

  useEffect(() => {
    errors === ErrorsEnum.UPLOADIMAGE
      ? createToast({
          content: copies.uploading.error,
          type: ToastTypes.ERROR,
        })
      : null;
  }, [errors]);

  return (
    <View>
      <Toast />
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
          <MultilineView>
            <ScrollView>
              <TextField
                multiline={true}
                placeholder={copies.introductionPlaceholder}
                onChangeText={onIntroductionChange}
                error={
                  errors === ErrorsEnum.INTRODUCTION
                    ? copies.error.introduction
                    : null
                }
              />
            </ScrollView>
          </MultilineView>
          <MultilineView>
            <ScrollView>
              <TextField
                multiline={true}
                placeholder={copies.descriptionPlaceholder}
                onChangeText={onDescriptionChange}
                error={
                  errors === ErrorsEnum.DESCRIPTION
                    ? copies.error.description
                    : null
                }
              />
            </ScrollView>
          </MultilineView>
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
          <View centerH>
            <Button
              iconSource={addImage}
              borderRadius={10}
              style={{ width: 100, height: 100 }}
              onPress={onPickImage}
            />
            {loadingImage !== LoadingStates.EMPTY && (
              <Text h5 marginT-10>
                {loadingImage === LoadingStates.LOADING
                  ? copies.uploading.loading
                  : copies.uploading.done}
              </Text>
            )}
          </View>
          <View marginT-40>
            <Button label={copies.buttonLabel} onPress={onSubmit} />
          </View>
        </Container>
      </ScrollView>
    </View>
  );
};
