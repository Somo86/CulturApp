import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ActionBar, Colors } from 'react-native-ui-lib';
import { AppBar } from '../AppBar';
import { Dimensions } from 'react-native';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import Home from '../../../assets/images/outline_home_black_36.png';
import User from '../../../assets/images/outline_person_outline_black_36.png';
import { useHistory } from 'react-router-native';

type AppLayoutProps = {
  showActionBar?: boolean;
  makeScrollable?: boolean;
  initialSelectedTab?: number;
};

const icons = [Home, User];

const basicIconStyles = { width: 35, height: 35 };

const iconStyles = {
  active: { ...basicIconStyles, tintColor: Colors.mainColor },
  inactive: { ...basicIconStyles, tintColor: '#757575' },
};

const windowHeight = Dimensions.get('window').height;

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showActionBar = false,
  makeScrollable = true,
  initialSelectedTab = 0,
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
          index === 0 ? push('/home') : push('/user');
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
        <AppBar logo={require('../../../assets/images/logo.png')} />
      )}
      renderStickyFooter={() => Footer}>
      <SafeAreaView
        style={{ minHeight: windowHeight, backgroundColor: '#fff' }}>
        {children}
      </SafeAreaView>
    </StickyHeaderFooterScrollView>
  );
};
