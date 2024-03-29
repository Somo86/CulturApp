import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-native';
import { SafeAreaView } from 'react-native';
import { ActionBar } from 'react-native-ui-lib';
import { AppBar } from '../AppBar';
import { Dimensions } from 'react-native';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import Home from '../../../assets/images/outline_home_black_36.png';
import User from '../../../assets/images/outline_person_outline_black_36.png';

type AppLayoutProps = {
  showActionBar?: boolean;
  makeScrollable?: boolean;
  initialSelectedTab?: number;
  showCreationButton?: boolean;
  onCreationPress?: () => void;
};

const icons = [Home, User];

const basicIconStyles = { width: 35, height: 35 };

const iconStyles = {
  active: { ...basicIconStyles, tintColor: '#aa00ff' },
  inactive: { ...basicIconStyles, tintColor: '#757575' },
};

const windowHeight = Dimensions.get('window').height;

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showActionBar = false,
  makeScrollable = true,
  initialSelectedTab = 0,
  showCreationButton = false,
  onCreationPress,
}) => {
  const { push } = useHistory();

  const [pressedIcon, setPressedIcon] = useState(initialSelectedTab);
  const [actions, setActions] = useState(() =>
    icons.map((iconSource, index) => {
      return {
        iconSource,
        iconStyle: iconStyles.inactive,
        onPress: () => {
          setPressedIcon(index);
          index === 0 ? push('/home') : push('/profile');
        },
      };
    }),
  );

  useEffect(() => {
    setActions(
      actions.map((action, index) => {
        return pressedIcon === index
          ? { ...action, iconStyle: iconStyles.active }
          : {
              ...action,
              iconStyle: iconStyles.inactive,
            };
      }),
    );
  }, [pressedIcon]);

  const Footer = showActionBar ? (
    <ActionBar centered actions={actions} />
  ) : null;

  return (
    <StickyHeaderFooterScrollView
      makeScrollable={makeScrollable}
      renderStickyHeader={() => (
        <AppBar
          logo={require('../../../assets/images/logo.png')}
          showCreationButton={showCreationButton}
          onCreationPress={onCreationPress}
        />
      )}
      renderStickyFooter={() => Footer}>
      <SafeAreaView
        style={{ minHeight: windowHeight, backgroundColor: '#fff' }}>
        {children}
      </SafeAreaView>
    </StickyHeaderFooterScrollView>
  );
};
