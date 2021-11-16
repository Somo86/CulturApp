import React from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components/native';
import plus from '../../../assets/images/plus.png';

type AppBarProps = {
  logo: ImageSourcePropType;
  showCreationButton?: boolean;
  onCreationPress?: () => void;
};

const StyledImage = styled.Image`
  width: 130px;
  height: 30px;
`;

const ContainerView = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  justify-content: space-between;
  box-shadow: 0px 6px 8px black;
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

export const AppBar: React.FC<AppBarProps> = ({
  logo,
  showCreationButton,
  onCreationPress = () => {},
}) => {
  return (
    <ContainerView style={styles.shadow}>
      <StyledImage source={logo} resizeMode='contain' />
      {showCreationButton && (
        <Button
          round
          iconSource={plus}
          size={Button.sizes.xSmall}
          color={Colors.mainColor}
          onPress={onCreationPress}
        />
      )}
    </ContainerView>
  );
};
