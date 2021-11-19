import React, { useState } from 'react';
import { Toast as UIToast } from 'react-native-ui-lib';

type useToastType = {
  content: string;
  type?: ToastTypes;
};

export enum ToastTypes {
  ERROR,
  INFO,
}

export const useToast = (autoDismiss: number = 3000) => {
  const [isVisible, setIsVisible] = useState(false);
  const [toastProps, setToastProps] = useState<useToastType>({
    type: ToastTypes.INFO,
    content: '',
  });

  const onDismiss = () => setIsVisible(false);

  const Toast = props =>
    React.createElement(UIToast, {
      ...props,
      visible: isVisible,
      message: toastProps.content,
      backgroundColor:
        toastProps.type === ToastTypes.ERROR ? '#f44336' : '#ba68c8',
      autoDismiss,
      onDismiss,
      zIndex: 100,
    });

  return {
    Toast,
    createToast: (props: useToastType) => {
      setIsVisible(true);
      setToastProps(props);
    },
  };
};
