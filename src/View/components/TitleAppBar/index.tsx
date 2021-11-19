import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});

export const TitleAppBar: React.FC<TitleAppBarProps> = ({
  title,
  close,
  onPressIcon,
}) => {
  return (
    <StyledHeader style={styles.shadow}>
      <Text h3>{title}</Text>
      {close && (
        <Pressable onPress={onPressIcon}>
          <Icon name='close' color='grey' size={40} />
        </Pressable>
      )}
    </StyledHeader>
  );
};
