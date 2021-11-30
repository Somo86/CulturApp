import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Dialog, Button } from 'react-native-ui-lib';
import VideoPlayer from 'react-native-video-player';

type VideoDialogProps = {
  videoUrl: string;
  thumbnail?: string;
  visible: boolean;
  onClose?: () => void;
};

type videoMethods = {
  stop: () => void;
};

const copies = {
  closeButton: 'Tanca',
};

const RowView = styled(View).attrs({
  'marginT-20': true,
})`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const VideoDialog: React.FC<VideoDialogProps> = ({
  videoUrl,
  thumbnail,
  visible,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const videoRef = useRef<videoMethods>(null);

  useEffect(() => {
    setIsVisible(visible);
    () => videoRef.current?.stop();
  }, [visible]);

  const close = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  return (
    <Dialog visible={isVisible}>
      <View paddingB-20 backgroundColor='white'>
        <View>
          <VideoPlayer
            ref={videoRef}
            video={{
              uri: videoUrl,
            }}
            showDuration
            thumbnail={{ uri: thumbnail }}
          />
        </View>
        <RowView>
          <Button label={copies.closeButton} outline onPress={close} />
        </RowView>
      </View>
    </Dialog>
  );
};
