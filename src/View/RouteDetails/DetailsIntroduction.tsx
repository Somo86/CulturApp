import React from 'react';
import { Button, Colors, Text, View } from 'react-native-ui-lib';
import styled from 'styled-components';

type DetailsIntroductionProps = {
  title: string | undefined;
  introduction: string | undefined;
  currentPoint: number;
  onNextStep: () => void;
};

const copies = {
  followMeButton: 'Portam-hi!',
  readyButton: 'Ja hi sóc!',
};

const StyledView = styled(View)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const DetailsIntroduction: React.FC<DetailsIntroductionProps> = ({
  title,
  introduction,
  currentPoint,
  onNextStep,
}) => {
  return (
    <StyledView>
      <View>
        <Text h1>{title}</Text>
        <Text
          style={{
            color: Colors.mainColor,
          }}>{`Punt d'interès ${currentPoint}`}</Text>
        <View paddingV-15>
          <Text>{introduction}</Text>
        </View>
      </View>
      <View>
        <Button outline label={copies.followMeButton} onPress={() => {}} />
        <Button marginT-20 label={copies.readyButton} onPress={onNextStep} />
      </View>
    </StyledView>
  );
};
