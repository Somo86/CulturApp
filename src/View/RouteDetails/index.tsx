import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Pressable } from 'react-native';
import { Image, View } from 'react-native-ui-lib';
import { Route } from '../../Model/Entities/Route';
import { Points } from '../../Model/Entities/Seightseeing';
import { DetailsIntroduction } from './DetailsIntroduction';
import { DetailsDescription } from './DetailsDescription';
import { DetailSteps } from '../../ViewController/RouteDetails';
import { VoteDialog } from './components/VoteDialog';
import { useToast, ToastTypes } from '../hooks/useToast';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RouteDetailsViewProps = {
  route: Route | undefined;
  routeDetails: Points | undefined;
  currentStep: DetailSteps;
  currentPoint: number;
  hasLocationPermisson: boolean;
  error: string | null;
  onNextStep: () => void;
  onFinishPoint: () => void;
  onBackHome: () => void;
  updateRouteVotes: (x: number) => void;
  onInitNavigation: () => void;
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
  hasLocationPermisson,
  error,
  onNextStep,
  onFinishPoint,
  onBackHome,
  updateRouteVotes,
  onInitNavigation,
}) => {
  const { Toast, createToast } = useToast();

  useEffect(() => {
    error &&
      createToast({
        content: error,
        type: ToastTypes.ERROR,
      });
  }, [error]);

  return (
    <StyledView>
      <Toast />
      <StyledImageContainer>
        <FloatingIcon onPress={onBackHome}>
          <Icon name='close' color='white' size={40} />
        </FloatingIcon>
        <Image
          style={{ height: 225 }}
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
            onInitNavigation={onInitNavigation}
            hasLocationPermisson={hasLocationPermisson}
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
