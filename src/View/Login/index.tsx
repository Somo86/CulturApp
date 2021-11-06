import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { TextField, Button, View } from 'react-native-ui-lib';
import { ErrorTypes, LoggedInfoType } from '../../ViewController/Login';
import { useToast, ToastTypes } from '../hooks/useToast';

type LoginViewProps = {
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  onRegister: () => void;
  error: ErrorTypes;
  loggedInfo: LoggedInfoType;
  email: string;
};

const copies = {
  emailPlaceholder: 'E-mail',
  passwordPlaceholder: 'Contrasenya',
  buttonSubmitLabel: 'Entra',
  // eslint-disable-next-line quotes
  buttonRegisterLabel: "Registra't",
  error: {
    name: 'error',
    password: 'error',
    email: 'error',
    login: 'error',
  },
  success: {
    register: (user: string) => `Benvingut a CulturApp ${user}`,
  },
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

const StyledImage = styled.Image`
  width: 100%;
`;

export const LoginView: React.FC<LoginViewProps> = ({
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onRegister,
  error,
  loggedInfo,
  email,
}) => {
  const { Toast, createToast } = useToast();

  useEffect(() => {
    error === ErrorTypes.LOGINERROR &&
      createToast({
        content: copies.error.login,
        type: ToastTypes.ERROR,
      });
  }, [error]);

  useEffect(() => {
    loggedInfo?.success &&
      createToast({
        content: copies.success.register(email),
        type: ToastTypes.INFO,
      });
  }, [loggedInfo]);

  return (
    <View>
      <Toast />
      <View centerV>
        <Container>
          <View>
            <StyledImage
              source={require('../../assets/images/logo.png')}
              resizeMode='contain'
            />
          </View>
          <View>
            <TextField
              placeholder={copies.emailPlaceholder}
              onChangeText={onEmailChange}
              error={
                error === ErrorTypes.EMAILERROR ? copies.error.email : null
              }
            />
          </View>
          <View>
            <TextField
              placeholder={copies.passwordPlaceholder}
              onChangeText={onPasswordChange}
              error={
                error === ErrorTypes.PASSWORDERROR
                  ? copies.error.password
                  : null
              }
            />
          </View>
          <View paddingT-20>
            <Button label={copies.buttonSubmitLabel} onPress={onSubmit} />
          </View>
          <View paddingT-10>
            <Button
              label={copies.buttonRegisterLabel}
              onPress={onRegister}
              outline
            />
          </View>
        </Container>
      </View>
    </View>
  );
};