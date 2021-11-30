import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import styled from 'styled-components';
import { VideoDialog } from './components/VideoDialog';
import Video from '../../assets/images/video.png';

type DetailsDescriptionProps = {
  description?: string;
  video?: string;
  thumbnail?: string;
  isVideoVisible: boolean;
  onFinishPoint: () => void;
  onPlay: () => void;
  onCloseVideo: () => void;
};

export const copies = {
  finish: 'Fet',
  video: 'Veure vídeo',
};

const StyledView = styled(View)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const ContentView = styled(View)`
  max-height: 90%;
`;

export const DetailsDescription: React.FC<DetailsDescriptionProps> = ({
  description,
  video,
  thumbnail,
  isVideoVisible,
  onFinishPoint,
  onPlay,
  onCloseVideo,
}) => {
  return (
    <StyledView>
      {video && (
        <VideoDialog
          videoUrl={video}
          thumbnail={thumbnail}
          visible={isVideoVisible}
          onClose={onCloseVideo}
        />
      )}
      <ContentView paddingV-15>
        {video && (
          <Button
            iconSource={Video}
            label={copies.video}
            onPress={onPlay}
            marginB-15
            outline
          />
        )}
        <ScrollView>
          <Text>{description}</Text>
        </ScrollView>
      </ContentView>
      <View>
        <Button marginT-10 label={copies.finish} onPress={onFinishPoint} />
      </View>
    </StyledView>
  );
};
