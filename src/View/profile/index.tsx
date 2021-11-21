import React from 'react';
import { RadioButton, RadioGroup, TextField, View } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import { UserTypeEnum } from '../../Model/Entities/User';
import { AppLayout } from '../components/Layout';

const copies = {
  radioButtonCitizen: 'Sóc ciutadà',
  radioButtonEntity: 'Sóc entitat cultural',
  buttonLabel: 'Tanca',
};

type ProfileViewProps = {
  email: string | undefined;
  completeName: string | undefined;
  type: UserTypeEnum | undefined;
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

export const ProfileView: React.FC<ProfileViewProps> = ({
  email,
  completeName,
  type,
}) => {
  return (
    <AppLayout showActionBar initialSelectedTab={1}>
      <Container>
        <RadioGroup initialValue={type}>
          <View row spread paddingH-20>
            <RadioButton
              label={copies.radioButtonCitizen}
              value={UserTypeEnum.CITIZEN}
              disabled={type !== UserTypeEnum.CITIZEN}
            />
            <RadioButton
              label={copies.radioButtonEntity}
              value={UserTypeEnum.ENTITY}
              disabled={type !== UserTypeEnum.ENTITY}
            />
          </View>
        </RadioGroup>
        <View paddingT-40>
          <TextField
            value={completeName}
            editable={false}
            disabledColor='grey'
          />
        </View>
        <View>
          <TextField value={email} editable={false} disabledColor='grey' />
        </View>
      </Container>
    </AppLayout>
  );
};
