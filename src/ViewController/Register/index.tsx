import React, { useState } from 'react';
import { RegisterView } from '../../View/Register';
import { UserTypeEnum } from '../../Model/Entities/User';
import { RegisterviewModelType } from '../../ViewModel/Register';
import { useHistory } from 'react-router-native';

export enum ErrorTypesEnum {
  FORMERROR,
  FIREBASEERROR,
  NONE,
}

export type LoggedInfoType = {
  isNewUser?: boolean;
} | null;

export type ErrorType = {
  type: ErrorTypesEnum;
  code: string;
};

export const RegisterViewController = ({
  viewModel,
}: {
  viewModel: RegisterviewModelType;
}) => {
  const [userType, setUserType] = useState(UserTypeEnum.CITIZEN);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInfo, setloggedInfo] = useState<LoggedInfoType>(null);
  const [error, setError] = useState<ErrorType>({
    type: ErrorTypesEnum.NONE,
    code: '',
  });
  const { push } = useHistory();

  const onRadioValueChange = (value: UserTypeEnum) => setUserType(value);

  const onNameChange = (name: string) => setName(name);

  const onEmailChange = (email: string) => setEmail(email);

  const onPasswordChange = (password: string) => setPassword(password);

  const onSubmit = async () => {
    try {
      // Creates a new user if it does not exists
      const { additionalUserInfo, user } = await viewModel.signInOrCreate(
        email,
        password,
      );
      // saves user on DB
      viewModel.addNewUser({
        id: user.uid,
        completeName: name,
        type: userType,
        email: email,
      });
      setloggedInfo({ isNewUser: additionalUserInfo?.isNewUser });
      // Move to LOGIN page
      push('/');
    } catch (e: any) {
      setError({
        type: ErrorTypesEnum.FIREBASEERROR,
        code: e.code,
      });
    }
  };

  return (
    <RegisterView
      userTypeValue={userType}
      onRadioValueChange={onRadioValueChange}
      onNameChange={onNameChange}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onSubmit={onSubmit}
      error={error}
      loggedInfo={loggedInfo}
    />
  );
};
