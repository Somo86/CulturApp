import React from 'react';
import styled from 'styled-components/native';
import { Card, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';

type SeightseeingCardProps = {
  content: string;
};

const StyledText = styled(Text)`
  color: white;
  margin-left: 5px;
  font-size: 16px;
`;

export const SeightseeingCard: React.FC<SeightseeingCardProps> = ({
  content,
}) => {
  return (
    <Card backgroundColor='#9c27b0' marginB-10 paddingV-8 paddingH-12 marginR-8>
      <View row centerV>
        <Icon name='flag' color='white' size={35} />
        <StyledText>{content}</StyledText>
      </View>
    </Card>
  );
};
