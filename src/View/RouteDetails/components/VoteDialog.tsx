import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Button, Dialog, Text, View } from 'react-native-ui-lib';
import { VoteStar } from './VoteStar';

export type VoteStarType = {
  position: number;
  status: 0 | 1;
};

type VoteDialogType = {
  onBackHome: () => void;
  updateRouteVotes: (x: number) => void;
};

const VOTE_STAR: VoteStarType[] = [
  {
    position: 1,
    status: 0,
  },
  {
    position: 2,
    status: 0,
  },
  {
    position: 3,
    status: 0,
  },
  {
    position: 4,
    status: 0,
  },
  {
    position: 5,
    status: 0,
  },
];

const copies = {
  // eslint-disable-next-line quotes
  header: "¿Què t'ha semblat aquest itinerari?",
  close: 'Tanca',
  done: 'Fet',
};

const style = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: 'white',
  },
});

const StyledFooter = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledContent = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const renderPannableHeader = () => {
  return (
    <View>
      <View margin-15>
        <Text>{copies.header}</Text>
      </View>
      <View height={2} bg-grey70 />
    </View>
  );
};

export const VoteDialog: React.FC<VoteDialogType> = ({
  onBackHome,
  updateRouteVotes,
}) => {
  const [voteIcons, setVoteIcons] = useState<VoteStarType[]>(VOTE_STAR);

  const getVotes = () => voteIcons.filter(vote => vote.status === 1).length;

  const setToActive = (vote: VoteStarType): VoteStarType[] => {
    return VOTE_STAR.map((star, index) => {
      return index < vote.position
        ? { ...star, status: 1 }
        : { ...star, status: 0 };
    });
  };
  const setToPasive = (vote: VoteStarType): VoteStarType[] => {
    return VOTE_STAR.map((star, index) => {
      return index >= vote.position
        ? { ...star, status: 0 }
        : { ...star, status: 1 };
    });
  };

  // Add or remove votes to the counter
  const onVoteCounter = (vote: VoteStarType) => {
    const prevIcon = voteIcons[vote.position - 2];
    // manage when clicking first star
    if (!prevIcon) {
      setVoteIcons(
        voteIcons.map((star, index) =>
          index === 0 ? { ...star, status: 1 } : { ...star, status: 0 },
        ),
      );
      return;
    }
    // manage whe user is adding or removing votes
    const newVotes =
      vote.status === 1 && prevIcon.status === 0
        ? setToActive(vote)
        : setToPasive(vote);

    setVoteIcons(newVotes);
  };

  return (
    <Dialog
      useSafeArea
      visible
      renderPannableHeader={renderPannableHeader}
      containerStyle={style.container}
      ignoreBackgroundPress={true}>
      <StyledContent marginH-30 marginV-40 row centerH>
        {voteIcons.map(star => {
          return (
            <VoteStar
              key={`vote_star_${star.position}`}
              onVoteCounter={onVoteCounter}
              position={star.position}
              status={star.status}
            />
          );
        })}
      </StyledContent>
      <View>
        <View height={2} bg-grey70 />
        <StyledFooter margin-15>
          <Button
            label={copies.close}
            link
            linkColor={'grey'}
            marginH-15
            onPress={onBackHome}
          />
          <Button
            label={copies.done}
            marginH-10
            onPress={() => updateRouteVotes(getVotes())}
          />
        </StyledFooter>
      </View>
    </Dialog>
  );
};
