import React from 'react';
import { Pressable } from 'react-native';
import { Text } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type TitleAppBarProps = {
  title: string;
  close: boolean;
  onPressIcon: () => void;
};

const StyledHeader = styled.View`
  height: 60px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

export const TitleAppBar: React.FC<TitleAppBarProps> = ({
  title,
  close,
  onPressIcon,
}) => {
  return (
    <StyledHeader>
      <Text h3>{title}</Text>
      {close && (
        <Pressable onPress={onPressIcon}>
          <Icon name='close' color='grey' size={40} />
        </Pressable>
      )}
    </StyledHeader>
  );
};
