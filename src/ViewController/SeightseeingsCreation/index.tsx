import React, { useState, useRef } from 'react';
import { Point } from 'react-native-google-places-autocomplete';
import { useHistory, useParams } from 'react-router-native';
import { Points, Seightseeing } from '../../Model/Entities/Seightseeing';
import { random } from '../../utils/maths';
import { validateIsEmpty, validateMinLength } from '../../utils/validation';
import { SeightseeingsCreationView } from '../../View/SeightseeingsCreation';
import { SeightseeingsCreationViewModelType } from '../../ViewModel/SeightseeingsCreation';

type SeightseeingsCreationViewControllerProps = {
  viewModel: SeightseeingsCreationViewModelType;
};

export enum ErrorsEnum {
  NAME,
  DESCRIPTION,
  INTRODUCTION,
}

export enum ToastEnum {
  NONE,
  SUCCESS,
  FAIL,
}

export const SeightseeingsCreationViewController: React.FC<SeightseeingsCreationViewControllerProps> =
  ({ viewModel }) => {
    const { routeId } = useParams<{ routeId: string }>();
    const { push } = useHistory();

    const [errors, setErrors] = useState<ErrorsEnum | undefined>();
    const [name, setName] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState<Point>({ lat: 0, lng: 0 });
    const [seightseeingList, setSeightseeing] = useState<Points[]>([]);
    const [showToast, setShowToast] = useState(ToastEnum.NONE);

    const GoogleAutocompleteRef = useRef();

    const generateSeightseeing = (): Points => ({
      name,
      introduction,
      description,
      position: {
        latitude: location.lat.toString(),
        longitude: location.lng.toString(),
      },
    });

    const isValidForm = () => {
      if (validateIsEmpty(name)) {
        setErrors(ErrorsEnum.NAME);
        return false;
      }

      if (!validateMinLength(introduction, 10)) {
        setErrors(ErrorsEnum.INTRODUCTION);
        return false;
      }

      if (!validateMinLength(description, 10)) {
        setErrors(ErrorsEnum.DESCRIPTION);
        return false;
      }

      return true;
    };

    const onNameChange = (text: string) => setName(text);
    const onIntroductionChange = (text: string) => setIntroduction(text);
    const onDescriptionChange = (text: string) => setDescription(text);
    const onSubmit = () => {
      if (isValidForm()) {
        const newPoint = generateSeightseeing();

        const newSeightseeing: Seightseeing = {
          routeId: parseInt(routeId),
          points: [...seightseeingList, newPoint],
        };
        try {
          viewModel.createSeightseeing(random().toString(), newSeightseeing);
          setShowToast(ToastEnum.SUCCESS);
          setTimeout(() => push('/home'), 3000);
        } catch (e) {
          setShowToast(ToastEnum.FAIL);
          setTimeout(() => push('/creation'), 3000);
        }
      }
    };

    const onAddSeightseeing = ({
      refName,
      refIntroduction,
      refDescription,
    }: any) => {
      if (isValidForm()) {
        setSeightseeing([...seightseeingList, generateSeightseeing()]);
        // clear fields
        refName && refName.current.clear();
        refIntroduction && refIntroduction.current.clear();
        refDescription && refDescription.current.clear();
        GoogleAutocompleteRef.current && GoogleAutocompleteRef.current.clear();
      }
    };

    const onPressPlaceSelection = (details: Point | undefined) => {
      details && setLocation(details);
    };

    const onPressCloseView = () => push('/home');

    return (
      <SeightseeingsCreationView
        onNameChange={onNameChange}
        onIntroductionChange={onIntroductionChange}
        onDescriptionChange={onDescriptionChange}
        onSubmit={onSubmit}
        onAddSeightseeing={onAddSeightseeing}
        onPressCloseView={onPressCloseView}
        errors={errors}
        seightseeingList={seightseeingList}
        onPressPlaceSelection={onPressPlaceSelection}
        GoogleAutocompleteRef={GoogleAutocompleteRef}
        showToast={showToast}
      />
    );
  };
