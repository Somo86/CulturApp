import React from 'react';
import { Pressable } from 'react-native';
import { VoteStarType } from './VoteDialog';
import Icon from 'react-native-vector-icons/MaterialIcons';

type VoteStarProps = {
  onVoteCounter: (x: VoteStarType) => void;
  position: number;
  status: number;
};

const colors = {
  active: '#fdd835',
  pasive: '#bdbdbd',
};

export const VoteStar: React.FC<VoteStarProps> = ({
  onVoteCounter,
  position,
  status,
}) => {
  const onPress = () => {
    const nextStatus = status === 0 ? 1 : 0;
    onVoteCounter({ position, status: nextStatus });
  };

  return (
    <Pressable onPress={onPress} testID={`star_${position}`}>
      <Icon
        name='star-rate'
        color={status === 1 ? colors.active : colors.pasive}
        size={45}
      />
    </Pressable>
  );
};
