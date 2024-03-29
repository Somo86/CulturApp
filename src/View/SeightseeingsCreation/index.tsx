import React, { MutableRefObject, useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextField, View, Colors, Text } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import {
  ErrorsEnum,
  LoadingStates,
  ToastEnum,
} from '../../ViewController/SeightseeingsCreation';
import { TitleAppBar } from '../components/TitleAppBar';
import { Points } from '../../Model/Entities/Seightseeing';
import { SeightseeingCard } from './components/SeightseeingCard';
import { GooglePlacesInput } from './components/GooglePlacesAutocomplete';
import { Point } from 'react-native-google-places-autocomplete';
import { ToastTypes, useToast } from '../hooks/useToast';
import plus from '../../assets/images/plus.png';
import videoPlus from '../../assets/images/video-plus.png';

const copies = {
  // eslint-disable-next-line quotes
  titlePage: "Punt d'interès",
  // eslint-disable-next-line quotes
  namePlaceholder: "Nom del punt d'interès",
  buttonLabel: 'Fet',
  // eslint-disable-next-line quotes
  buttonAddSeightseeingLabel: "Afegeix un altre punt d'interès",
  // eslint-disable-next-line quotes
  introductionPlaceholder: "Unes parauls sobre el punt d'interès",
  // eslint-disable-next-line quotes
  descriptionPlaceholder: "Descriu el punt d'interès",
  googleAutocompletePlaceholder: 'Direcció o nom del lloc',
  error: {
    name: 'El nom és un camp obligatori',
    introduction: 'Una introducció és obligatoria',
    description: 'Una descripció és obligatòria',
  },
  toast: {
    // eslint-disable-next-line quotes
    success: "Punts d'interès creats correctament",
    // eslint-disable-next-line quotes
    fail: "S'ha produït un error",
  },
  uploading: {
    // eslint-disable-next-line quotes
    loading: "Guardant l'arxiu de vídeo...",
    done: 'Feina feta!',
  },
};

type onAddParams = {
  refName: MutableRefObject<null>;
  refIntroduction: MutableRefObject<null>;
  refDescription: MutableRefObject<null>;
};

type SeightseeingsCreationViewProps = {
  onNameChange: (x: string) => void;
  onIntroductionChange: (x: string) => void;
  onDescriptionChange: (x: string) => void;
  onSubmit: () => void;
  onAddSeightseeing: (x: onAddParams) => void;
  onPressCloseView: () => void;
  onPressPlaceSelection: (x: Point | undefined) => void;
  onPickVideo: () => void;
  errors: ErrorsEnum | undefined;
  seightseeingList: Points[];
  GoogleAutocompleteRef: React.Ref<any>;
  showToast: ToastEnum;
  loadingVideo: LoadingStates;
};

const Container = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px;
  height: 800px;
  z-index: 1;
`;

const MultilineView = styled(View)`
  max-height: 70px;
`;

const IconStyle = {
  tintColor: Colors.mainColor,
  width: 20,
  height: 20,
};

export const SeightseeingsCreationView: React.FC<SeightseeingsCreationViewProps> =
  ({
    onNameChange,
    onIntroductionChange,
    onDescriptionChange,
    onSubmit,
    onAddSeightseeing,
    onPressCloseView,
    onPressPlaceSelection,
    onPickVideo,
    errors,
    seightseeingList,
    GoogleAutocompleteRef,
    showToast,
    loadingVideo,
  }) => {
    const { Toast, createToast } = useToast();

    const refName = useRef(null);
    const refIntroduction = useRef(null);
    const refDescription = useRef(null);

    useEffect(() => {
      showToast === ToastEnum.SUCCESS || showToast === ToastEnum.FAIL
        ? createToast({
            content:
              showToast === ToastEnum.SUCCESS
                ? copies.toast.success
                : copies.toast.fail,
            type:
              showToast === ToastEnum.SUCCESS
                ? ToastTypes.INFO
                : ToastTypes.ERROR,
          })
        : null;
    }, [showToast]);

    const onAddPressButton = () => {
      onAddSeightseeing({ refName, refIntroduction, refDescription });
    };

    return (
      <View>
        <TitleAppBar
          close
          title={copies.titlePage}
          onPressIcon={onPressCloseView}
        />
        <View>
          <Container>
            <Toast />
            <View>
              <ScrollView horizontal>
                {seightseeingList.map((seightseeing, index) => {
                  return (
                    <SeightseeingCard
                      key={`card_${seightseeing.name}_${index}`}
                      content={`${index + 1}. ${seightseeing.name}`}
                    />
                  );
                })}
              </ScrollView>
            </View>
            <View paddingT-40>
              <TextField
                ref={refName}
                placeholder={copies.namePlaceholder}
                onChangeText={onNameChange}
                error={errors === ErrorsEnum.NAME ? copies.error.name : null}
              />
            </View>
            <GooglePlacesInput
              placeholder={copies.googleAutocompletePlaceholder}
              onSelect={onPressPlaceSelection}
              ref={GoogleAutocompleteRef}
            />
            <MultilineView>
              <ScrollView>
                <TextField
                  ref={refIntroduction}
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
                  ref={refDescription}
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
            <View centerH>
              <Button
                iconSource={videoPlus}
                iconStyle={{ width: 40 }}
                borderRadius={10}
                style={{ width: 100, height: 100 }}
                onPress={onPickVideo}
              />
              {loadingVideo !== LoadingStates.EMPTY && (
                <Text h5 marginT-10>
                  {loadingVideo === LoadingStates.LOADING
                    ? copies.uploading.loading
                    : copies.uploading.done}
                </Text>
              )}
            </View>
            <View marginT-40>
              <Button
                disabled={loadingVideo === LoadingStates.LOADING}
                iconSource={plus}
                iconStyle={IconStyle}
                label={copies.buttonAddSeightseeingLabel}
                onPress={onAddPressButton}
                outline
              />
            </View>
            <View marginT-20>
              <Button
                label={copies.buttonLabel}
                onPress={onSubmit}
                disabled={loadingVideo === LoadingStates.LOADING}
              />
            </View>
          </Container>
        </View>
      </View>
    );
  };
