import React from 'react';
import {ThemeProvider, useTheme} from 'react-native-elements';
import Login from './screens/login';
import appTheme from './config/theme';

const ModalExample: React.FunctionComponent<{}> = () => {
  const {theme} = useTheme();

  return (
    <ThemeProvider theme={appTheme(theme)}>
      <Login />
    </ThemeProvider>
  );
};

export default ModalExample;
