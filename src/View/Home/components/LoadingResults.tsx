import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const LoadingResults: React.FC<{}> = () => {
  return (
    <View centerV centerH marginT-70>
      <Icon name='autorenew' size={90} />
      <Text>Carregant itineraris...</Text>
    </View>
  );
};
