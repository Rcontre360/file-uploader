import React from 'react';
import {Header} from 'react-native-elements';
import {useNavigationState} from '@react-navigation/native';

const AppHeader: React.FunctionComponent<{}> = () => {
  return (
    <Header
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        iconStyle: {color: '#fff'},
      }}
      centerComponent={{text: 'Uploader', style: {color: '#fff'}}}
      rightComponent={{icon: 'home', color: '#fff'}}
    />
  );
};

export default AppHeader;
