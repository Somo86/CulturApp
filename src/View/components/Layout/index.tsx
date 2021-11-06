import React from 'react';
import { SafeAreaView } from 'react-native';
import { ActionBar } from 'react-native-ui-lib';
import { AppBar } from '../AppBar';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import { Dimensions } from 'react-native';

type AppLayoutProps = {
  showActionBar?: boolean;
  makeScrollable?: boolean;
};

const actions = [
  { label: 'Delete', onPress: () => {} },
  { label: 'Delete', onPress: () => {} },
];

const windowHeight = Dimensions.get('window').height;

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showActionBar = false,
  makeScrollable = true,
}) => {
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
        style={{ minHeight: windowHeight, backgroundColor: '#eee' }}>
        {children}
      </SafeAreaView>
    </StickyHeaderFooterScrollView>
  );
};
