import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const EmptyResults: React.FC<{}> = () => {
  return (
    <View centerV centerH marginT-70>
      <Icon name='mood-bad' size={90} />
      <Text>No hi han resultats per mostrar</Text>
    </View>
  );
};
