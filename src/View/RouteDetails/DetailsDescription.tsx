import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import styled from 'styled-components';

type DetailsDescriptionProps = {
  description: string | undefined;
  onFinishPoint: () => void;
};

const copies = {
  finish: 'Fet',
};

const StyledView = styled(View)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const DetailsDescription: React.FC<DetailsDescriptionProps> = ({
  description,
  onFinishPoint,
}) => {
  return (
    <StyledView>
      <View>
        <View paddingV-15>
          <ScrollView>
            <Text>{description}</Text>
          </ScrollView>
        </View>
      </View>
      <View>
        <Button marginT-20 label={copies.finish} onPress={onFinishPoint} />
      </View>
    </StyledView>
  );
};
