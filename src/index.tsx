import React from 'react';
import {ThemeProvider, useTheme} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/login';
import Register from './screens/register';
import appTheme from './config/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ModalExample: React.FunctionComponent<{}> = () => {
  const {theme} = useTheme();

  return (
    <NavigationContainer>
      <ThemeProvider theme={appTheme(theme)}>
        <Stack.Navigator>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default ModalExample;
