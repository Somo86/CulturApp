import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import {
  RadioGroup,
  RadioButton,
  TextField,
  Button,
  View,
} from 'react-native-ui-lib';
import { AppLayout } from '../components/Layout';
import { UserTypeEnum } from '../../Model/Entities/User';
import {
  ErrorType,
  ErrorTypesEnum,
  LoggedInfoType,
} from '../../ViewController/Register';
import { useToast, ToastTypes } from '../hooks/useToast';
import { firebaseAuthErrorsCopies } from '../../utils/firebase';

type RegisterViewProps = {
  userTypeValue: UserTypeEnum;
  onRadioValueChange: (value: UserTypeEnum) => void;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  error: ErrorType;
  loggedInfo: LoggedInfoType;
};

const copies = {
  namePlaceholder: 'Nom i cognoms',
  // eslint-disable-next-line quotes
  entityNamePlaceholder: "Nom de l'entitat cultural",
  emailPlaceholder: 'E-mail',
  passwordPlaceholder: 'Contrasenya',
  radioButtonCitizen: 'Sóc ciutadà',
  radioButtonEntity: 'Sóc entitat cultural',
  buttonLabel: 'Fet',
  cancelButton: 'Cancelar',
  error: {
    ...firebaseAuthErrorsCopies,
    name: 'El nom és un camp obligatori',
    password: 'La contrasenya ha de contenir un mínim de 6 caràcters',
    email: 'El format del e-mail no és correcte',
    // eslint-disable-next-line quotes
    login: "L'usuari no s'ha pogut crear. Torna-ho a probar més tard.",
    alreadyLogged: 'Aquest usuari ja existeix.',
    // eslint-disable-next-line quotes
    generic: "S'ha produït un error",
  },
  success: {
    register: 'Registre realitzat correctament',
  },
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

export const RegisterView: React.FC<RegisterViewProps> = ({
  userTypeValue,
  onRadioValueChange,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onCancel,
  error,
  loggedInfo,
}) => {
  const { Toast, createToast } = useToast();

  useEffect(() => {
    error.type === ErrorTypesEnum.FIREBASEERROR &&
      createToast({
        content: copies.error[error.code] || copies.error.generic,
        type: ToastTypes.ERROR,
      });
  }, [error]);

  useEffect(() => {
    loggedInfo?.isNewUser &&
      createToast({
        content: copies.success.register,
        type: ToastTypes.INFO,
      });
  }, [loggedInfo]);

  return (
    <AppLayout makeScrollable={false}>
      <Toast />
      <Container>
        <RadioGroup
          initialValue={userTypeValue}
          onValueChange={onRadioValueChange}>
          <View row spread paddingH-20>
            <RadioButton
              value={UserTypeEnum.CITIZEN}
              label={copies.radioButtonCitizen}
            />
            <RadioButton
              value={UserTypeEnum.ENTITY}
              label={copies.radioButtonEntity}
            />
          </View>
        </RadioGroup>
        <View paddingT-40>
          {userTypeValue === UserTypeEnum.CITIZEN && (
            <TextField
              placeholder={copies.namePlaceholder}
              onChangeText={onNameChange}
              error={
                error.type === ErrorTypesEnum.FORMERROR && error.code === 'name'
                  ? copies.error.name
                  : null
              }
            />
          )}
          {userTypeValue === UserTypeEnum.ENTITY && (
            <TextField
              placeholder={copies.entityNamePlaceholder}
              onChangeText={onNameChange}
              error={
                error.type === ErrorTypesEnum.FORMERROR && error.code === 'name'
                  ? copies.error.name
                  : null
              }
            />
          )}
        </View>
        <View>
          <TextField
            placeholder={copies.emailPlaceholder}
            onChangeText={onEmailChange}
            error={
              error.type === ErrorTypesEnum.FORMERROR && error.code === 'email'
                ? copies.error.email
                : null
            }
          />
        </View>
        <View>
          <TextField
            placeholder={copies.passwordPlaceholder}
            onChangeText={onPasswordChange}
            error={
              error.type === ErrorTypesEnum.FORMERROR &&
              error.code === 'password'
                ? copies.error.password
                : null
            }
          />
        </View>
        <View marginT-30>
          <Button label={copies.buttonLabel} onPress={onSubmit} />
        </View>
        <View marginT-30>
          <Button
            link
            linkColor='#9c27b0'
            label={copies.cancelButton}
            onPress={onCancel}
          />
        </View>
      </Container>
    </AppLayout>
  );
};
