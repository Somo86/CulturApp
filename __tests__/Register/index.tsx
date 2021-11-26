import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { RegisterProvider } from '../../src/Provider/Register';
import { copies } from '../../src/View/Register';
import { useHistory } from 'react-router-native';
import {
  RegisterviewModel,
  RegisterviewModelType,
} from '../../src/ViewModel/Register';
import { UserTypeEnum } from '../../src/Model/Entities/User';

jest.mock('../../src/Model/UserModel');
jest.mock('../../src/ViewModel/Register');
jest.mock('react-router-native');

const renderView = () => {
  return render(<RegisterProvider />);
};

describe('Register', () => {
  const mockedPush = jest.fn();
  const mockedSignIn = jest.fn().mockReturnValue(Promise.resolve({}));
  const mockedAddUser = jest.fn();

  beforeEach(() => {
    const useHistoryMock = useHistory as jest.Mock<any>;
    useHistoryMock.mockReturnValue({ push: mockedPush });
    const RegisterviewModelMock =
      RegisterviewModel as jest.Mock<RegisterviewModelType>;
    RegisterviewModelMock.mockReturnValue({
      signInOrCreate: mockedSignIn,
      addNewUser: mockedAddUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('user register as citizen', async () => {
    const { getByTestId, getByText } = renderView();

    const radioCitizen = getByText(copies.radioButtonCitizen);
    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const submitButton = getByText(copies.buttonLabel);
    const nameField = getByTestId('name');

    const nameText = 'Test';
    const passwordText = 'passwordTest';
    const emailText = 'test@test.com';

    fireEvent.press(radioCitizen);
    fireEvent.changeText(nameField, nameText);
    fireEvent.changeText(emailField, emailText);
    fireEvent.changeText(passwordField, passwordText);

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledWith(emailText, passwordText);
      expect(mockedAddUser).toHaveBeenCalledWith({
        completeName: nameText,
        email: emailText,
        type: UserTypeEnum.CITIZEN,
      });
    });
  });

  it('user register as entity', async () => {
    const { getByTestId, getByText } = renderView();

    const radioCitizen = getByText(copies.radioButtonEntity);
    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const submitButton = getByText(copies.buttonLabel);

    const nameText = 'Test';
    const passwordText = 'passwordTest';
    const emailText = 'test@test.com';

    fireEvent.press(radioCitizen);

    const nameField = getByTestId('nameEntity');

    fireEvent.changeText(nameField, nameText);
    fireEvent.changeText(emailField, emailText);
    fireEvent.changeText(passwordField, passwordText);

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledWith(emailText, passwordText);
      expect(mockedAddUser).toHaveBeenCalledWith({
        completeName: nameText,
        email: emailText,
        type: UserTypeEnum.ENTITY,
      });
    });
  });

  it('user cannot register if any value is wrong', async () => {
    const { getByTestId, getByText } = renderView();

    const radioCitizen = getByText(copies.radioButtonEntity);
    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const submitButton = getByText(copies.buttonLabel);

    const nameText = 'Test';
    const passwordText = 'passwordTest';
    const emailText = 'test';

    fireEvent.press(radioCitizen);

    const nameField = getByTestId('nameEntity');

    fireEvent.changeText(nameField, nameText);
    fireEvent.changeText(emailField, emailText);
    fireEvent.changeText(passwordField, passwordText);

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockedSignIn).not.toHaveBeenCalled();
      expect(mockedAddUser).not.toHaveBeenCalledWith();
    });
  });

  it('returns to login when cancel', () => {
    const { getByText } = renderView();

    const cancelButton = getByText(copies.cancelButton);
    fireEvent.press(cancelButton);

    expect(mockedPush).toHaveBeenCalledWith('/');
  });
});
