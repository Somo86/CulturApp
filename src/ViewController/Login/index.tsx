import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
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

export const LoginViewController: React.FC<LoginControllerProps> = ({
  viewModel,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInfo, setloggedInfo] = useState<LoggedInfoType>(null);
  const [error, setError] = useState(ErrorTypes.NONE);
  const { push } = useHistory();

  const onEmailChange = (userEmail: string) => setEmail(userEmail);

  const onPasswordChange = (userPassword: string) => setPassword(userPassword);

  const onSubmit = async () => {
    try {
      await viewModel.signIn(email, password);
      // notify user for login success
      setloggedInfo({ success: true });
      push('/');
    } catch (e) {
      setError(ErrorTypes.LOGINERROR);
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
