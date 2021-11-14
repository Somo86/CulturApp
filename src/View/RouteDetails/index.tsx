import React from 'react';
import styled from 'styled-components';
import { Pressable } from 'react-native';
import { Image, View } from 'react-native-ui-lib';
import { Route } from '../../Model/Entities/Route';
import { Points } from '../../Model/Entities/Seightseeing';
import { DetailsIntroduction } from './DetailsIntroduction';
import { DetailsDescription } from './DetailsDescription';
import { DetailSteps } from '../../ViewController/RouteDetails';
import { VoteDialog } from './components/VoteDialog';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RouteDetailsViewProps = {
  route: Route | undefined;
  routeDetails: Points | undefined;
  currentStep: DetailSteps;
  currentPoint: number;
  onNextStep: () => void;
  onFinishPoint: () => void;
  onBackHome: () => void;
  updateRouteVotes: (x: number) => void;
};

const FloatingIcon = styled(Pressable)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 3;
`;

const StyledView = styled(View)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledImageContainer = styled(View)`
  height: 30%;
`;

const StyledTextContainer = styled(View)`
  height: 70%;
`;

export const RouteDetailsView: React.FC<RouteDetailsViewProps> = ({
  route,
  routeDetails,
  currentStep,
  currentPoint,
  onNextStep,
  onFinishPoint,
  onBackHome,
  updateRouteVotes,
}) => {
  return (
    <StyledView>
      <StyledImageContainer>
        <FloatingIcon onPress={onBackHome}>
          <Icon name='close' color='white' size={40} />
        </FloatingIcon>
        <Image
          height={200}
          source={{
            uri: route?.image,
          }}
        />
      </StyledImageContainer>
      <StyledTextContainer paddingH-20 paddingV-20>
        {currentStep === DetailSteps.INTRODUCTION ? (
          <DetailsIntroduction
            title={routeDetails?.name}
            introduction={routeDetails?.introduction}
            currentPoint={currentPoint}
            onNextStep={onNextStep}
          />
        ) : currentStep === DetailSteps.DESCRIPTION ? (
          <DetailsDescription
            description={routeDetails?.description}
            onFinishPoint={onFinishPoint}
          />
        ) : (
          <View>
            <VoteDialog
              onBackHome={onBackHome}
              updateRouteVotes={updateRouteVotes}
            />
          </View>
        )}
      </StyledTextContainer>
    </StyledView>
  );
};
