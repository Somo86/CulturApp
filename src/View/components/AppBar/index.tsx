import React from 'react';
import { Text, ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

type AppBarProps = {
  logo: ImageSourcePropType;
};

const StyledImage = styled.Image`
  width: 100px;
  height: 30px;
`;

const ContainerView = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AppBar: React.FC<AppBarProps> = ({ logo }) => {
  return (
    <ContainerView>
      <StyledImage source={logo} resizeMode='contain' />
      <Text>pepe el loco</Text>
    </ContainerView>
  );
};
