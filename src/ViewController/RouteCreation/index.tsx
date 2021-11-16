import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { Route } from '../../Model/Entities/Route';
import { random } from '../../utils/maths';
import { validateIsEmpty, validateMinLength } from '../../utils/validation';
import { RouteCreationView } from '../../View/RouteCreation';
import { RouteCreationModelViewType } from '../../ViewModel/RouteCreation';
import { UserContextType, useUser } from '../hooks/useUser';

type RouteCreationViewControllerType = {
  viewModel: RouteCreationModelViewType;
};

export enum ErrorsEnum {
  TITLE,
  DESCRIPTION,
  INTRODUCTION,
  PLACE,
  CATEGORY,
}

const ROUTE_ID = random();

export const RouteCreationViewController: React.FC<RouteCreationViewControllerType> =
  ({ viewModel }) => {
    const { push } = useHistory();
    const { completeName, id } = useUser() as UserContextType;

    const [errors, setErrors] = useState<ErrorsEnum | undefined>();
    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [description, setDescription] = useState('');
    const [lenght, setLenght] = useState(0);
    const [place, setPlace] = useState<{ label: string; value: string }>({
      label: '',
      value: '',
    });
    const [category, setCategory] = useState<{ label: string; value: number }>({
      label: '',
      value: 0,
    });

    const onTitleChange = (text: string) => setTitle(text);
    const onIntroductionChange = (text: string) => setIntroduction(text);
    const onDescriptionChange = (text: string) => setDescription(text);
    const onLenghtChange = (text: number) => setLenght(text);
    const onPlaceChange = (selection: { label: string; value: string }) =>
      setPlace(selection);
    const onCategoryChange = (selection: { label: string; value: number }) =>
      setCategory(selection);
    const onSubmit = async () => {
      if (validateIsEmpty(title)) {
        setErrors(ErrorsEnum.TITLE);
        return;
      }

      if (!validateMinLength(introduction, 10)) {
        setErrors(ErrorsEnum.INTRODUCTION);
        return;
      }

      if (!validateMinLength(description, 10)) {
        setErrors(ErrorsEnum.DESCRIPTION);
        return;
      }

      if (category.value === 0) {
        setErrors(ErrorsEnum.CATEGORY);
        return;
      }

      if (validateIsEmpty(place.value)) {
        setErrors(ErrorsEnum.PLACE);
        return;
      }

      const newRoute: Route = {
        title,
        introduction,
        description,
        duration: lenght,
        place: place.value,
        categoryId: category.value,
        votes: [],
        image: '',
        creatorName: completeName || '',
        creatorId: id || '0',
      };

      await viewModel.createRoute(ROUTE_ID, newRoute);
    };

    const onPressCloseView = () => push('/home');

    return (
      <RouteCreationView
        onTitleChange={onTitleChange}
        onIntroductionChange={onIntroductionChange}
        onDescriptionChange={onDescriptionChange}
        onLenghtChange={onLenghtChange}
        onPlaceChange={onPlaceChange}
        onCategoryChange={onCategoryChange}
        onPressCloseView={onPressCloseView}
        onSubmit={onSubmit}
        selectedPlace={place.value}
        selectedCategory={category.value}
        errors={errors}
      />
    );
  };
