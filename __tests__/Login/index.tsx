import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { LoginProvider } from '../../src/Provider/Login';
import { LoginViewModel, LoginViewModelType } from '../../src/ViewModel/Login';
import { useHistory } from 'react-router-native';

jest.mock('../../src/Model/UserModel');
jest.mock('../../src/ViewModel/Login');
jest.mock('react-router-native');

const renderView = () => {
  return render(<LoginProvider />);
};

describe('Log In', () => {
  const mockedSignIn = jest.fn();
  const mockedPush = jest.fn();

  beforeEach(() => {
    const useHistoryMock = useHistory as jest.Mock<any>;
    useHistoryMock.mockReturnValue({ push: mockedPush });
    const LoginViewModelMock = LoginViewModel as jest.Mock<LoginViewModelType>;
    LoginViewModelMock.mockReturnValue({
      signIn: mockedSignIn,
      getUserByEmail: jest.fn(),
    });
  });

  it('user send log data', async () => {
    const { getByTestId, getByText } = renderView();
    const email = 'email@test.com';
    const password = 'passwordTest';

    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const submitBtn = getByText('Entra');

    fireEvent.changeText(emailField, email);
    fireEvent.changeText(passwordField, password);

    fireEvent.press(submitBtn);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledWith(email, password);
    });
  });

  it('not send any data if it is wrong', async () => {
    const { getByTestId, getByText } = renderView();
    const email = 'wrongEmailFormat';
    const password = 'passwordTest';

    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const submitBtn = getByText('Entra');

    fireEvent.changeText(emailField, email);
    fireEvent.changeText(passwordField, password);

    fireEvent.press(submitBtn);

    await waitFor(() => {
      expect(mockedSignIn).not.toHaveBeenCalledWith(email, password);
    });
  });

  it('user navigates to register view', () => {
    const { getByText } = renderView();

    // eslint-disable-next-line quotes
    const RegisterButton = getByText("Registra't");

    fireEvent.press(RegisterButton);

    expect(mockedPush).toHaveBeenCalledWith('/register');
  });
});
