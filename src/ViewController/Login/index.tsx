import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { validateEmail, validateMinLength } from '../../utils/validation';
import { LoginView } from '../../View/Login';
import { LoginViewModelType } from '../../ViewModel/Login';

export enum ErrorTypes {
  LOGINERROR,
  EMAILERROR,
  PASSWORDERROR,
  NONE,
}

type LoginControllerProps = {
  viewModel: LoginViewModelType;
};

export type LoggedInfoType = {
  success: boolean;
} | null;

export type ErrorType = {
  type: ErrorTypes;
  code: string;
};

export const LoginViewController: React.FC<LoginControllerProps> = ({
  viewModel,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInfo, setloggedInfo] = useState<LoggedInfoType>(null);
  const [error, setError] = useState<ErrorType>({
    type: ErrorTypes.NONE,
    code: '',
  });
  const { push } = useHistory();

  const onEmailChange = (userEmail: string) => setEmail(userEmail);

  const onPasswordChange = (userPassword: string) => setPassword(userPassword);

  const onSubmit = async () => {
    if (!validateEmail(email)) {
      setError({ type: ErrorTypes.EMAILERROR, code: '' });
      return;
    }
    if (!validateMinLength(password, 6)) {
      setError({ type: ErrorTypes.PASSWORDERROR, code: '' });
      return;
    }
    try {
      await viewModel.signIn(email, password);
      // notify user for login success
      setloggedInfo({ success: true });
      // Move to HOME page
      setTimeout(() => push('/home'), 3000);
    } catch (e: any) {
      setError({
        type: ErrorTypes.LOGINERROR,
        code: e.code,
      });
    }
  };

  const onRegister = () => push('/register');

  return (
    <LoginView
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      error={error}
      loggedInfo={loggedInfo}
      onSubmit={onSubmit}
      onRegister={onRegister}
      email={email}
    />
  );
};
